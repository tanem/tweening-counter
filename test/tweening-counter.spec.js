var TweeningCounter = require('tweening-counter');

describe('Tweening counter', function(){

  'use strict';

  var tweeningCounter,
    log;

  beforeEach(function(){
    tweeningCounter = new TweeningCounter(document.createElement('div'));
    log = {};
  });

  it('should throw an error if an element is not provided on initialisation', function(){
    expect(function(){
      new TweeningCounter();
    }).to.throwError(/el is required/);
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

  it('should allow setting of the onComplete function', function(){
    var fn = function(){};
    tweeningCounter.tween.once = spooks.fn({
      name: 'once',
      log: log
    });
    tweeningCounter.onComplete(fn);
    expect(log.args.once[0][0]).to.be('end');
    expect(log.args.once[0][1]).to.be(fn);
  });

  it('should update the el text on tween update', function(){
    tweeningCounter.update({ val: 2 });
    expect(tweeningCounter.el.textContent).to.be('2');
  });

});