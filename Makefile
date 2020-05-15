install: install-deps

install-deps:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test
