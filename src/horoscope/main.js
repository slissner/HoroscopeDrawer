import {Calc} from "./calc"
import {elements} from "./elements";
import {zodiac} from "./zodiac";
import {planets} from "./planets";
import {drawer} from "./drawer";

export class Horoscope {
  constructor(planetsDegrees) {
    this._elements = elements;
    this._zodiac = zodiac;
    this._planets = planets;
    this._drawer = drawer;

    if (planetsDegrees) {
      this._planetsDegrees = planetsDegrees;
    } else {
      this._planetsDegrees = {
        sun: Calc.getRandomArbitrary(0, 360),
        mercury: Calc.getRandomArbitrary(0, 360),
        venus: Calc.getRandomArbitrary(0, 360),
        mars: Calc.getRandomArbitrary(0, 360),
        moon: Calc.getRandomArbitrary(0, 360),
        jupiter: Calc.getRandomArbitrary(0, 360),
        saturn: Calc.getRandomArbitrary(0, 360),
        uranus: Calc.getRandomArbitrary(0, 360),
        neptune: Calc.getRandomArbitrary(0, 360),
        pluto: Calc.getRandomArbitrary(0, 360),
        mars: Calc.getRandomArbitrary(0, 360),
      }
    }
  };

  get elements() {
    return this._elements;
  }

  set elements(value) {
    this._elements = value;
  }

  get zodiac() {
    return this._zodiac;
  }

  set zodiac(value) {
    this._zodiac = value;
  }

  get planets() {
    return this._planets;
  }

  set planets(value) {
    this._planets = value;
  }

  /**
   * Draws a horoscope.
   * @param selector
   * @return Returns the snap object.
   */
  draw(selector) {
    return this._drawer.draw(selector, this._planetsDegrees);
  }
}