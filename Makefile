.PHONY: dev build preview install deploy rollback

dev: node_modules
	npm run dev

build: node_modules
	npm run build

preview: node_modules
	npm run preview

install:
	npm install

# Deploy to tingtingsoft.vn: push main, wait for the GitHub Actions workflow
# to publish the ghcr.io image, then pull + restart the container on the
# prod server (bot.tingting.vip, behind the Caddy edge). Nothing is built
# on the server.
deploy:
	git push origin main
	@HEAD=$$(git rev-parse HEAD); RUN=""; \
	for i in $$(seq 1 20); do \
	  RUN=$$(gh run list --workflow docker.yml --branch main --limit 1 \
	        --json databaseId,headSha \
	        -q '.[0] | select(.headSha=="'"$$HEAD"'") | .databaseId'); \
	  [ -n "$$RUN" ] && break; sleep 3; \
	done; \
	[ -n "$$RUN" ] || { echo "no docker.yml run found for $$HEAD"; exit 1; }; \
	gh run watch $$RUN --exit-status
	ssh root@bot.tingting.vip 'cd /opt/ttsoft && docker compose pull web && docker compose up -d --remove-orphans'
	@sleep 2
	@curl -fsS -o /dev/null -w 'tingtingsoft.vn/ttransport -> %{http_code}\n' https://tingtingsoft.vn/ttransport
	@curl -fsS -o /dev/null -w 'tingtingsoft.vn/          -> %{http_code}\n' https://tingtingsoft.vn/

# Roll prod back to a previously published image, e.g.
#   make rollback IMAGE=ghcr.io/4rankng/ttsoft:sha-1a2b3c4
IMAGE ?= ghcr.io/4rankng/ttsoft:main
rollback:
	@test -n "$(IMAGE)" || { echo "usage: make rollback IMAGE=ghcr.io/4rankng/ttsoft:sha-<sha>"; exit 1; }
	ssh root@bot.tingting.vip 'cd /opt/ttsoft && TTSOFT_IMAGE=$(IMAGE) docker compose up -d'

node_modules: package.json
	npm install
	@touch node_modules
