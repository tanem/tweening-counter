describe('Counter', function(){

  'use strict';

  var counter;

  beforeEach(function(){
    var $div = $('<div class="counter" />');
    counter = new window.Counter({
      $el: $div
    });

  });

  it('should have a default start value of 0', function(){
    expect(counter.startVal).toBe(0);
  });

  it('should have a default finish value of 0', function(){
    expect(counter.finishVal).toBe(0);
  });

  it('should have a default duration of 3s', function(){
    expect(counter.durationVal).toBe(3);
  });

  it('should throw an error if el is not defined', function(){
    expect(function(){
      counter = new window.Counter();
    }).toThrow('$el must be defined');
  });

  it('should set the start value correctly', function(){
    counter.start(10);
    expect(counter.startVal).toBe(10);
  });

  it('should set the finish value correctly', function(){
    counter.finish(10);
    expect(counter.finishVal).toBe(10);
  });

  it('should set the duration value correctly if an explicit value is passed', function(){
    counter.duration(5);
    expect(counter.durationVal).toBe(5);
  });

  it('should set the duration value correctly if an explicit value is not passed', function(){
    counter.duration();
    expect(counter.durationVal).toBe(3);
  });

  describe('Run:', function(){

    beforeEach(function(){
      spyOn(Date, 'now').andReturn(1000);
      spyOn(window, 'requestAnimFrame');
      counter.finish(10).run();
    });

    it('Should calculate the delta correctly', function(){
      expect(counter.delta).toBe(10);
    });

    it('Should set the beginning of the animation to the current time', function(){
      expect(counter.beginning).toBe(1000);
    });

    it('Should set the animate function as the callback to requestAnimFrame', function(){
      expect(window.requestAnimFrame).toHaveBeenCalledWith(counter._animate);
    });

  });

  describe('Animate:', function(){

    beforeEach(function(){
      spyOn(window, 'requestAnimFrame');
      spyOn(counter, 'timingFunction').andCallThrough();
      counter.beginning = 0;
      counter.delta = 50;
      counter.finishVal = 50;
    });

    it('Should call the timing function with the correct arguments', function(){
      spyOn(Date, 'now').andReturn(1000);
      counter._animate();
      expect(counter.timingFunction).toHaveBeenCalledWith(null, 1, 0, 50, 3);
    });

    it('Should set el to the correct value during the animation', function(){
      spyOn(Date, 'now').andReturn(1000);
      counter._animate();
      expect(counter.$el.text()).toBe('35');
    });

    it('Should correctly determine if the animation has finished when moving in the positive direction', function(){
      expect(counter._hasReachedFinish(50)).toBe(true);
    });

    it('Should correctly determine if the animation has finished when moving in the negative direction', function(){
      counter.delta = -50;
      counter.finishVal = 0;

      expect(counter._hasReachedFinish(0)).toBe(true);
    });

    it('Should correctly determine if the animation has finished when there is no difference between start and finish values', function(){
      counter.delta = 0;
      expect(counter._hasReachedFinish(0)).toBe(true);
    });

    it('Should call any provided callback when the animation has finished', function(){
      spyOn(Date, 'now').andReturn(3000);
      counter.cb = jasmine.createSpy();

      counter._animate();

      expect(counter.cb).toHaveBeenCalled();
    });

    it('Should set el to the finish value when the animation has finished', function(){
      spyOn(Date, 'now').andReturn(3000);
      counter._animate();
      expect(counter.$el.text()).toBe('50');
    });

  });

});