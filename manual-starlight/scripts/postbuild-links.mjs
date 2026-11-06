// Post-build normalization for the TransTing Starlight manual.
//
// Starlight with build.format 'file' emits nav links, canonical URLs and
// sitemap entries with a .html suffix (e.g. /ttransport/bat-dau.html). The
// legacy manual served the same paths extensionless (nginx try_files resolves
// /ttransport/bat-dau -> bat-dau.html), and the old pages carried
// extensionless canonical URLs. To keep the public URL space identical to the
// previous site, rewrite every self-referential ".html" URL emitted inside
// dist/ back to the extensionless form. File names on disk are untouched —
// nginx still serves the .html files directly.
//
// Scope of the rewrite (attribute-anchored, so page text is never touched):
//   href=".../x.html"      — Starlight nav, content links to manual pages
//   src=".../x.html"       — none expected, rewritten for safety
//   <loc>.../x.html</loc>  — sitemap.xml entries
// Only URLs under the /ttransport base are rewritten.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist', import.meta.url).pathname;
const BASE = '/ttransport';

// /ttransport/bat-dau.html -> /ttransport/bat-dau  (also matches the absolute
// form used by canonical/og:url: https://tingtingsoft.vn/ttransport/bat-dau.html)
const ORIGIN = 'https://tingtingsoft.vn';
const hrefRe = new RegExp(
  `((?:href|src|content)=")((?:${ORIGIN.replace(/\./g, '\\.')})?)${BASE}/([^"?#]+?)\\.html(")`,
  'g',
);
// <loc>https://tingtingsoft.vn/ttransport/bat-dau.html</loc>
const locRe = new RegExp(`(<loc>${BASE.replace(/\//g, '\\/')}/[^<]+?)\\.html(</loc>)`, 'g');

let files = 0;
let links = 0;
let images = 0;

// Screenshots are raw public/ assets (src="/ttransport/assets/*.webp"), so
// Astro never adds dimensions or lazy-loading itself. Inject them here so
// every screenshot reserves layout space and loads off-thread.
//   <img src="/ttransport/assets/foo.webp" ...>  (markdown-rendered images)
const imgRe = /<img\b[^>]*\bsrc="(\/ttransport\/assets\/[^"?#]+\.webp)"[^>]*>/g;
// Astro strips the base from output paths: public/assets lands at dist/assets.
const assetsDir = join(dist, 'assets');
const assetsPrefix = `${BASE}/assets/`;

// Read the pixel size of a .webp file. RIFF container: chunk list starts at
// byte 12 (FourCC + 4-byte LE size).
//   VP8X (extended): canvas dims at payload+4/+7 as 24-bit LE, value is w-1/h-1.
//   VP8  (lossy): keyframe header — 3-byte frame tag, 3-byte start code
//         (9d 01 2a), then 16-bit LE width/height (low 14 bits).
//   VP8L (lossless): 0x2f signature byte, then 32-bit LE with packed
//         14-bit (value-1) width/height.
// Returns null when the header can't be parsed — injection then skips
// width/height rather than failing the build over one image.
function webpSize(file) {
  let buf;
  try {
    buf = readFileSync(file);
  } catch {
    return null;
  }
  if (buf.length < 30 || buf.toString('latin1', 0, 4) !== 'RIFF' || buf.toString('latin1', 8, 12) !== 'WEBP') {
    return null;
  }
  let off = 12;
  while (off + 8 <= buf.length) {
    const code = buf.toString('latin1', off, off + 4);
    const size = buf.readUInt32LE(off + 4);
    const payload = off + 8;
    if (code === 'VP8X' && payload + 10 <= buf.length) {
      return { width: buf.readUIntLE(payload + 4, 3) + 1, height: buf.readUIntLE(payload + 7, 3) + 1 };
    }
    if (code === 'VP8 ' && payload + 10 <= buf.length) {
      if (buf[payload + 3] === 0x9d && buf[payload + 4] === 0x01 && buf[payload + 5] === 0x2a) {
        return {
          width: buf.readUInt16LE(payload + 6) & 0x3fff,
          height: buf.readUInt16LE(payload + 8) & 0x3fff,
        };
      }
      return null;
    }
    if (code === 'VP8L' && payload + 5 <= buf.length && buf[payload] === 0x2f) {
      const bits = buf.readUInt32LE(payload + 1);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    off = payload + size + (size % 2); // chunks are padded to even offsets
  }
  return null;
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      walk(p);
      continue;
    }
    if (!/\.(html|xml)$/.test(name)) continue;
    let text = readFileSync(p, 'utf8');
    if (name.endsWith('.html')) {
      text = text.replace(imgRe, (tag, src) => {
        if (/\sloading=/.test(tag)) return tag; // already injected
        const dims = webpSize(join(assetsDir, src.slice(assetsPrefix.length)));
        const attrs = dims
          ? ` width="${dims.width}" height="${dims.height}" loading="lazy" decoding="async"`
          : ' loading="lazy" decoding="async"';
        images++;
        return tag.replace('<img', `<img${attrs}`);
      });
    }
    let count = 0;
    text = text.replace(hrefRe, (m, pre, origin, path, post) => {
      count++;
      // Home page: .../index.html -> /ttransport/
      const tail = path === 'index' ? '' : path;
      return `${pre}${origin ?? ''}${BASE}/${tail}${post}`;
    });
    text = text.replace(locRe, (m, pre, post) => {
      count++;
      return `${pre}${post}`;
    });
    if (count > 0) {
      writeFileSync(p, text);
      files++;
      links += count;
    }
  }
}
walk(dist);
console.log(
  `postbuild-links: rewrote ${links} .html URL(s) in ${files} file(s); injected loading attrs on ${images} screenshot img(s)`,
);
