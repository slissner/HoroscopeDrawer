import {zodiac} from '../src/horoscope/zodiac';

const assert = require('assert');

describe('ZodiacTest', function () {
  describe('#getStartSignIndex()', function () {
    it('should return 0 if the parameter is empty', function () {
      const index = zodiac.getStartSignIndex();
      assert.strictEqual(index, 0, "The sign index should be 0.");
    });

    it('should throw an error if start sign as number input is not an integer number', function () {
      assert.throws(() => {
        zodiac.getStartSignIndex(6.121);
      }, TypeError);
    });

    it('should throw an error if start sign as number is out of lower range', function () {
      assert.throws(() => {
        zodiac.getStartSignIndex(-1);
      }, RangeError, "Start sign as number must not be negative integer.");
    });

    it('should throw an error if start sign as number is out of upper range', function () {
      assert.throws(() => {
        zodiac.getStartSignIndex(12);
      }, RangeError, "Start sign as number must not be greater than 11.");
    });

    it('should return 0 if the parameter is 0', function () {
      const index = zodiac.getStartSignIndex(0);
      assert.strictEqual(index, 0, "The start sign index should be 0.");
    });

    it('should return 1 if the parameter is "taurus"', function () {
      const index = zodiac.getStartSignIndex("taurus");
      assert.strictEqual(index, 1, "The start sign index should be 1.");
    });

    it('should return 1 if the parameter is "Taurus"', function () {
      const index = zodiac.getStartSignIndex("Taurus");
      assert.strictEqual(index, 1, "The start sign index should be 1.");
    });

    it('should return 0 if the string parameter is not found in zodiac list', function () {
      const index = zodiac.getStartSignIndex("Not contained");
      assert.strictEqual(index, 0, "The start sign index should be 0.");
    });
  });

  describe('#validateSignDegree()', function () {
    it('should return 0 if the parameter is empty', function () {
      const degree = zodiac.validateSignDegree();
      assert.strictEqual(degree, 0, "The start sign index should be 0.");
    });

    it('should throw an error if degree input is not a number', function () {
      assert.throws(() => {
        zodiac.validateSignDegree("string not cool");
      }, TypeError);
    });

    it('should throw an error if degree is out of lower range', function () {
      assert.throws(() => {
        zodiac.validateSignDegree(-1);
      }, RangeError, "Degree must not be negative integer.");
    });

    it('should throw an error if degree is out of upper range', function () {
      assert.throws(() => {
        zodiac.validateSignDegree(31);
      }, RangeError, "Degree must not be greater than 30.");
    });

    it('should return 0 if the parameter is 0', function () {
      const degree = zodiac.validateSignDegree(0);
      assert.strictEqual(degree, 0, "The degree value should be 0.");
    });

    it('should return 15 if the parameter is 15', function () {
      const degree = zodiac.validateSignDegree(15);
      assert.strictEqual(degree, 15, "The degree value should be 15.");
    });

    it('should return 16.12131 if the parameter is 16.12131', function () {
      const degree = zodiac.validateSignDegree(16.12131);
      assert.strictEqual(degree, 16.12131, "The degree value should be 15.");
    });

    it('should return 30 if the parameter is 30', function () {
      const degree = zodiac.validateSignDegree(30);
      assert.strictEqual(degree, 30, "The degree value should be 30.");
    });
  });
});