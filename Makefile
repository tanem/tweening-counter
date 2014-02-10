STANDALONE_DIR = standalone

build: components index.js template.js
	@component build --dev

components: component.json
	@component install --dev

template.js: template.html
	@component convert $<

clean:
	rm -fr build components $(STANDALONE_DIR)

test: build
	@mocha-phantomjs -R dot test/index.html

tweening-counter.js: build
	@component build --standalone TweeningCounter --out $(STANDALONE_DIR) --name tweening-counter

tweening-counter.min.js: tweening-counter.js
	@uglifyjs $(STANDALONE_DIR)/$< > $(STANDALONE_DIR)/$@

.PHONY: clean test
