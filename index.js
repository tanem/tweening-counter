'use strict';

var raf = require('raf');
var Tween = require('tween');
var bind = require('bind');
var isfunction = require('isfunction');

/**
 * Expose `TweeningCounter`.
 */

module.exports = TweeningCounter;

/**
 * Initialize a new `TweeningCounter` with the given `el`.
 *
 * @param {Element} el
 * @api public
 */

function TweeningCounter(el){
  if (!el) throw new Error('el is required');
  this.el = el;
  this.interpolate = bind(this, 'interpolate');
  this.update = bind(this, 'update');
  this.tween = Tween({ val: 0 })
    .ease('out-cube')
    .to({ val: 0 })
    .update(this.update)
    .duration(1000);
}

/**
 * Set the value to tween to.
 *
 *     tweeningCounter.to(50)
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
 *     tweeningCounter.ease('in-out-sine')
 *     tweeningCounter.ease(function(){})
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
 *     tweeningCounter.duration(1000);
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
 * Set the function to execute on completion.
 *
 *     tweeningCounter.onComplete(function(){})
 *
 * @param {Function} fn
 * @return {TweeningCounter} self
 * @api public
 */

TweeningCounter.prototype.onComplete = function(fn){
  if (isfunction(fn)) this.tween.once('end', fn);
  return this;
};

/**
 * Start the counter.
 *
 *     tweeningCounter.start()
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
  raf(this.interpolate);
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