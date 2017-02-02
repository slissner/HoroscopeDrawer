import {elements} from "./elements";

export class Zodiac {
  constructor() {
    this.svgImagePath = "./resources/svg/zodiac/";
    this.radius = {
      outer: 50,
      inner: 43,
      get innerAuxiliary () {
        return this.inner + 0.5;
      },
      get betweenOuterInner () {
        return this.outer - ((this.outer - this.inner) / 2);
      }
    };
    this.signs = [{
      number: 1,
      name: "Aries",
      symbol: "♈",
      imageUrl: this.svgImagePath + "aries.svg",
      element: "fire"
    }, {
      number: 2,
      name: "Taurus",
      symbol: "♉",
      imageUrl: this.svgImagePath + "taurus.svg",
      element: "earth"
    }, {
      number: 3,
      name: "Gemini",
      symbol: "♊",
      imageUrl: this.svgImagePath + "gemini.svg",
      element: "wind"
    }, {
      number: 4,
      name: "Cancer",
      symbol: "♋",
      imageUrl: this.svgImagePath + "cancer.svg",
      element: "water"
    }, {
      number: 5,
      name: "Leo",
      symbol: "♌",
      imageUrl: this.svgImagePath + "leo.svg",
      element: "fire"
    }, {
      number: 6,
      name: "Virgo",
      symbol: "♍",
      imageUrl: this.svgImagePath + "virgo.svg",
      element: "earth"
    }, {
      number: 7,
      name: "Libra",
      symbol: "♎",
      imageUrl: this.svgImagePath + "libra.svg",
      element: "wind"
    }, {
      number: 8,
      name: "Scorpio",
      symbol: "♏",
      imageUrl: this.svgImagePath + "scorpio.svg",
      element: "water"
    }, {
      number: 9,
      name: "Sagittarius",
      symbol: "♐",
      imageUrl: this.svgImagePath + "sagittarius.svg",
      element: "fire"
    }, {
      number: 10,
      name: "Capricorn",
      symbol: "♑",
      imageUrl: this.svgImagePath + "capricorn.svg",
      element: "earth"
    }, {
      number: 11,
      name: "Aquarius",
      symbol: "♒",
      imageUrl: this.svgImagePath + "aquarius.svg",
      element: "wind"
    }, {
      number: 12,
      name: "Pisces",
      symbol: "♓",
      imageUrl: this.svgImagePath + "pisces.svg",
      element: "water"
    }];

    return {
      radius: this.radius,
      signs: this.signs,
      getStartSignIndex: this.getStartSignIndex,
      validateSignDegree: this.validateSignDegree
    };
  }

  getStartSignIndex(sign) {
    if (!sign) {
      return 0;
    }

    let index = 0;
    if (typeof sign === "number") {
      if (!Number.isInteger(sign)) {
        throw new TypeError("Sign start sign as a number must be of type integer.");
      }
      if (sign < 0 || sign > 11) {
        throw new RangeError("Zodiac start sign index must be in the range between 0 and 11.");
      }

      index = this.signs.findIndex((elem) => {
        return elem.number === sign;
      });
    } else if (typeof sign === "string") {
      sign = sign.charAt(0).toUpperCase() + sign.slice(1);
      index = this.signs.findIndex((elem) => {
        return elem.name === sign;
      });
      if (index === -1) {
        index = 0;
      }
    }
    return index;
  }

  validateSignDegree(degree) {
    if (!degree) {
      return 0;
    }
    if (typeof degree !== "number") {
      throw new TypeError("Parameter must be of type number.");
    }
    if (degree < 0 || degree > 30) {
      throw new RangeError("Zodiac degree must be in the range between 0 and 30.");
    }
    return degree;
  }
}
export let zodiac = new Zodiac();