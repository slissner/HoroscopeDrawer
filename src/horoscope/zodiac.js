import {elements} from "./elements";

export class Zodiac {
  constructor() {
    const svgImagePath = "./resources/svg/zodiac/";

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
        imageUrl: svgImagePath + "aries.svg",
        element: "fire",
        fillColor: () => elements.fire.fillColor
      }, {
        number: 2,
        name: "Taurus",
        symbol: "♉",
        imageUrl: svgImagePath + "taurus.svg",
        element: "Earth",
        fillColor: () => elements.earth.fillColor
      }, {
        number: 3,
        name: "Gemini",
        symbol: "♊",
        imageUrl: svgImagePath + "gemini.svg",
        element: "wind",
        fillColor: () => elements.wind.fillColor
      }, {
        number: 4,
        name: "Cancer",
        symbol: "♋",
        imageUrl: svgImagePath + "cancer.svg",
        element: "water",
        fillColor: () => elements.water.fillColor
      }, {
        number: 5,
        name: "Leo",
        symbol: "♌",
        imageUrl: svgImagePath + "leo.svg",
        element: "fire",
        fillColor: () => elements.fire.fillColor
      }, {
        number: 6,
        name: "Virgo",
        symbol: "♍",
        imageUrl: svgImagePath + "virgo.svg",
        element: "earth",
        fillColor: () => elements.earth.fillColor
      }, {
        number: 7,
        name: "Libra",
        symbol: "♎",
        imageUrl: svgImagePath + "libra.svg",
        element: "wind",
        fillColor: () => elements.wind.fillColor
      }, {
        number: 8,
        name: "Scorpio",
        symbol: "♏",
        imageUrl: svgImagePath + "scorpio.svg",
        element: "water",
        fillColor: () => elements.water.fillColor
      }, {
        number: 9,
        name: "Sagittarius",
        symbol: "♐",
        imageUrl: svgImagePath + "sagittarius.svg",
        element: "fire",
        fillColor: () => elements.fire.fillColor
      }, {
        number: 10,
        name: "Capricorn",
        symbol: "♑",
        imageUrl: svgImagePath + "capricorn.svg",
        element: "earth",
        fillColor: () => elements.earth.fillColor
      }, {
        number: 11,
        name: "Aquarius",
        symbol: "♒",
        imageUrl: svgImagePath + "aquarius.svg",
        element: "wind",
        fillColor: () => elements.wind.fillColor
      }, {
        number: 12,
        name: "Pisces",
        symbol: "♓",
        imageUrl: svgImagePath + "pisces.svg",
        element: "water",
        fillColor: () => elements.water.fillColor
      }]
    };
  }
}
export let zodiac = new Zodiac();