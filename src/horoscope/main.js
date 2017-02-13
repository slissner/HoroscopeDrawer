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

    this.validPlanetProperties = [
      "sun",
      "mercury",
      "venus",
      "mars",
      "moon",
      "jupiter",
      "saturn",
      "uranus",
      "neptune",
      "pluto",
      "mars"
    ];
    this.validHousesAxesProperties = [
      "axis2to8",
      "axis3to9",
      "axis4to10",
      "axis5to11",
      "axis6to12"
    ];

    if (properties) {
      this._properties = properties;
    } else {
      this.setDefaultProperties();
    }
    this.validateProperties(this._properties);
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

  /**
   * Draws a horoscope.
   * @param selector
   * @return Returns an object with snap objects.
   */
  draw(selector) {
    this._properties.selector = selector;
    return this._drawer.draw(this._properties);
  }

  /**
   * Sets default properties if no properties had been passed via constructor parameter.
   */
  setDefaultProperties() {
    this._properties = {};
    this._properties.zodiac = {};
    this._properties.zodiac.ascendant = {
      sign: Calc.getRandomInt(0, 11),
      degree: Calc.getRandomArbitrary(0, 30)
    }
    this._properties.planets = {};
    this._properties.planets.sun = Calc.getRandomArbitrary(0, 360);
    this._properties.planets.mercury = Calc.getRandomArbitrary(0, 360);
    this._properties.planets.venus = Calc.getRandomArbitrary(0, 360);
    this._properties.planets.mars = Calc.getRandomArbitrary(0, 360);
    this._properties.planets.moon = Calc.getRandomArbitrary(0, 360);
    this._properties.planets.jupiter = Calc.getRandomArbitrary(0, 360);
    this._properties.planets.saturn = Calc.getRandomArbitrary(0, 360);
    this._properties.planets.uranus = Calc.getRandomArbitrary(0, 360);
    this._properties.planets.neptune = Calc.getRandomArbitrary(0, 360);
    this._properties.planets.pluto = Calc.getRandomArbitrary(0, 360);

    this._properties.houses = {};
    this._properties.houses.hasHouses = true;
    this._properties.houses.axes = {};
    this._properties.houses.axes.axis2to8 = Calc.getRandomArbitrary(25, 40);
    this._properties.houses.axes.axis3to9 = Calc.getRandomArbitrary(50, 60);
    this._properties.houses.axes.axis4to10 = Calc.getRandomArbitrary(75, 85);
    this._properties.houses.axes.axis5to11 = Calc.getRandomArbitrary(110, 120);
    this._properties.houses.axes.axis6to12 = Calc.getRandomArbitrary(150, 160);
  }

  /**
   * Validates the properties of the horoscope. Usually, they are passed through the constructor argument.
   * @param properties
   */
  validateProperties(properties) {
    this.validateZodiac(properties);
    this.validatePlanets(properties);
    this.validateHouses(properties);
  }

  /**
   * @param properties
   */
  validateZodiac(properties) {
    if (!properties.hasOwnProperty('zodiac')) {
      throw new Error("No 'zodiac' property set for horoscope.");
    }
    if (!properties.zodiac.hasOwnProperty('ascendant')) {
      throw new Error("The 'zodiac' property requires 'ascendant' property to be set.");
    }
    if (!properties.zodiac.ascendant.hasOwnProperty('sign') || !properties.zodiac.ascendant.hasOwnProperty('degree')) {
      throw new Error("The 'zodiac.ascendant' property requires 'sign' and 'degree' property to be set.");
    }
  }

  /**
   * @param properties
   */
  validatePlanets(properties) {
    const validPlanets = this.validPlanetProperties;

    if (!properties.hasOwnProperty('planets')) {
      throw new Error("No 'planets' property set for horoscope.");
    }
    if (Object.keys(properties.planets).length <= 0) {
      throw new Error("The 'planets' property requires at least one planet to be set.");
    }
    const invalidPlanets = Object.keys(properties.planets).filter(elem => {
      if (!validPlanets.includes(elem)) {
        return true;
      }
      return false;
    });
    if (invalidPlanets.length > 0) {
      throw new Error("The 'planets' property has invalid planets.", invalidPlanets);
    }
  }

  validateHouses(properties) {
    const validHousesAxes = this.validHousesAxesProperties;

    if (!properties.hasOwnProperty('houses')) {
      throw new Error("The 'houses' is required.");
    }
    if (!properties.houses.hasOwnProperty('hasHouses')) {
      throw new Error("The 'houses' property requires 'hasHouses' property to be set.");
    }
    if (typeof(properties.houses.hasHouses) !== "boolean") {
      throw new Error("The 'houses' property requires 'hasHouses' property to be of type boolean set.");
    }
    if (properties.houses.hasHouses) {
      if (!properties.houses.hasOwnProperty('axes')) {
        throw new Error("No 'axes' property set for horoscope.");
      }
      if (Object.keys(properties.houses.axes).length != validHousesAxes.length) {
        throw new Error("A horoscope with 'houses' requires exactly " + validHousesAxes.length + " axes to be set.");
      }
      const invalidHousesAxes = Object.keys(properties.houses.axes).filter(elem => {
        if (!validHousesAxes.includes(elem)) {
          return true;
        }
        return false;
      });
      if (invalidHousesAxes.length > 0) {
        throw new Error("The 'houses' property has invalid axes set.", invalidHousesAxes);
      }
    }
  }
}