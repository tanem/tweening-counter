'use strict';

var raf = require('raf');
var expect = require('expect.js');
var sinon = require('sinon');
var TweeningCounter = require('tweening-counter');

describe('Tweening counter', function(){

  var tweeningCounter;

  beforeEach(function(){
    tweeningCounter = new TweeningCounter();
  });

  it('should allow setting of the to value', function(){
    var toStub = sinon.stub(tweeningCounter.tween, 'to');
    tweeningCounter.to(100);
    expect(toStub.args[0][0].val).to.be(100);
  });

  it('should allow setting of the ease function by name', function(){
    var easeStub = sinon.stub(tweeningCounter.tween, 'ease');
    tweeningCounter.ease('out-cube');
    expect(easeStub.args[0][0]).to.be('out-cube');
  });

  it('should allow setting of the ease function directly', function(){
    var fn = sinon.stub();
    var easeStub = sinon.stub(tweeningCounter.tween, 'ease');

    tweeningCounter.ease(fn);
    
    expect(easeStub.args[0][0]).to.be(fn);
  });

  it('should allow setting of the duration', function(){
    var durationStub = sinon.stub(tweeningCounter.tween, 'duration');
    tweeningCounter.duration(2000);
    expect(durationStub.args[0][0]).to.be(2000);
  });

  it('should allow addition of an onEnd callback', function(){
    var fn = sinon.stub();
    tweeningCounter.onEnd(fn);

    tweeningCounter.tween.emit('end');

    expect(fn.callCount).to.be(1);
  });

  it('should allow setting of the number of decimal places in the output', function(){
    tweeningCounter.fixed(2);
    expect(tweeningCounter._fixed).to.be(2);
  });

  it('should update the el text on tween update with the correct number of decimal places', function(){
    tweeningCounter = new TweeningCounter().fixed(2);
    tweeningCounter.update({ val: 2.759 });
    expect(tweeningCounter.el.textContent).to.be('2.76');
  });

  it('should cancel the latest raf callback on end', function(){
    raf.cancel = sinon.stub();
    // Set a fake rafId.
    tweeningCounter.rafId = 1;

    tweeningCounter.tween.emit('end');
    
    expect(raf.cancel.args[0][0]).to.be(1);
  });

});