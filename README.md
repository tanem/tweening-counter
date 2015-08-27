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

### TweeningCounter#fixed(fixed:Number)

Specify the number of decimal places in the output.
 
```js
tweeningCounter.fixed(2)
```

### TweeningCounter#start

Start the counter.

```js
tweeningCounter.start()
```

## License

MIT