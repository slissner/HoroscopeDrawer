import {elements} from "./elements";

export class Zodiac {
  constructor() {
    return {
      stroke: "rgb(40, 40, 40)",
      radius: {
        outer: 50,
        inner: 44,
        get innerAuxiliary () {
          return this.inner + 0.5;
        },
        get betweenOuterInner () {
          return this.outer - ((this.outer - this.inner) / 2);
        }
      },
      signs: [{
        number: 1,
        name: "Aries",
        symbol: "♈",
        element: "fire",
        fillColor: () => elements.fire.fillColor
      }, {
        number: 2,
        name: "Taurus",
        symbol: "♉",
        element: "Earth",
        fillColor: () => elements.earth.fillColor
      }, {
        number: 3,
        name: "Gemini",
        symbol: "♊",
        element: "wind",
        fillColor: () => elements.wind.fillColor
      }, {
        number: 4,
        name: "Cancer",
        symbol: "♋",
        element: "water",
        fillColor: () => elements.water.fillColor
      }, {
        number: 5,
        name: "Leo",
        symbol: "♌",
        element: "fire",
        fillColor: () => elements.fire.fillColor
      }, {
        number: 6,
        name: "Virgo",
        symbol: "♍",
        element: "earth",
        fillColor: () => elements.earth.fillColor
      }, {
        number: 7,
        name: "Libra",
        symbol: "♎",
        element: "wind",
        fillColor: () => elements.wind.fillColor
      }, {
        number: 8,
        name: "Scorpio",
        symbol: "♏",
        element: "water",
        fillColor: () => elements.water.fillColor
      }, {
        number: 9,
        name: "Sagittarius",
        symbol: "♐",
        element: "fire",
        fillColor: () => elements.fire.fillColor
      }, {
        number: 10,
        name: "Capricorn",
        symbol: "♑",
        element: "earth",
        fillColor: () => elements.earth.fillColor
      }, {
        number: 11,
        name: "Aquarius",
        symbol: "♒",
        element: "wind",
        fillColor: () => elements.wind.fillColor
      }, {
        number: 12,
        name: "Pisces",
        symbol: "♓",
        element: "water",
        fillColor: () => elements.water.fillColor
      }]
    };
  }
}
export let zodiac = new Zodiac();