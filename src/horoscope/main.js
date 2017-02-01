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
    this.validHousesProperties = [
      "house1",
      "house2",
      "house3",
      "house4",
      "house5",
      "house6",
      "house7",
      "house8",
      "house9",
      "house10",
      "house11",
      "house12"
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
    this._properties.zodiac.start = {
      sign: Calc.getRandomInt(0, 11),
      degree: Calc.getRandomArbitrary(0, 30)
    }
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

    this._properties.hasHouses = true;
    this._properties.houses = {};
    this._properties.houses.house1 = {
      degree: 0
    };
    this._properties.houses.house2 = {
      degree: Calc.getRandomArbitrary(25, 40)
    };
    this._properties.houses.house3 = {
      degree: Calc.getRandomArbitrary(50, 60)
    };
    this._properties.houses.house4 = {
      degree: Calc.getRandomArbitrary(75, 85)
    };
    this._properties.houses.house5 = {
      degree: Calc.getRandomArbitrary(110, 120)
    };
    this._properties.houses.house6 = {
      degree: Calc.getRandomArbitrary(150, 160)
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
    if (!properties.zodiac.hasOwnProperty('start')) {
      throw new Error("The 'zodiac' property requires 'start' property to be set.");
    }
    if (!properties.zodiac.start.hasOwnProperty('sign') || !properties.zodiac.start.hasOwnProperty('degree')) {
      throw new Error("The 'zodiac.start' property requires 'sign' and 'degree' property to be set.");
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
      if (!properties.planets[elem].hasOwnProperty('degree')) {
        return true;
      }
      return false;
    });
    if (invalidPlanets.length > 0) {
      throw new Error("The 'planets' property has invalid planets.", invalidPlanets);
    }
  }

  validateHouses(properties) {
    const validHouses = this.validHousesProperties;

    if (!properties.hasOwnProperty('hasHouses')) {
      throw new Error("The 'houses' property requires 'hasHouses' property to be set.");
    }
    if (typeof(properties.hasHouses) !== "boolean") {
      throw new Error("The 'houses' property requires 'hasHouses' property to be of type boolean set.");
    }
    if (properties.hasHouses) {
      if (!properties.hasOwnProperty('houses')) {
        throw new Error("No 'houses' property set for horoscope.");
      }
      if (Object.keys(properties.houses).length != validHouses.length) {
        throw new Error("A horoscope with 'houses' requires exactly 12 houses to be set.");
      }
      const invalidHouses = Object.keys(properties.houses).filter(elem => {
        if (!validHouses.includes(elem)) {
          return true;
        }
        if (!properties.houses[elem].hasOwnProperty('degree')) {
          return true;
        }
        return false;
      });
      if (invalidHouses.length > 0) {
        throw new Error("The 'houses' property has invalid houses set.", invalidHouses);
      }
    }
  }
}