'use strict';

var raf = require('raf');
var Tween = require('tween');
var bind = require('bind');
var isfunction = require('isfunction');
var template = require('./template.html');
var domify = require('domify');

/**
 * Expose `TweeningCounter`.
 */

module.exports = TweeningCounter;

/**
 * Initialize a new `TweeningCounter`.
 *
 * @api public
 */

function TweeningCounter(){
  this.el = domify(template);
  this.interpolate = bind(this, 'interpolate');
  this.update = bind(this, 'update');
  this.cancelAnimationFrame = bind(this, 'cancelAnimationFrame');
  this.tween = Tween({ val: 0 })
    .ease('out-cube')
    .to({ val: 0 })
    .update(this.update)
    .duration(1000)
    .on('end', this.cancelAnimationFrame);
}

/**
 * Set the value to tween to.
 *
 * ```js
 * tweeningCounter.to(50)
 * ```
 *
 * @param {Number} val
 * @return {TweeningCounter} self
 * @api public
 */

TweeningCounter.prototype.to = function(val){
  this.tween.to({ val: val });
  return this;
};

/**
 * Set the easing function.
 *
 * ```js
 * tweeningCounter.ease('in-out-sine')
 * tweeningCounter.ease(function(){})
 * ```
 *
 * @param {String|Function} fn
 * @return {TweeningCounter} self
 * @see component/ease
 * @api public
 */

TweeningCounter.prototype.ease = function(fn){
  this.tween.ease(fn);
  return this;
};

/**
 * Set the easing duration.
 *
 * ```js
 * tweeningCounter.duration(1000);
 * ```
 *
 * @param {Number} ms
 * @return {TweeningCounter} self
 * @api public
 */

TweeningCounter.prototype.duration = function(ms){
  this.tween.duration(ms);
  return this;
};

/**
 * Add an `end` event handler bound to this `TweeningCounter`.
 *
 * ```js
 * tweeningCounter.onEnd(function(){})
 * ```
 *
 * @param {Function} fn
 * @return {TweeningCounter} self
 * @api public
 */

TweeningCounter.prototype.onEnd = function(fn){
  if (isfunction(fn)) this.tween.on('end', bind(this, fn));
  return this;
};

/**
 * Start the counter.
 *
 * ```js
 * tweeningCounter.start()
 * ```
 *
 * @api public
 */

TweeningCounter.prototype.start = function(){
  this.interpolate();
};

/**
 * Perform steps.
 *
 * @api private
 */

TweeningCounter.prototype.interpolate = function(){
  this.id = raf(this.interpolate);
  this.tween.update();
};

/**
 * Set `el` text content to the correct value.
 *
 * @param {Object} obj Contains the value at this point in time.
 * @api private
 */

TweeningCounter.prototype.update = function(obj){
  this.el.textContent = Math.round(obj.val);
};

/**
 * Cancels the last request animation frame.
 *
 * @api private
 */

TweeningCounter.prototype.cancelAnimationFrame = function(){
  raf.cancel(this.rafId);
};