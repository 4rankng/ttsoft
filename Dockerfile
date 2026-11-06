# Ting Ting Soft site — build with Node 20, serve the static dist with nginx.
# The image is built by GitHub Actions and pushed to ghcr.io/4rankng/ttsoft;
# the prod server (bot.tingting.vip) pulls it, so nothing is cloned or
# compiled on the server.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# TransTing manual (/ttransport) — built separately with Astro Starlight in
# manual-starlight/ and copied over the legacy static .html pages. Same Node
# version as the site build; pnpm via corepack (see manual-starlight/package.json).
FROM node:22-alpine AS manual-build
WORKDIR /app
RUN corepack enable
COPY manual-starlight/package.json manual-starlight/pnpm-lock.yaml ./manual-starlight/
RUN cd manual-starlight && pnpm install --frozen-lockfile
COPY manual-starlight/ ./manual-starlight/
RUN cd manual-starlight && pnpm build

FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/ttsoft-headers.conf /etc/nginx/ttsoft-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Starlight output lands on top of the Vite dist's ttransport/ directory,
# replacing the legacy manual .html files at identical URLs.
COPY --from=manual-build /app/manual-starlight/dist/ /usr/share/nginx/html/ttransport/
