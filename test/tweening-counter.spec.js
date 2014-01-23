var raf = require('raf');
var TweeningCounter = require('tweening-counter');

describe('Tweening counter', function(){

  'use strict';

  var tweeningCounter,
    log;

  beforeEach(function(){
    tweeningCounter = new TweeningCounter();
    log = {};
  });

  it('should allow setting of the to value', function(){
    tweeningCounter.tween.to = spooks.fn({
      name: 'to',
      log: log
    });
    tweeningCounter.to(100);
    expect(log.args.to[0][0].val).to.be(100);
  });

  it('should allow setting of the ease function by name', function(){
    tweeningCounter.tween.ease = spooks.fn({
      name: 'ease',
      log: log
    });
    tweeningCounter.ease('out-cube');
    expect(log.args.ease[0][0]).to.be('out-cube');
  });

  it('should allow setting of the ease function directly', function(){
    var fn = function(){};
    tweeningCounter.tween.ease = spooks.fn({
      name: 'ease',
      log: log
    });
    tweeningCounter.ease(fn);
    expect(log.args.ease[0][0]).to.be(fn);
  });

  it('should allow setting of the duration', function(){
    tweeningCounter.tween.duration = spooks.fn({
      name: 'duration',
      log: log
    });
    tweeningCounter.duration(2000);
    expect(log.args.duration[0][0]).to.be(2000);
  });

  it('should allow addition of an onEnd callback', function(){
    var spy = spooks.fn({
      name: 'spy',
      log: log
    });
    tweeningCounter.onEnd(spy);
    tweeningCounter.tween.emit('end');
    expect(log.counts.spy).to.be(1);
  });

  it('should update the el text on tween update', function(){
    tweeningCounter.update({ val: 2 });
    expect(tweeningCounter.el.textContent).to.be('2');
  });

  it('should cancel the latest raf callback on end', function(){
    raf.cancel = spooks.fn({
      name: 'cancel',
      log: log
    });
    // Set a fake rafId.
    tweeningCounter.rafId = 1;
    tweeningCounter.tween.emit('end');
    expect(log.args.cancel[0][0]).to.be(1);
  });

});