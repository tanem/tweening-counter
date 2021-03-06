STANDALONE_DIR = standalone

build: components index.js
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components $(STANDALONE_DIR)

test: build
	@npm install
	@testling

standalone: build
	@component build --standalone TweeningCounter --out $(STANDALONE_DIR) --name tweening-counter
	@uglifyjs $(STANDALONE_DIR)/tweening-counter.js > $(STANDALONE_DIR)/tweening-counter.min.js

.PHONY: clean test
