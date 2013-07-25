;(function(){

  'use strict';

  window.requestAnimFrame = Modernizr.prefixed('requestAnimationFrame', window);

  var Counter = window.Counter = function Counter(opts) {
    opts = opts || {};
    _.extend(this, {
      $el: null,
      durationVal: 3,
      startVal: 0,
      finishVal: 0,
      timingFunction: $.easing.easeOutCubic
    }, opts);
    if (!this.$el) throw new Error ('$el must be defined');
    this._animate = this._animate.bind(this);
  };

  Counter.prototype.start = function(val){
    this.startVal = val;
    return this;
  };

  Counter.prototype.finish = function(val){
    this.finishVal = val;
    return this;
  };

  Counter.prototype.duration = function(val){
    this.durationVal = val || this.durationVal;
    return this;
  };

  Counter.prototype.run = function(cb){
    this.delta = this.finishVal - this.startVal;
    this.beginning = Date.now();
    this.cb = cb;
    window.requestAnimFrame(this._animate);
  };

  Counter.prototype._animate = function(){
    var elapsed = (Date.now() - this.beginning) / 1000;
    var count = this.timingFunction(null, elapsed, this.startVal, this.delta, this.durationVal);
    var roundedCount = Math.round(count);
    if (this._hasReachedFinish(roundedCount)) {
      this.$el.text(this.finishVal);
      this.startVal = this.finishVal;
      if (_.isFunction(this.cb)) this.cb();
      return;
    } else {
      this.$el.text(roundedCount);
    }
    window.requestAnimFrame(this._animate);
  };

  Counter.prototype._hasReachedFinish = function(roundedCount){
    return ((this.delta < 0 && roundedCount <= this.finishVal) ||
      (this.delta > 0 && roundedCount >= this.finishVal) ||
      (this.delta === 0));
  };

}());