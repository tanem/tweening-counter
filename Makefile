build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components tweening-counter*.js

test: build
	@mocha-phantomjs -R dot test/index.html

tweening-counter.js: index.js components
	@component build --standalone tweening-counter --out . --name tweening-counter

tweening-counter.min.js: tweening-counter.js
	@uglifyjs $< > $@

stats: tweening-counter.js tweening-counter.min.js
	@du -h $^

.PHONY: clean test stats