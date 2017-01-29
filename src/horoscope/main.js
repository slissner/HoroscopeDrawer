import {Calc} from "./calc"
import {elements} from "./elements";
import {zodiac} from "./zodiac";
import {planets} from "./planets";
import {drawer} from "./drawer";

export class Horoscope {
  constructor(properties) {
    this._elements = elements;
    this._zodiac = zodiac;
    this._planets = planets;
    this._drawer = drawer;

    if (properties) {
      this._properties = properties;
    } else {
      this.setDefaultProperties();
    }
  }

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

  setDefaultProperties() {
    this._properties = {};
    this._properties.planets = {};
    this._properties.planets.sun = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.mercury = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.venus = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.mars = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.moon = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.jupiter = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.saturn = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.uranus = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.neptune = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.pluto = {
      degree: Calc.getRandomArbitrary(0, 360)
    };
    this._properties.planets.mars = {
      degree: Calc.getRandomArbitrary(0, 360)
    };

    this._properties.houses = {};
    this._properties.houses.house1 = {
      degree: -0
    };
    this._properties.houses.house2 = {
      degree: Calc.getRandomArbitrary(-25, -40)
    };
    this._properties.houses.house3 = {
      degree: Calc.getRandomArbitrary(-50, -60)
    };
    this._properties.houses.house4 = {
      degree: Calc.getRandomArbitrary(-75, -85)
    };
    this._properties.houses.house5 = {
      degree: Calc.getRandomArbitrary(-110, -120)
    };
    this._properties.houses.house6 = {
      degree: Calc.getRandomArbitrary(-150, -160)
    };
    this._properties.houses.house7 = {
      degree: Calc.getOppositeDegree(this._properties.houses.house1.degree)
    };
    this._properties.houses.house8 = {
      degree: Calc.getOppositeDegree(this._properties.houses.house2.degree)
    };
    this._properties.houses.house9 = {
      degree: Calc.getOppositeDegree(this._properties.houses.house3.degree)
    };
    this._properties.houses.house10 = {
      degree: Calc.getOppositeDegree(this._properties.houses.house4.degree)
    };
    this._properties.houses.house11 = {
      degree: Calc.getOppositeDegree(this._properties.houses.house5.degree)
    };
    this._properties.houses.house12 = {
      degree: Calc.getOppositeDegree(this._properties.houses.house6.degree)
    };
  }

  /**
   * Draws a horoscope.
   * @param selector
   * @return Returns an object with snap objects.
   */
  draw(selector) {
    this._properties.selector = selector;
    return this._drawer.draw(this._properties);
  }
}