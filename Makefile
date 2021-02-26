setup:
	npm ci

test:
	npm test

test-watch:
	npx jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint --fix .

publish:
	npm publish

.PHONY: test
