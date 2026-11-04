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

FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY deploy/ttsoft-headers.conf /etc/nginx/ttsoft-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
