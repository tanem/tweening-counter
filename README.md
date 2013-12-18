# tweening-counter

A JavaScript counter that uses a timing function to move towards it's destination.

## Installation

Install with [component(1)](http://component.io):

```sh
$ component install tanem/tweening-counter
```

## Stand-alone

This library may be used stand-alone without the component tool, simply add ./tweening-counter.js to your application and reference the `TweeningCounter` global. With all its dependencies tweening-counter is the following size:

```
24K tweening-counter.js
16K tweening-counter.min.js
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

### TweeningCounter#onComplete(fn:Function)

Set the function to execute on completion.

```js
tweeningCounter.onComplete(function(){})
```

### TweeningCounter#start

Start the counter.

```js
tweeningCounter.start()
```

## License

MIT
