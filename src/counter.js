(function(){

  // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback){
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  // http://www.gizma.com/easing/#cub2
  var easeOutCubic = function(t, b, c, d){
    t /= d;
    t--;
    return c*(t*t*t + 1) + b;
  };

  // Copies source object properties onto target. 
  function extend(target) {
    var sourceObjects = Array.prototype.slice.call(arguments, 1);
    sourceObjects.forEach(function(object){
      Object.keys(object).forEach(function(key){
        target[key] = object[key];
      });
    });
  }

  function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }

  window.Counter = function Counter(opts) {
    opts = opts || {};
    extend(this, {
      el: null,
      durationVal: 3,
      startVal: 0,
      finishVal: 0,
      timingFunction: easeOutCubic
    }, opts);
    if (!this.el) throw new Error ('el must be defined');
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
    requestAnimFrame(this._animate);
  };

  Counter.prototype._animate = function(){
    var elapsed = (Date.now() - this.beginning) / 1000;
    var count = this.timingFunction(elapsed, this.startVal, this.delta, this.durationVal);
    var roundedCount = Math.round(count);
    if (this._hasReachedFinish(roundedCount)) {
      this.el.textContent = this.finishVal;
      this.startVal = this.finishVal;
      if (isFunction(this.cb)) this.cb();
      return;
    } else {
      this.el.textContent = roundedCount;
    }
    requestAnimFrame(this._animate);
  };

  Counter.prototype._hasReachedFinish = function(roundedCount){
    return ((this.delta < 0 && roundedCount <= this.finishVal) ||
      (this.delta > 0 && roundedCount >= this.finishVal) ||
      (this.delta === 0));
  };

}());