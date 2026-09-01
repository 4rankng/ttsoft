.PHONY: dev build preview install

dev: node_modules
	npm run dev

build: node_modules
	npm run build

preview: node_modules
	npm run preview

install:
	npm install

node_modules: package.json
	npm install
	@touch node_modules
