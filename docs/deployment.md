# Deployment
## Platform (production): Docker image via GHCR on bot.tingting.vip

DNS for `tingtingsoft.vn` points at the droplet `bot.tingting.vip`
(143.198.221.92). The Caddy edge on that server reverse-proxies the domain to
`172.17.0.1:8082`, where the `ttsoft-web` nginx container serves the site.

- **Image:** `ghcr.io/4rankng/ttsoft:main` (public repo → anonymous pulls).
  Built by `.github/workflows/docker.yml` on every push to `main`
  (multi-stage: `node:20-alpine` builds the Vite dist, `nginx:alpine` serves
  it with `deploy/nginx.conf` + `deploy/ttsoft-headers.conf` baked in). Each
  build also publishes `:sha-<commit>` for rollbacks.
- **Server:** `/opt/ttsoft/docker-compose.yml` runs the image — no source
  clone, no Node, no bind mounts. Clean URLs (`/policies`, `/ttransport`)
  resolve via nginx `try_files $uri $uri.html /index.html`.
- **Deploy:** `make deploy` — pushes `main`, waits for the workflow to finish,
  then `docker compose pull && up -d` on the server, and curls both
  `/` and `/ttransport`.
- **Rollback:** `make rollback IMAGE=ghcr.io/4rankng/ttsoft:sha-<sha>`.

Netlify (below) remains git-connected as a secondary mirror of the same repo;
it no longer serves production traffic.


## Platform: Netlify
- Site name: `ttsoft`
- Site ID: `0f52d722-84a0-46aa-a877-613b50587e8a`
- Admin: https://app.netlify.com/projects/ttsoft

## URL: https://tingtingsoft.vn
Custom domain `tingtingsoft.vn` is attached to this Netlify site.

## Deploy Command
The site is git-connected — deployment happens automatically on push to `main`:

```bash
npm run build        # verify build passes first
git push origin main # triggers Netlify production build
netlify watch        # optional: wait for deploy from the terminal
```

Build settings live in `netlify.toml` (build command `npm run build`, publish dir `dist`, Node 20, CSP and cache headers).

## Environment Variables
None.

## Custom Domain
Managed in the Netlify dashboard: https://app.netlify.com/projects/ttsoft/domains
No DNS changes are needed for deploys; push to `main` and Netlify rebuilds.

## Rollback
1. Open https://app.netlify.com/projects/ttsoft/deploys
2. Pick the last known-good deploy and click **Publish deploy** — instant, no rebuild.
3. To fix forward instead: `git revert <commit> && git push origin main`.

## Verified 2026-08-31
- Build passes locally (`vite build`, 170ms).
- Pushed `3f9b831..1306030` (Messenger/Zalo one-click contact flow, hero CTA polish) to `main`.
- Netlify deploy completed in 9s.
- Live checks: HTTP 200, `m.me/tingtingsoft` and `zalo.me/0914827988` present in served HTML, CSP and X-Frame-Options headers applied.

## Verified 2026-09-01
- Build passes locally (`vite build`, 166ms).
- Pushed `2b5eeb1..37717e1` (self-hosted Inter variable font, lifecycle map collision fix, hero image/OG/favicon compression, hero spacing) to `main`.
- Netlify deploy completed in 1.7s.
- Live checks: HTTP 200, `@font-face` for Inter present in served CSS pointing at a hashed `/assets/InterVariable-*.woff2`, font file returns 200 with `content-type: font/woff2` and `cache-control: public,max-age=31536000,immutable`, CSP and X-Frame-Options headers applied.

## Verified 2026-11-04
- Manual shipped at `/ttransport` (39 annotated screenshots, 4 non-admin roles).
- GHCR pipeline: push `91b449e..` → workflow `docker` green in ~40s →
  `ghcr.io/4rankng/ttsoft:main` + `:sha-…` published.
- Server cutover to image-only compose; obsolete clone/build files removed
  from `/opt/ttsoft`.
- Caddy edge: added `tingtingsoft.vn` vhost (template + live file) proxying
  to `172.17.0.1:8082`; Let's Encrypt cert issued on first handshake.
- Live checks: `/ttransport` 200 with manual content and 0 broken images,
  `/` homepage intact, `/policies` 200 — all over HTTPS.

## Verified 2026-11-04 — /ttransport redesign
- Manual redesigned in shadcn/ui docs style (`97805b8`): 3-column layout with
  right-rail TOC, breadcrumbs, ⌘K/Ctrl+K command-palette search, feedback
  widget; fixes inline rendering of bold/code in steps.
- Local verification: `vite build` clean; Playwright checks all pass
  (scroll-spy TOC, breadcrumb sync, search open/type/navigate/jump, mobile
  drawer via hamburger + scrim, `strong` inline, red step badges, no console
  errors) at 1440/1024/390 px.
- GHCR pipeline: workflow `docker` green in ~30s for `97805b8`; server pulled
  the new image and restarted (`ttsoft-web-1` up, image `74af0ba24a76`).
- Live checks: `/ttransport` and `/` 200; served HTML contains the new markup
  (`man-search-dialog`, `man-toc-nav`, `manFeedback`, `man-promo-card`).

## Verified 2026-11-04 — /ttransport split into per-section routes
- Manual restructured to shadcn-docs routing (`0f4d775`): `/ttransport` is the
  overview; each section is its own page at `/ttransport/{bat-dau,quan-ly,
  ke-toan,lai-xe,giao-nhan}` (vite MPA entries + nginx `try_files`; Netlify
  mirror rules added to `public/_redirects`).
- Root-cause sticky fix: `body { overflow-x: hidden }` (base.css) made body a
  scroll container and silently disabled every `position: sticky` on the
  manual page; `body.man-page { overflow-x: clip }` restores pinning without
  touching landing-page behavior.
- Local verification: `vite build` clean; Playwright 38/38 (sticky topbar/
  sidebar/TOC pinned at 3000px on all six pages, per-page TOC counts, sidebar
  active state, cross-page ⌘K search deep-linking, legacy `#hash` redirects,
  prev/next pagination, hashed figure assets, mobile drawer, 1440/1024/390
  screenshots, zero console errors).
- GHCR pipeline: workflow `docker` green for `0f4d775`; server pulled and
  restarted `ttsoft-web-1`.
- Live checks: all six routes 200 with page-specific content (no SPA
  fallback leakage); served CSS contains the `overflow-x: clip` sticky fix.

## Verified 2026-11-04 — manual deepened into a process guide; deps hardened
- Content: 20 field-level glossary + lifecycle blocks added across the four
  role pages (verified against the live demo app: dispatch fleet tiles, trip
  form fields, receivables aging buckets, settlement lifecycle, config cards).
- Feedback widget removed; duplicate top nav removed (sidebar is the only
  page nav, shadcn style); stale "Phân xe lại" annotation fixed in
  giamdoc-trip-detail.webp (action now lives inside Chỉnh sửa).
- Mobile UX: full-width search bar (<1024px), collapsible in-page TOC
  (<1280px), 40px tap targets, 16px/1.7 type scale (<639px) for Vietnamese
  diacritics.
- Dependencies: vite 6.4.4, postcss 8.5.32, source-map-js 1.2.2 — all 12
  Dependabot alerts closed (open count now 0), npm audit clean.
- Verification: Playwright 38/38 incl. sticky-layout assertions at
  320-1440px; zero console errors; all six routes 200 with page-unique
  content; deep-content markers confirmed in served HTML.
- Deploys: `2af20f4` (deps), `4be0815` (UX/mobile/process blocks),
  `b813bd2` (field-level content depth).

## Verified 2026-11-05 — Quan ly split into per-process topic pages
- `/ttransport/quan-ly` is now the role landing (hero, scope card, 17 topic
  cards); each business process ships as its own page at
  `/ttransport/quan-ly/<topic>` (17 routes: tong-quan-he-thong,
  dieu-van-phan-xe, ke-hoach-van-chuyen, tao-lenh-van-chuyen, bang-so-lieu,
  luong-cham-cong, ky-luat, bao-cao-lai-lo, phan-chia-loi-nhuan,
  cong-no-phai-thu, cong-no-phai-tra, chi-phi-phat-sinh, tam-ung,
  duyet-hoan-ung, danh-muc, nguoi-dung-nhat-ky, cau-hinh-he-thong).
- Topic pages: own h1 + 3-level breadcrumb, sidebar grouped by business
  domain (Van hanh / Nhan su / Tai chinh / Danh muc & he thong) with
  aria-current, prev/next chaining into Ke toan, task anchors preserved
  for deep links; legacy #hash redirects remapped to topic routes.
- Search index covers the 17 topics; vite entries generated by globbing
  `ttransport/quan-ly/*.html`.
- Verification: Playwright 49/49 (topic navigation, deep links, redirects,
  sticky layout, mobile widgets, zero console errors); all routes 200 with
  page-unique content; grouped sidebar and 3-level breadcrumbs confirmed in
  served HTML; redirect map present in the served JS bundle.
- Deploy: `2389e7a` (docker workflow green in 44s).

## Verified 2026-11-05 — process book integrated into the manual
- Read the authoritative TransTing process documentation (folio wiki,
  space `ttransport`, 11 chapters) via MCP and integrated it into every
  topic page: 5-state order lifecycle with posting rules and
  lock/unlock/adjust/cancel, dispatch dialog rules and batch start,
  order creation rules with config snapshot, ledger modes and edit
  permissions, payroll formula/timesheet states/payroll lock, discipline
  fields and salary effect, P&L reading + YoY + locked trips, quarterly
  profit split, receivables aging/FIFO/debit notes, payables incl. fuel
  reconciliation, expense posting modes, advance cash rules,
  settlement balance constraint + 4 actions on approval, forwarder
  per-container costs (buy/sell), driver portal boundaries + AI
  container/seal capture, work period + info widgets.
- Deploy `3be0e87`; suite 49/49; deep markers verified in served HTML.

## Verified 2026-11-05 — production end-to-end test + header fix
- Ran the full 49-check Playwright suite directly against production
  (all routes, sticky layout, navigation, cross-page search, legacy
  redirects, mobile widgets).
- Found and fixed a malformed `Permissions-Policy` header
  (`camera()` -> `camera=()`) in `deploy/ttsoft-headers.conf` and
  `netlify.toml` — Chrome logged a structured-header parse error on
  every page load (`4f8a687`).
- Re-run: 49/49, zero console errors; desktop and mobile screenshots
  of `/ttransport` verified visually.
