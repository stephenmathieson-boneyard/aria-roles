
build: components index.js
	@component build --dev

components: component.json
	@component install --dev

index.js: node_modules update.js
	@node update.js

node_modules: package.json
	@npm install

test: index.js
	node test.js

clean:
	rm -fr build components template.js

.PHONY: clean test
