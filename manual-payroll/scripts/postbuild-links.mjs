// Post-build normalization for the Payroll Starlight manual.
//
// Starlight with build.format 'file' emits nav links, canonical URLs and
// sitemap entries with a .html suffix (e.g. /guides/payroll/tao-du-an.html). The
// nginx try_files contract serves the same paths extensionless
// (/guides/payroll/tao-du-an -> tao-du-an.html), so rewrite every
// self-referential ".html" URL emitted inside dist/ back to the extensionless
// form. File names on disk are untouched — nginx still serves the .html files
// directly.
//
// Scope of the rewrite (attribute-anchored, so page text is never touched):
//   href=".../x.html"      — Starlight nav, content links to manual pages
//   src=".../x.html"       — none expected, rewritten for safety
//   <loc>.../x.html</loc>  — sitemap.xml entries
// Only URLs under the /guides/payroll base are rewritten.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist', import.meta.url).pathname;
const BASE = '/guides/payroll';

// /guides/payroll/tao-du-an.html -> /guides/payroll/tao-du-an  (also matches the
// absolute form used by canonical/og:url: https://tingtingsoft.vn/guides/payroll/tao-du-an.html)
const ORIGIN = 'https://tingtingsoft.vn';
const hrefRe = new RegExp(
  `((?:href|src|content)=")((?:${ORIGIN.replace(/\./g, '\\.')})?)${BASE}/([^"?#]+?)\\.html(")`,
  'g',
);
// <loc>https://tingtingsoft.vn/guides/payroll/tao-du-an.html</loc>
const locRe = new RegExp(`(<loc>${BASE.replace(/\//g, '\\/')}/[^<]+?)\\.html(</loc>)`, 'g');

let files = 0;
let links = 0;
let images = 0;

// Screenshots are raw public/ assets (src="/guides/payroll/assets/*.png"), so
// Astro never adds dimensions or lazy-loading itself. Inject them here so
// every screenshot reserves layout space and loads off-thread.
//   <img src="/guides/payroll/assets/foo.png" ...>  (markdown-rendered images)
const imgRe = /<img\b[^>]*\bsrc="(\/guides\/payroll\/assets\/[^"?#]+\.png)"[^>]*>/g;
// Astro strips the base from output paths: public/assets lands at dist/assets.
const assetsDir = join(dist, 'assets');
const assetsPrefix = `${BASE}/assets/`;

// Read the pixel size of a .png file. PNG layout: 8-byte signature, then the
// IHDR chunk — 4-byte big-endian length, 'IHDR' FourCC, then width and height
// as big-endian uint32 at byte offsets 16 and 20.
// Returns null when the header can't be parsed — injection then skips
// width/height rather than failing the build over one image.
function pngSize(file) {
  let buf;
  try {
    buf = readFileSync(file);
  } catch {
    return null;
  }
  if (
    buf.length < 24 ||
    buf.toString('latin1', 0, 8) !== '\x89PNG\r\n\x1a\n' ||
    buf.toString('latin1', 12, 16) !== 'IHDR'
  ) {
    return null;
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
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
        const dims = pngSize(join(assetsDir, src.slice(assetsPrefix.length)));
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
      // Home page: .../index.html -> /guides/payroll/
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
