# Deployment

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
