# tweening-counter

A counter that uses a timing function to move towards it's destination.

[![browser support](https://ci.testling.com/tanem/tweening-counter.png)](https://ci.testling.com/tanem/tweening-counter)

## Live Demo

[Check out the live demo on CodePen](http://codepen.io/tanem/pen/AaxDd), which uses the stand-alone file.

## Installation

Ensure [component(1)](http://component.io) is installed, then:

```sh
$ component install tanem/tweening-counter
```

## Stand-alone

This library may be used stand-alone without the component tool. To build the stand-alone files, ensure [UglifyJS2](https://github.com/mishoo/UglifyJS2) is installed, then: 

```sh
$ make standalone
```

Then add ./tweening-counter.js to your application and reference the `TweeningCounter` global.

## Unit Tests

To run the unit tests, ensure [testling](https://github.com/substack/testling) is installed. Then:

```sh
$ make test
```

## API

### new TweeningCounter(el:Element)

Initialize a new `TweeningCounter` with the given `el`.

### TweeningCounter#to(val:Number)

Set the value to tween to.

```js
tweeningCounter.to(50)
```

### TweeningCounter#ease(fn:String|Function)

Set the easing function.

```js
tweeningCounter.ease('in-out-sine')
tweeningCounter.ease(function(){})
```

### TweeningCounter#duration(ms:Number)

Set the easing duration.

```js
tweeningCounter.duration(1000)
```

### TweeningCounter#onEnd(fn:Function)

Add an `end` event handler bound to this `TweeningCounter`.

```js
tweeningCounter.onEnd(function(){})
```

### TweeningCounter#start

Start the counter.

```js
tweeningCounter.start()
```

## License

The MIT License (MIT)

Copyright (c) 2014 Tane Morgan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.