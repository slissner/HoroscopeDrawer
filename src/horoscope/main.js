import {elements} from "./elements";
import {zodiac} from "./zodiac";
import {planets} from "./planets";
import {drawer} from "./drawer";

export class Horoscope {
  constructor() {
    this._elements = elements;
    this._zodiac = zodiac;
    this._planets = planets;
    this._drawer = drawer;
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
    return this._drawer.draw(selector);
  }
}