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
