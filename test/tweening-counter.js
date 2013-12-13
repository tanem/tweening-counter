describe('tweening-counter', function(){

  'use strict';

  var tweeningCounter;

  beforeEach(function(){

    var div = document.createElement('div');
    div.className = 'counter';

    tweeningCounter = new window.TweeningCounter({
      el: div
    });

  });

  it('should have a default start value of 0', function(){
    expect(tweeningCounter.startVal).toBe(0);
  });

  it('should have a default finish value of 0', function(){
    expect(tweeningCounter.finishVal).toBe(0);
  });

  it('should have a default duration of 3s', function(){
    expect(tweeningCounter.durationVal).toBe(3);
  });

  it('should throw an error if el is not defined', function(){
    expect(function(){
      tweeningCounter = new window.TweeningCounter();
    }).toThrow('el must be defined');
  });

  it('should set the start value correctly', function(){
    tweeningCounter.start(10);
    expect(tweeningCounter.startVal).toBe(10);
  });

  it('should set the finish value correctly', function(){
    tweeningCounter.finish(10);
    expect(tweeningCounter.finishVal).toBe(10);
  });

  it('should set the duration value correctly', function(){
    tweeningCounter.duration(5);
    expect(tweeningCounter.durationVal).toBe(5);
  });

  it('should default to the correct duration value if an explicit value is not passed', function(){
    tweeningCounter.duration();
    expect(tweeningCounter.durationVal).toBe(3);
  });

  describe('Run:', function(){

    beforeEach(function(){
      spyOn(window, 'requestAnimFrame');
      spyOn(Date, 'now').andReturn(1000);
    });

    it('should set the correct delta value', function(){
      tweeningCounter
        .start(5)
        .finish(10)
        .run();
      expect(tweeningCounter.delta).toBe(5);
    });

    it('should set the beginning value to the current time', function(){
      tweeningCounter.run();
      expect(tweeningCounter.beginning).toBe(1000);
    });

    it('should set the finish callback correctly', function(){
      var cb = function(){};
      tweeningCounter.run(cb);
      expect(tweeningCounter.cb).toBe(cb);
    });

    it('should start the animation via requestAnimFrame', function(){
      tweeningCounter.run();
      expect(window.requestAnimFrame).toHaveBeenCalledWith(tweeningCounter._animate);
    });

  });

  describe('Animate:', function(){

    beforeEach(function(){
      spyOn(window, 'requestAnimFrame');
      spyOn(tweeningCounter, 'timingFunction').andCallThrough();
      tweeningCounter.beginning = 0;
      tweeningCounter.delta = 50;
      tweeningCounter.finishVal = 50;
    });

    it('Should call the timing function with the correct arguments', function(){
      spyOn(Date, 'now').andReturn(1000);
      tweeningCounter._animate();
      expect(tweeningCounter.timingFunction).toHaveBeenCalledWith(1, 0, 50, 3);
    });

    it('Should set el to the correct value during the animation', function(){
      spyOn(Date, 'now').andReturn(1000);
      tweeningCounter._animate();
      expect(tweeningCounter.el.textContent).toBe('35');
    });

    it('Should correctly determine if the animation has finished when moving in the positive direction', function(){
      expect(tweeningCounter._hasReachedFinish(50)).toBe(true);
    });

    it('Should correctly determine if the animation has finished when moving in the negative direction', function(){
      tweeningCounter.delta = -50;
      tweeningCounter.finishVal = 0;

      expect(tweeningCounter._hasReachedFinish(0)).toBe(true);
    });

    it('Should correctly determine if the animation has finished when there is no difference between start and finish values', function(){
      tweeningCounter.delta = 0;
      expect(tweeningCounter._hasReachedFinish(0)).toBe(true);
    });

    it('Should call any provided callback when the animation has finished', function(){
      spyOn(Date, 'now').andReturn(3000);
      tweeningCounter.cb = jasmine.createSpy();

      tweeningCounter._animate();

      expect(tweeningCounter.cb).toHaveBeenCalled();
    });

    it('Should set el to the finish value when the animation has finished', function(){
      spyOn(Date, 'now').andReturn(3000);
      tweeningCounter._animate();
      expect(tweeningCounter.el.textContent).toBe('50');
    });

  });

});
