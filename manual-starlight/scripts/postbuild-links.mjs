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
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      walk(p);
      continue;
    }
    if (!/\.(html|xml)$/.test(name)) continue;
    let text = readFileSync(p, 'utf8');
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
console.log(`postbuild-links: rewrote ${links} .html URL(s) in ${files} file(s)`);
