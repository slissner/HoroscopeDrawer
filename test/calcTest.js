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
      assert.strictEqual(point.y, 100, "The y-coordinate is not correct.");
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
      assert.strictEqual(point.y, -100, "The y-coordinate is not correct.");
    });

    it('should return expected coordinates for degree 360', function () {
      const radius = 100;
      const degree = 360;
      const offsetFromRadius = 0;
      const point = Calc.getPointOnCircle(radius, degree, offsetFromRadius);
      assert.strictEqual(point.x, -100, "The x-coordinate is not correct.");
      assert.strictEqual(point.y, 0, "The y-coordinate is not correct.");
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

  describe('#convertDegreeMinutesSecondsToFloat', () => {
    it('should return input argument if no object is passed as parameter', () => {
      const input = 280;
      const output = Calc.convertDegreeMinutesSecondsToFloat(input);
      assert.strictEqual(output, input, "The output is not equal input, although no-object had been passed.");
    });

    it('should throw an error if object misses `degree` property', function () {
      const degreeObj = {};
      assert.throws(() => {
        Calc.convertDegreeMinutesSecondsToFloat(degreeObj);
      }, Error);
    });

    it('should throw an error if `degree` property has non-circle values', function () {
      const degreeObj = {
        degree: -4
      };
      assert.throws(() => {
        Calc.convertDegreeMinutesSecondsToFloat(degreeObj);
      }, Error);

      const degreeOb2j = {
        degree: 380
      };
      assert.throws(() => {
        Calc.convertDegreeMinutesSecondsToFloat(degreeObj2);
      }, Error);
    });

    it('should calculate correctly', () => {
      const degreeObj = {
        degree: 100,
        minutes: 5,
        seconds: 10
      };
      const output = Calc.convertDegreeMinutesSecondsToFloat(degreeObj);
      const expected = 100 + (5 * 1/60) + (10 * 1/60^2);
      assert.strictEqual(output, expected, "The output is not equal input, although no-object had been passed.");
    });
  });
});