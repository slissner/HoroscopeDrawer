import Snap from "snapsvg/dist/snap.svg-min";
import {Calc} from "./calc";
import {zodiac} from "./zodiac";
import {planets} from "./planets";

export class Drawer {
  draw(properties) {
    if (properties.hasOwnProperty('selector')) {
      this.selector = properties.selector;
    } else {
      throw new Error('Irregular selector');
    }

    this.PLANET_IMAGE_WIDTH = 4;
    this.PLANET_IMAGE_HEIGHT = 4;
    this.PLANET_RADIUS_OFFSET = 3;
    this.PLANET_COLLISION_MARGIN_IN_DEGREE = 4;
    this.PLANET_COLLISION_CORRECTION_RADIUS = 4;
    this.MAX_PLANET_COLLISION_CORRECTION = 4;

    this.planets = (properties.hasOwnProperty('planets')) ? properties.planets : null;
    this.houses = (properties.hasOwnProperty('houses')) ? properties.houses : null;

    this.snap = Snap(this.selector);
    this.snap.attr({viewBox: "-50 -50 100 100"});

    this.drawn = {
      circles: this.drawZodiacCircles(),
      degrees: this.drawZodiacDegrees(),
      zodiac: {
        signs: this.drawZodiacSigns(properties.zodiac.start.sign, properties.zodiac.start.degree),
        ascendant: {
          signIndex: properties.zodiac.start.sign,
          correctedByDegrees: properties.zodiac.start.degree,
        }
      },
      houses: {
        axes: this.drawHousesAxes(),
        meta: this.houses
      },
      planets: [
        this.drawSun(),
        this.drawMercury(),
        this.drawVenus(),
        this.drawMars(),
        this.drawMoon(),
        this.drawJupiter(),
        this.drawSaturn(),
        this.drawUranus(),
        this.drawNeptune(),
        this.drawPluto()
      ]
    };

    this.drawn.planets = this.correctCollidingPlanets(this.drawn.planets);

    return this.drawn;
  }

  describeArc(radius, startDegree, endDegree) {
    const end = Calc.getPointOnCircle(radius, startDegree);
    const largeArcFlag = endDegree - startDegree <= 180 ? "0" : "1";

    const d = [
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
  }

  drawZodiacCircles() {
    const circles = {
      outer: this.snap.circle(0, 0, zodiac.radius.outer),
      inner: this.snap.circle(0, 0, zodiac.radius.inner),
      innerAuxiliary: this.snap.circle(0, 0, zodiac.radius.innerAuxiliary)
    }
    
    circles.outer.addClass("zodiac-circle-outer");
    circles.inner.addClass("zodiac-circle-inner");
    circles.innerAuxiliary.addClass("zodiac-circle-inner-auxiliary");

    return circles;
  }

  drawZodiacDegrees() {
    const degrees = [];

    for (let degree = 0; degree < 360; degree++) {
      const radius = zodiac.radius.innerAuxiliary;
      const offsetFromRadius = 1;

      const point1 = Calc.getPointOnCircle(radius, degree);
      const point2 = Calc.getPointOnCircle(radius, degree, offsetFromRadius);

      const zodiacDegree = this.snap.line(point1.x, point1.y, point2.x, point2.y);
      zodiacDegree.attr({
        index: degree
      });
      zodiacDegree.addClass("zodiac-degree");
      zodiacDegree.addClass("zodiac-degree-" + degree);

      degrees.push({
        meta: {
          degree,
          point1,
          point2
        },
        zodiacDegree
      });
    }

    return degrees;
  }

  drawZodiacSigns(startSign, signDegree) {
    const zodiacSignImageWidth = 3;
    const zodiacSignImageHeight = 3;

    const signs = [];

    const ascendantDegreeCorrection = zodiac.validateSignDegree(signDegree);
    const startSignIndex = zodiac.getStartSignIndex(startSign);

    for (let sign = 0; sign <= 11; sign++) {
      let signIndex = null;
      const regularIndex = startSignIndex + sign;
      const isIndexOutOfBound = (regularIndex > 11);
      if (isIndexOutOfBound) {
        signIndex = regularIndex - 12;
      } else {
        signIndex = regularIndex;
      }
      const signObj = zodiac.signs[signIndex];

      const degree = sign * 30 - ascendantDegreeCorrection;
      const degreeBetweenSigns = degree + 15;
      const degreePreviousSign = degree - 30;
      const degreeNextSign = degree + 30;

      const topLeftPoint = Calc.getPointOnCircle(zodiac.radius.outer, degree);
      const topRightPoint = Calc.getPointOnCircle(zodiac.radius.innerAuxiliary, degree);
      const rightArcDescription = this.describeArc(zodiac.radius.innerAuxiliary, degreeNextSign, degree);
      const bottomLeftPoint = Calc.getPointOnCircle(zodiac.radius.outer, degreeNextSign);
      const leftArcDescription = this.describeArc(zodiac.radius.outer, degreeNextSign, degree);

      const zodiacSignBackground = this.snap.path([
        "M", topLeftPoint.x, topLeftPoint.y,
        "L", topRightPoint.x, topRightPoint.y,
        rightArcDescription,
        "L", bottomLeftPoint.x, bottomLeftPoint.y,
        "M", topLeftPoint.x, topLeftPoint.y,
        leftArcDescription,
        "M", topLeftPoint.x, topLeftPoint.y,
        "Z"
      ].join(" "));

      const signElementClass = "zodiac-sign-element-" + signObj.element;
      const signNameClass = "zodiac-sign-" + signObj.name.toLowerCase();
      zodiacSignBackground.addClass("zodiac-sign");
      zodiacSignBackground.addClass(signElementClass);
      zodiacSignBackground.addClass(signNameClass);

      const zodiacSignPosition = Calc.getPointOnCircle(zodiac.radius.betweenOuterInner, degreeBetweenSigns)
      const zodiacSignImagePositionX = zodiacSignPosition.x - zodiacSignImageWidth / 2;
      const zodiacSignImagePositionY = zodiacSignPosition.y - zodiacSignImageHeight / 2;
      const zodiacSignSymbol = this.snap.image(signObj.imageUrl, zodiacSignImagePositionX, zodiacSignImagePositionY, zodiacSignImageWidth, zodiacSignImageHeight);

      const meta = {};
      Object.assign(meta, signObj);
      meta['degree'] = {
        self: degree,
        nextSign: degreeNextSign,
        previousSign: degreePreviousSign
      };
      meta['position'] = zodiacSignPosition;

      signs.push({
        meta,
        symbol: zodiacSignSymbol,
        background: zodiacSignBackground
      });
    }
    return signs;
  }

  drawHousesAxes() {
    const axis = [];

    const ascendantDescendantAxis = this.drawAscendantDescendantAxis();
    axis.push(ascendantDescendantAxis);

    const house2house8Axis = this.drawHouse2House8Axis();
    axis.push(house2house8Axis);

    const house3house9Axis = this.drawHouse3House9Axis();
    axis.push(house3house9Axis);

    const immumMediumCoelliAxis = this.drawImmumMediumCoelliAxis();
    axis.push(immumMediumCoelliAxis);

    const house5house11Axis = this.drawHouse5House11Axis();
    axis.push(house5house11Axis);

    const house6house12Axis = this.drawHouse6House12Axis();
    axis.push(house6house12Axis);

    return axis;
  }

  drawAscendantDescendantAxis() {
    const ascendantDegree = (this.houses.hasOwnProperty('house1') && this.houses.house1.hasOwnProperty('degree')) ? this.houses.house1.degree : null;
    const ascendantPoint = Calc.getPointOnCircle(zodiac.radius.outer, ascendantDegree, -2);
    const descendantPoint = Calc.getPointOnCircle(zodiac.radius.outer, Calc.getOppositeDegree(ascendantDegree), -2);
    const ascendantDescendantAxis = this.snap.line(ascendantPoint.x, ascendantPoint.y, descendantPoint.x, descendantPoint.y);
    ascendantDescendantAxis.addClass("house-axis");
    ascendantDescendantAxis.addClass("house-axis-ascendant-descendant");
    return ascendantDescendantAxis;
  }

  drawHouse2House8Axis() {
    const house2Degree = (this.houses.hasOwnProperty('house2') && this.houses.house2.hasOwnProperty('degree')) ? this.houses.house2.degree : null;
    const house2Point = Calc.getPointOnCircle(zodiac.radius.outer, house2Degree, -2);
    const house8Point = Calc.getPointOnCircle(zodiac.radius.outer, Calc.getOppositeDegree(house2Degree), -2);
    const house2house8Axis = this.snap.line(house2Point.x, house2Point.y, house8Point.x, house8Point.y);
    house2house8Axis.addClass("house-axis");
    house2house8Axis.addClass("house-axis-2-8");
    return house2house8Axis;
  }

  drawHouse3House9Axis() {
    const house3Degree = (this.houses.hasOwnProperty('house3') && this.houses.house3.hasOwnProperty('degree')) ? this.houses.house3.degree : null;
    const house3Point = Calc.getPointOnCircle(zodiac.radius.outer, house3Degree, -2);
    const house9Point = Calc.getPointOnCircle(zodiac.radius.outer, Calc.getOppositeDegree(house3Degree), -2);
    const house3house9Axis = this.snap.line(house3Point.x, house3Point.y, house9Point.x, house9Point.y);
    house3house9Axis.addClass("house-axis");
    house3house9Axis.addClass("house-axis-3-9");
    return house3house9Axis;
  }

  drawImmumMediumCoelliAxis() {
    const immumCoelliDegree = (this.houses.hasOwnProperty('house4') && this.houses.house4.hasOwnProperty('degree')) ? this.houses.house4.degree : null;
    const immumCoelliPoint = Calc.getPointOnCircle(zodiac.radius.outer, immumCoelliDegree, -2);
    const mediumCoelliPoint = Calc.getPointOnCircle(zodiac.radius.outer, Calc.getOppositeDegree(immumCoelliDegree), -2);
    const immumMediumCoelliAxis = this.snap.line(immumCoelliPoint.x, immumCoelliPoint.y, mediumCoelliPoint.x, mediumCoelliPoint.y);
    immumMediumCoelliAxis.addClass("house-axis");
    immumMediumCoelliAxis.addClass("house-axis-immum-medium");
    return immumMediumCoelliAxis;
  }

  drawHouse5House11Axis() {
    const house5Degree = (this.houses.hasOwnProperty('house5') && this.houses.house5.hasOwnProperty('degree')) ? this.houses.house5.degree : null;
    const house5Point = Calc.getPointOnCircle(zodiac.radius.outer, house5Degree, -2);
    const house11Point = Calc.getPointOnCircle(zodiac.radius.outer, Calc.getOppositeDegree(house5Degree), -2);
    const house5house11Axis = this.snap.line(house5Point.x, house5Point.y, house11Point.x, house11Point.y);
    house5house11Axis.addClass("house-axis");
    house5house11Axis.addClass("house-axis-5-11");
    return house5house11Axis;
  }

  drawHouse6House12Axis() {
    const house6Degree = (this.houses.hasOwnProperty('house6') && this.houses.house6.hasOwnProperty('degree')) ? this.houses.house6.degree : null;
    const house6Point = Calc.getPointOnCircle(zodiac.radius.outer, house6Degree, -2);
    const house12Point = Calc.getPointOnCircle(zodiac.radius.outer, Calc.getOppositeDegree(house6Degree), -2);
    const house6house12Axis = this.snap.line(house6Point.x, house6Point.y, house12Point.x, house12Point.y);
    house6house12Axis.addClass("house-axis");
    house6house12Axis.addClass("house-axis-6-12");
    return house6house12Axis;
  }

  drawPlanet(planet, degree) {
    const linePoint1 = Calc.getPointOnCircle(zodiac.radius.inner, degree);
    const linePoint2 = Calc.getPointOnCircle(zodiac.radius.inner, degree, 1);
    const planetAuxiliaryLine = this.snap.line(linePoint1.x, linePoint1.y, linePoint2.x, linePoint2.y);
    planetAuxiliaryLine.addClass("planet-auxiliary-line")

    const planetBackgroundPosition = Calc.getPointOnCircle(zodiac.radius.inner, degree, this.PLANET_RADIUS_OFFSET);
    const planetBackgroundRadius = this.getPlanetBackgroundRadius();
    const planetBackground = this.snap.circle(planetBackgroundPosition.x, planetBackgroundPosition.y, planetBackgroundRadius);
    planetBackground.addClass("planet-background");

    const planetSymbolPosition = this.getPlanetSymbolPosition(planetBackgroundPosition);
    const planetSymbol = this.snap.image(planet.imageUrl, planetSymbolPosition.x, planetSymbolPosition.y, this.PLANET_IMAGE_WIDTH, this.PLANET_IMAGE_HEIGHT);

    const meta = {};
    Object.assign(meta, planet);
    meta['degree'] = degree;
    meta['position'] = planetBackgroundPosition;

    return {
      symbol: planetSymbol,
      background: planetBackground,
      meta
    };
  }

  getPlanetSymbolPosition(planetBackgroundPosition) {
    const x = planetBackgroundPosition.x - this.PLANET_IMAGE_WIDTH / 2;
    const y = planetBackgroundPosition.y - this.PLANET_IMAGE_HEIGHT / 2;
    return {
      x,
      y
    }
  }

  getPlanetBackgroundRadius() {
    if (this.PLANET_IMAGE_WIDTH > this.PLANET_IMAGE_HEIGHT) {
      return this.PLANET_IMAGE_WIDTH / 2;
    } else {
      return this.PLANET_IMAGE_HEIGHT / 2;
    }
  }

  drawSun() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Sun";
    }), this.planets.sun.degree);
  }

  drawMercury() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Mercury";
    }), this.planets.mercury.degree);
  }

  drawVenus() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Venus";
    }), this.planets.venus.degree);
  }

  drawMars() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Mars";
    }), this.planets.mars.degree);
  }

  drawMoon() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Moon";
    }), this.planets.moon.degree);
  }

  drawJupiter() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Jupiter";
    }), this.planets.jupiter.degree);
  }

  drawSaturn() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Saturn";
    }), this.planets.saturn.degree);
  }

  drawUranus() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Uranus";
    }), this.planets.uranus.degree);
  }

  drawNeptune() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Neptune";
    }), this.planets.neptune.degree);
  }

  drawPluto() {
    return this.drawPlanet(planets.find((elem) => {
      return elem.name == "Pluto";
    }), this.planets.pluto.degree);
  }

  correctCollidingPlanets(planets) {
    planets = planets.sort((a, b) => {
      return a.meta.degree > b.meta.degree;
    });

    let planetsCollideInRow = 0;
    return planets.map((planet, i) => {
      const nextPlanetIndex = i + 1;

      if (nextPlanetIndex in planets) {
        const nextPlanet = planets[nextPlanetIndex];
        if (this.planetsDoCollide(planet.meta.degree, nextPlanet.meta.degree)) {
          if (planetsCollideInRow == this.MAX_PLANET_COLLISION_CORRECTION) {
            planetsCollideInRow = 0;
          }
          planetsCollideInRow++;

          const correctedRadius = zodiac.radius.inner - (planetsCollideInRow * this.PLANET_COLLISION_CORRECTION_RADIUS);
          if (correctedRadius <= 0) {
            console.warn("Cannot draw colliding planets when the correction radius is below 0.");
          }

          const correctedBackgroundPosition = Calc.getPointOnCircle(correctedRadius, nextPlanet.meta.degree, this.PLANET_RADIUS_OFFSET);
          const correctedBackgroundPositionForCircle = {
            cx: correctedBackgroundPosition.x,
            cy: correctedBackgroundPosition.y,
          }
          nextPlanet.background.attr(correctedBackgroundPositionForCircle);

          const correctedPlanetSymbolPosition = this.getPlanetSymbolPosition(correctedBackgroundPosition);
          nextPlanet.symbol.attr(correctedPlanetSymbolPosition);


          planets[nextPlanetIndex].symbol = nextPlanet.symbol;
          planets[nextPlanetIndex].background = nextPlanet.background;
        } else {
          planetsCollideInRow = 0;
        }
      }

      return planet;
    });
  }

  planetsDoCollide(currentPlanetDegree, nextPlanetDegree) {
    let lowerBound = currentPlanetDegree - this.PLANET_COLLISION_MARGIN_IN_DEGREE;
    let upperBound = currentPlanetDegree + this.PLANET_COLLISION_MARGIN_IN_DEGREE;

    if (upperBound > 360) {
      upperBound = upperBound - 360;
    } else if (lowerBound < 0) {
      lowerBound = lowerBound + 360;
    }

    return (lowerBound <= nextPlanetDegree && nextPlanetDegree <= upperBound);
  }
}
export let drawer = new Drawer();