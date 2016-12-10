import {Calc} from '../src/horoscope/calc';

const assert = require('assert');

describe('CalcTest', function () {
  describe('#getPointOnCircle()', function () {
    it('should throw an error if arguments missing', function () {
      assert.throws(() => {
        Calc.getPointOnCircle();
      }, Error);
    });

    it('should return expected coordinates for degree 0', function () {
      const radius = 100;
      const degree = 0;
      const offsetFromRadius = 0;
      const point = Calc.getPointOnCircle(radius, degree, offsetFromRadius);
      assert.strictEqual(point.x, -100, "The x-coordinate is not correct.");
      assert.strictEqual(point.y, 0, "The y-coordinate is not correct.");
    });

    it('should return expected coordinates for degree 90', function () {
      const radius = 100;
      const degree = 90;
      const offsetFromRadius = 0;
      const point = Calc.getPointOnCircle(radius, degree, offsetFromRadius);
      assert.strictEqual(point.x, 0, "The x-coordinate is not correct.");
      assert.strictEqual(point.y, -100, "The y-coordinate is not correct.");
    });

    it('should return expected coordinates for degree 180', function () {
      const radius = 100;
      const degree = 180;
      const offsetFromRadius = 0;
      const point = Calc.getPointOnCircle(radius, degree, offsetFromRadius);
      assert.strictEqual(point.x, 100, "The x-coordinate is not correct.");
      assert.strictEqual(point.y, 0, "The y-coordinate is not correct.");
    });

    it('should return expected coordinates for degree 270', function () {
      const radius = 100;
      const degree = 270;
      const offsetFromRadius = 0;
      const point = Calc.getPointOnCircle(radius, degree, offsetFromRadius);
      assert.strictEqual(point.x, 0, "The x-coordinate is not correct.");
      assert.strictEqual(point.y, 100, "The y-coordinate is not correct.");
    });
  });

  describe('#getOppositeDegree()', function() {
    it('should return opposite degree for 180 in the zodiac', function () {
      const degree = 180;
      const expectedDegree = 0;
      const oppositeDegree = Calc.getOppositeDegree(degree);
      assert.strictEqual(oppositeDegree, expectedDegree, "The opposite degree value is not correct.");
    });

    it('should return opposite degree for 0 in the zodiac', function () {
      const degree = 0;
      const expectedDegree = 180;
      const oppositeDegree = Calc.getOppositeDegree(degree);
      assert.strictEqual(oppositeDegree, expectedDegree, "The opposite degree value is not correct.");
    });

    it('should return opposite degree for 240 in the zodiac', function () {
      const degree = 240;
      const expectedDegree = 60;
      const oppositeDegree = Calc.getOppositeDegree(degree);
      assert.strictEqual(oppositeDegree, expectedDegree, "The opposite degree value is not correct.");
    });

    it('should return opposite degree for 60 in the zodiac', function () {
      const degree = 60;
      const expectedDegree = 240;
      const oppositeDegree = Calc.getOppositeDegree(degree);
      assert.strictEqual(oppositeDegree, expectedDegree, "The opposite degree value is not correct.");
    });
  });
});