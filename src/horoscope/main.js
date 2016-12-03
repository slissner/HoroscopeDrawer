import Snap from "../../node_modules/snapsvg/dist/snap.svg-min";

export class Horoscope {
  constructor() {
    this.zodiac = {
      stroke: "rgb(40, 40, 40)",
      radius: {
        outer: 50,
        inner: 44,
        innerAuxiliary: () => {
          return this.zodiac.radius.inner + 0.5;
        },
        betweenOuterInner: () => {
          return this.zodiac.radius.outer - ((this.zodiac.radius.outer - this.zodiac.radius.inner) / 2);
        }
      },
      signs: [{
        number: 1,
        name: "Aries",
        symbol: "♈",
        element: "fire",
        fillColor: () => this.elements.fire.fillColor
      }, {
        number: 2,
        name: "Taurus",
        symbol: "♉",
        element: "Earth",
        fillColor: () => this.elements.earth.fillColor
      }, {
        number: 3,
        name: "Gemini",
        symbol: "♊",
        element: "wind",
        fillColor: () => this.elements.wind.fillColor
      }, {
        number: 4,
        name: "Cancer",
        symbol: "♋",
        element: "water",
        fillColor: () => this.elements.water.fillColor
      }, {
        number: 5,
        name: "Leo",
        symbol: "♌",
        element: "fire",
        fillColor: () => this.elements.fire.fillColor
      }, {
        number: 6,
        name: "Virgo",
        symbol: "♍",
        element: "earth",
        fillColor: () => this.elements.earth.fillColor
      }, {
        number: 7,
        name: "Libra",
        symbol: "♎",
        element: "wind",
        fillColor: () => this.elements.wind.fillColor
      }, {
        number: 8,
        name: "Scorpio",
        symbol: "♏",
        element: "water",
        fillColor: () => this.elements.water.fillColor
      }, {
        number: 9,
        name: "Sagittarius",
        symbol: "♐",
        element: "fire",
        fillColor: () => this.elements.fire.fillColor
      }, {
        number: 10,
        name: "Capricorn",
        symbol: "♑",
        element: "earth",
        fillColor: () => this.elements.earth.fillColor
      }, {
        number: 11,
        name: "Aquarius",
        symbol: "♒",
        element: "wind",
        fillColor: () => this.elements.wind.fillColor
      }, {
        number: 12,
        name: "Pisces",
        symbol: "♓",
        element: "water",
        fillColor: () => this.elements.water.fillColor
      }]
    }

    this.elements = {
      fire: {
        fillColor: "rgba(175, 0, 0, 0.8)"
      },
      wind: {
        fillColor: "rgba(222, 207, 0, 0.82)"
      },
      earth: {
        fillColor: "rgba(125, 168, 0, 0.65)"
      },
      water: {
        fillColor: "rgba(0, 43, 153, 0.8)"
      }
    }

    this.planets = [{
      number: 1,
      name: "Mars",
      symbol: "♂"
    }, {
      number: 5,
      name: "Sun",
      symbol: "☉"
    }
    ]
  };

  /**
   * http://www.onlinemathe.de/forum/Kreis-Punkte-auf-der-Linie-Berechnen
   * https://upload.wikimedia.org/wikipedia/commons/8/82/Sinus_en_cosinus.png
   **/
  getPointOnCircle(radius, degree, offsetFromRadius) {
    if (typeof radius === 'undefined' || typeof degree === 'undefined') {
      throw new Error("Degree and radius parameters required!");
    }

    const xCenterPoint = 0;
    const yCenterPoint = 0;
    const degreeNormalized = degree * (Math.PI / 180);
    const xNormalized = Math.cos(degreeNormalized);
    const yNormalized = Math.sin(degreeNormalized);

    let x = null;
    let y = null;

    if (offsetFromRadius) {
      x = xCenterPoint + (radius - offsetFromRadius) * xNormalized;
      y = yCenterPoint + (radius - offsetFromRadius) * yNormalized;
    } else {
      x = xCenterPoint + radius * xNormalized;
      y = yCenterPoint + radius * yNormalized;
    }

    return {x, y};
  }

  describeArc(radius, startDegree, endDegree) {

    let start = this.getPointOnCircle(radius, endDegree);
    let end = this.getPointOnCircle(radius, startDegree);
    let largeArcFlag = endDegree - startDegree <= 180 ? "0" : "1";

    let d = [
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
  }

  calculateOppositeDegree(degree) {
    return degree - 180;
  }

// -----------------------------------------------------------------
// Draw
// -----------------------------------------------------------------

  drawZodiacCircles() {
    let circles = {
      outer: this.s.circle(0, 0, this.zodiac.radius.outer),
      inner: this.s.circle(0, 0, this.zodiac.radius.inner),
      innerAuxiliary: this.s.circle(0, 0, this.zodiac.radius.innerAuxiliary())
    }

    circles.outer.attr({
      fill: "rgba(250, 250, 250, 0.15)",
      stroke: this.zodiac.stroke,
      strokeWidth: 0.2
    });
    circles.inner.attr({
      fill: "rgba(255, 255, 255, 0)",
      stroke: this.zodiac.stroke,
      strokeWidth: 0.2
    });
    circles.innerAuxiliary.attr({
      fill: "rgba(255, 255, 255, 0)",
      stroke: this.zodiac.stroke,
      strokeWidth: 0.1
    });

    return circles;
  }

  drawZodiacDegrees() {
    let degrees = [];

    for (let degree = 0; degree <= 360; degree++) {
      const radius = this.zodiac.radius.innerAuxiliary();
      const xLineLength = -1;
      const yLineLength = -1;
      const offsetFromRadius = 1;

      const point1 = this.getPointOnCircle(radius, degree);
      const point2 = this.getPointOnCircle(radius, degree, offsetFromRadius);

      const zodiacDegree = this.s.line(point1.x, point1.y, point2.x, point2.y);
      zodiacDegree.attr({
        index: degree,
        stroke: this.zodiac.stroke,
        strokeWidth: 0.1
      });

      degrees.push(zodiacDegree);
    }

    return degrees;
  }

  drawZodiacSigns() {
    let signs = [];

    for (let sign = 0; sign <= 11; sign++) {
      let degree = sign * -30;
      let degreeBetweenSigns = degree - 15;
      let degreeNextSign = degree - 30;

      const topLeftPoint = this.getPointOnCircle(-this.zodiac.radius.outer, degree);
      const topRightPoint = this.getPointOnCircle(-this.zodiac.radius.innerAuxiliary(), degree);
      const rightArcDescription = this.describeArc(-this.zodiac.radius.innerAuxiliary(), degreeNextSign, degree);
      const bottomLeftPoint = this.getPointOnCircle(-this.zodiac.radius.outer, degreeNextSign);
      const leftArcDescription = this.describeArc(-this.zodiac.radius.outer, degreeNextSign, degree);

      const zodiacSignBackground = this.s.path([
        "M", topLeftPoint.x, topLeftPoint.y,
        "L", topRightPoint.x, topRightPoint.y,
        rightArcDescription,
        "L", bottomLeftPoint.x, bottomLeftPoint.y,
        "M", topLeftPoint.x, topLeftPoint.y,
        leftArcDescription,
        "M", topLeftPoint.x, topLeftPoint.y,
        "Z"
      ].join(" "));

      zodiacSignBackground.attr({
        fill: this.zodiac.signs[sign].fillColor(),
        stroke: this.zodiac.stroke,
        strokeWidth: 0.1
      });

      const signSymbol = this.getPointOnCircle(-this.zodiac.radius.betweenOuterInner(), degreeBetweenSigns)
      const zodiacSignSymbol = this.s.text(signSymbol.x, signSymbol.y, this.zodiac.signs[sign].symbol);
      zodiacSignSymbol.attr({
        style: "font-family: Palatino; font-size: 0.15em;",
        textAnchor: "middle"
      });

      signs.push({
        symbol: zodiacSignSymbol,
        background: zodiacSignBackground
      });
    }

    return signs;
  }

  drawHousesAxis() {
    let axis = [];

    // 1 + 7
    const ascendentDegree = 0;
    const ascendentPoint = this.getPointOnCircle(-this.zodiac.radius.outer, ascendentDegree, 2);
    const descendentPoint = this.getPointOnCircle(-this.zodiac.radius.outer, this.calculateOppositeDegree(ascendentDegree), 2);
    const ascendentDesendentAxis = this.s.line(ascendentPoint.x, ascendentPoint.y, descendentPoint.x, descendentPoint.y);
    ascendentDesendentAxis.attr({
      stroke: this.zodiac.stroke,
      strokeWidth: 0.5
    });
    axis.push(ascendentDesendentAxis);

// 2 + 8
    const house2Degree = -35;
    const house2Point = this.getPointOnCircle(-this.zodiac.radius.outer, house2Degree, 2);
    const house8Point = this.getPointOnCircle(-this.zodiac.radius.outer, this.calculateOppositeDegree(house2Degree), 2);
    const house2house8Axis = this.s.line(house2Point.x, house2Point.y, house8Point.x, house8Point.y);
    house2house8Axis.attr({
      stroke: this.zodiac.stroke,
      strokeWidth: 0.2
    });
    axis.push(house2house8Axis);

// 3 + 9
    const house3Degree = -55;
    const house3Point = this.getPointOnCircle(-this.zodiac.radius.outer, house3Degree, 2);
    const house9Point = this.getPointOnCircle(-this.zodiac.radius.outer, this.calculateOppositeDegree(house3Degree), 2);
    const house3house9Axis = this.s.line(house3Point.x, house3Point.y, house9Point.x, house9Point.y);
    house3house9Axis.attr({
      stroke: this.zodiac.stroke,
      strokeWidth: 0.2
    });
    axis.push(house3house9Axis);

// 4 + 10
    const mediumCoelliDegree = -80;
    const mediumCoelliPoint = this.getPointOnCircle(-this.zodiac.radius.outer, mediumCoelliDegree, 2);
    const immumCoelliPoint = this.getPointOnCircle(-this.zodiac.radius.outer, this.calculateOppositeDegree(mediumCoelliDegree), 2);
    const mediumImmumCoelliAxis = this.s.line(mediumCoelliPoint.x, mediumCoelliPoint.y, immumCoelliPoint.x, immumCoelliPoint.y);
    mediumImmumCoelliAxis.attr({
      stroke: this.zodiac.stroke,
      strokeWidth: 0.5
    });
    axis.push(mediumImmumCoelliAxis);

// 5 + 11
    const house5Degree = -110;
    const house5Point = this.getPointOnCircle(-this.zodiac.radius.outer, house5Degree, 2);
    const house11Point = this.getPointOnCircle(-this.zodiac.radius.outer, this.calculateOppositeDegree(house5Degree), 2);
    const house5house11Axis = this.s.line(house5Point.x, house5Point.y, house11Point.x, house11Point.y);
    house5house11Axis.attr({
      stroke: this.zodiac.stroke,
      strokeWidth: 0.2
    });
    axis.push(house5house11Axis);

// 6 + 12
    const house6Degree = -150;
    const house6Point = this.getPointOnCircle(-this.zodiac.radius.outer, house6Degree, 2);
    const house12Point = this.getPointOnCircle(-this.zodiac.radius.outer, this.calculateOppositeDegree(house6Degree), 2);
    const house6house12Axis = this.s.line(house6Point.x, house6Point.y, house12Point.x, house12Point.y);
    house6house12Axis.attr({
      stroke: this.zodiac.stroke,
      strokeWidth: 0.2
    });
    axis.push(house6house12Axis);

    return axis;
  }

  drawPlanet(planet, degree) {

    const point1 = this.getPointOnCircle(this.zodiac.radius.inner, degree);
    const point2 = this.getPointOnCircle(this.zodiac.radius.inner, degree, 1);
    const planetAuxiliaryLine = this.s.line(point1.x, point1.y, point2.x, point2.y);
    planetAuxiliaryLine.attr({
      stroke: this.zodiac.stroke,
      strokeWidth: 0.2
    });

    const textPoint = this.getPointOnCircle(this.zodiac.radius.inner, degree, 2);
    const planetSymbol = this.s.text(textPoint.x, textPoint.y, planet.symbol);
    planetSymbol.attr({
      style: "font-family: Palatino; font-size: 0.25em;",
      textAnchor: "middle"
    });

    // TODO http://stackoverflow.com/questions/28128491/svg-center-text-in-circle
    // TODO http://snapsvg.io/docs/#Paper.group
  }

  /**
   * Draws a horoscope.
   * @param selector
   * @return Returns the snap object.
   */
  draw(selector) {
    this.s = Snap(selector);
    this.s.attr({viewBox: "-50 -50 100 100"});

    let drawing = {}

    drawing['zodiac'] = {
      circles: this.drawZodiacCircles(),
      degrees: this.drawZodiacDegrees(),
      signs: this.drawZodiacSigns(),
      houses: {
        axis: this.drawHousesAxis()
      },
      planets: {
        mars: this.drawPlanet(this.planets.find((elem) => {
          return elem.name == "Mars";
        }), 40),
        sun: this.drawPlanet(this.planets.find((elem) => {
          return elem.name == "Sun";
        }), 190)
      }
    }

    return drawing;
  }
}