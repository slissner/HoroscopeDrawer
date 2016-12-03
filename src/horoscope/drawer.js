import Snap from "../../node_modules/snapsvg/dist/snap.svg-min";
import {Calc} from "./calc";
import {zodiac} from "./zodiac";
import {planets} from "./planets";

export class Drawer {
  draw(selector, planetsDegrees) {
    this.s = Snap(selector);
    this.s.attr({viewBox: "-50 -50 100 100"});

    return {
      circles: this.drawZodiacCircles(),
      degrees: this.drawZodiacDegrees(),
      signs: this.drawZodiacSigns(),
      houses: {
        axis: this.drawHousesAxis()
      },
      planets: {
        sun: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Sun";
        }), planetsDegrees.sun),
        mercury: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Mercury";
        }), planetsDegrees.mercury),
        venus: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Venus";
        }), planetsDegrees.venus),
        mars: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Mars";
        }), planetsDegrees.mars),
        moon: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Moon";
        }), planetsDegrees.moon),
        jupiter: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Jupiter";
        }), planetsDegrees.jupiter),
        saturn: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Saturn";
        }), planetsDegrees.saturn),
        uranus: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Uranus";
        }), planetsDegrees.uranus),
        neptune: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Neptune";
        }), planetsDegrees.neptune),
        pluto: this.drawPlanet(planets.find((elem) => {
          return elem.name == "Pluto";
        }), planetsDegrees.pluto)
      }
    };
  }

  describeArc(radius, startDegree, endDegree) {

    let start = Calc.getPointOnCircle(radius, endDegree);
    let end = Calc.getPointOnCircle(radius, startDegree);
    let largeArcFlag = endDegree - startDegree <= 180 ? "0" : "1";

    let d = [
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
  }

  drawZodiacCircles() {
    let circles = {
      outer: this.s.circle(0, 0, zodiac.radius.outer),
      inner: this.s.circle(0, 0, zodiac.radius.inner),
      innerAuxiliary: this.s.circle(0, 0, zodiac.radius.innerAuxiliary)
    }

    circles.outer.attr({
      fill: "rgba(250, 250, 250, 0.15)",
      stroke: zodiac.stroke,
      strokeWidth: 0.2
    });
    circles.inner.attr({
      fill: "rgba(255, 255, 255, 0)",
      stroke: zodiac.stroke,
      strokeWidth: 0.2
    });
    circles.innerAuxiliary.attr({
      fill: "rgba(255, 255, 255, 0)",
      stroke: zodiac.stroke,
      strokeWidth: 0.1
    });

    return circles;
  }

  drawZodiacDegrees() {
    let degrees = [];

    for (let degree = 0; degree <= 360; degree++) {
      const radius = zodiac.radius.innerAuxiliary;
      const xLineLength = -1;
      const yLineLength = -1;
      const offsetFromRadius = 1;

      const point1 = Calc.getPointOnCircle(radius, degree);
      const point2 = Calc.getPointOnCircle(radius, degree, offsetFromRadius);

      const zodiacDegree = this.s.line(point1.x, point1.y, point2.x, point2.y);
      zodiacDegree.attr({
        index: degree,
        stroke: zodiac.stroke,
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

      const topLeftPoint = Calc.getPointOnCircle(-zodiac.radius.outer, degree);
      const topRightPoint = Calc.getPointOnCircle(-zodiac.radius.innerAuxiliary, degree);
      const rightArcDescription = this.describeArc(-zodiac.radius.innerAuxiliary, degreeNextSign, degree);
      const bottomLeftPoint = Calc.getPointOnCircle(-zodiac.radius.outer, degreeNextSign);
      const leftArcDescription = this.describeArc(-zodiac.radius.outer, degreeNextSign, degree);

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
        fill: zodiac.signs[sign].fillColor(),
        stroke: zodiac.stroke,
        strokeWidth: 0.1
      });

      const signSymbol = Calc.getPointOnCircle(-zodiac.radius.betweenOuterInner, degreeBetweenSigns)
      const zodiacSignSymbol = this.s.text(signSymbol.x, signSymbol.y, zodiac.signs[sign].symbol);
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
    const ascendentPoint = Calc.getPointOnCircle(-zodiac.radius.outer, ascendentDegree, 2);
    const descendentPoint = Calc.getPointOnCircle(-zodiac.radius.outer, Calc.calculateOppositeDegree(ascendentDegree), 2);
    const ascendentDesendentAxis = this.s.line(ascendentPoint.x, ascendentPoint.y, descendentPoint.x, descendentPoint.y);
    ascendentDesendentAxis.attr({
      stroke: zodiac.stroke,
      strokeWidth: 0.5
    });
    axis.push(ascendentDesendentAxis);

// 2 + 8
    const house2Degree = -35;
    const house2Point = Calc.getPointOnCircle(-zodiac.radius.outer, house2Degree, 2);
    const house8Point = Calc.getPointOnCircle(-zodiac.radius.outer, Calc.calculateOppositeDegree(house2Degree), 2);
    const house2house8Axis = this.s.line(house2Point.x, house2Point.y, house8Point.x, house8Point.y);
    house2house8Axis.attr({
      stroke: zodiac.stroke,
      strokeWidth: 0.2
    });
    axis.push(house2house8Axis);

// 3 + 9
    const house3Degree = -55;
    const house3Point = Calc.getPointOnCircle(-zodiac.radius.outer, house3Degree, 2);
    const house9Point = Calc.getPointOnCircle(-zodiac.radius.outer, Calc.calculateOppositeDegree(house3Degree), 2);
    const house3house9Axis = this.s.line(house3Point.x, house3Point.y, house9Point.x, house9Point.y);
    house3house9Axis.attr({
      stroke: zodiac.stroke,
      strokeWidth: 0.2
    });
    axis.push(house3house9Axis);

// 4 + 10
    const mediumCoelliDegree = -80;
    const mediumCoelliPoint = Calc.getPointOnCircle(-zodiac.radius.outer, mediumCoelliDegree, 2);
    const immumCoelliPoint = Calc.getPointOnCircle(-zodiac.radius.outer, Calc.calculateOppositeDegree(mediumCoelliDegree), 2);
    const mediumImmumCoelliAxis = this.s.line(mediumCoelliPoint.x, mediumCoelliPoint.y, immumCoelliPoint.x, immumCoelliPoint.y);
    mediumImmumCoelliAxis.attr({
      stroke: zodiac.stroke,
      strokeWidth: 0.5
    });
    axis.push(mediumImmumCoelliAxis);

// 5 + 11
    const house5Degree = -110;
    const house5Point = Calc.getPointOnCircle(-zodiac.radius.outer, house5Degree, 2);
    const house11Point = Calc.getPointOnCircle(-zodiac.radius.outer, Calc.calculateOppositeDegree(house5Degree), 2);
    const house5house11Axis = this.s.line(house5Point.x, house5Point.y, house11Point.x, house11Point.y);
    house5house11Axis.attr({
      stroke: zodiac.stroke,
      strokeWidth: 0.2
    });
    axis.push(house5house11Axis);

// 6 + 12
    const house6Degree = -150;
    const house6Point = Calc.getPointOnCircle(-zodiac.radius.outer, house6Degree, 2);
    const house12Point = Calc.getPointOnCircle(-zodiac.radius.outer, Calc.calculateOppositeDegree(house6Degree), 2);
    const house6house12Axis = this.s.line(house6Point.x, house6Point.y, house12Point.x, house12Point.y);
    house6house12Axis.attr({
      stroke: zodiac.stroke,
      strokeWidth: 0.2
    });
    axis.push(house6house12Axis);

    return axis;
  }

  drawPlanet(planet, degree) {

    const point1 = Calc.getPointOnCircle(zodiac.radius.inner, degree);
    const point2 = Calc.getPointOnCircle(zodiac.radius.inner, degree, 1);
    const planetAuxiliaryLine = this.s.line(point1.x, point1.y, point2.x, point2.y);
    planetAuxiliaryLine.attr({
      stroke: zodiac.stroke,
      strokeWidth: 0.2
    });

    const textPoint = Calc.getPointOnCircle(zodiac.radius.inner, degree, 2);
    const planetSymbol = this.s.text(textPoint.x, textPoint.y, planet.symbol);
    planetSymbol.attr({
      style: "font-family: Palatino; font-size: 0.25em;",
      textAnchor: "middle"
    });

    // TODO http://stackoverflow.com/questions/28128491/svg-center-text-in-circle
    // TODO http://snapsvg.io/docs/#Paper.group
  }
}
export let drawer = new Drawer();