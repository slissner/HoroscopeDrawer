class Planets {
  constructor() {
    const svgImagePath = "./resources/svg/planets/";

    return [{
      number: 1,
      name: "Sun",
      symbol: "☉",
      imageUrl: svgImagePath + "sun.svg",
    }, {
      number: 2,
      name: "Mercury",
      symbol: "☿",
      imageUrl: svgImagePath + "mercury.svg",
    }, {
      number: 3,
      name: "Venus",
      symbol: "♀",
      imageUrl: svgImagePath + "venus.svg",
    }, {
      number: 4,
      name: "Mars",
      symbol: "♂",
      imageUrl: svgImagePath + "mars.svg",
    }, {
      number: 5,
      name: "Moon",
      symbol: "☽",
      imageUrl: svgImagePath + "moon.svg",
    }, {
      number: 6,
      name: "Jupiter",
      symbol: "♃",
      imageUrl: svgImagePath + "jupiter.svg",
    }, {
      number: 7,
      name: "Saturn",
      symbol: "♄",
      imageUrl: svgImagePath + "saturn.svg",
    }, {
      number: 8,
      name: "Uranus",
      symbol: "⛢",
      imageUrl: svgImagePath + "uranus.svg",
    }, {
      number: 9,
      name: "Neptune",
      symbol: "♆",
      imageUrl: svgImagePath + "neptune.svg",
    }, {
      number: 10,
      name: "Pluto",
      symbol: "♇",
      imageUrl: svgImagePath + "pluto.svg",
    }];
  }
}
export let planets = new Planets();