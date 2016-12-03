import {s} from "../../node_modules/snapsvg/dist/snap.svg-min";

const radiusZodiacCircleOuter = 50;
const radiusZodiacCircleInner = 44;
const radiusZodiacCircleInnerAuxiliary = radiusZodiacCircleInner + 0.5;
const radiusZodiacBetweenOuterInner = radiusZodiacCircleOuter - ((radiusZodiacCircleOuter - radiusZodiacCircleInner) / 2);

const colorCircleStroke = "rgb(40, 40, 40)";

const zodiacSignFire = {
  fillColor: "rgba(175, 0, 0, 0.8)"
}
const zodiacSignWind = {
  fillColor: "rgba(222, 207, 0, 0.82)"
}
const zodiacSignEarth = {
  fillColor: "rgba(125, 168, 0, 0.65)"
}
const zodiacSignWater = {
  fillColor: "rgba(0, 43, 153, 0.8)"
}

// Zodiac signs
const zodiacSigns = [{
  number: 1,
  name: "Aries",
  symbol: "♈",
  element: "fire",
  fillColor: zodiacSignFire.fillColor
},{
  number: 2,
  name: "Taurus",
  symbol: "♉",
  element: "Earth",
  fillColor: zodiacSignEarth.fillColor
},{
  number: 3,
  name: "Gemini",
  symbol: "♊",
  element: "wind",
  fillColor: zodiacSignWind.fillColor
},{
  number: 4,
  name: "Cancer",
  symbol: "♋",
  element: "water",
  fillColor: zodiacSignWater.fillColor
},{
  number: 5,
  name: "Leo",
  symbol: "♌",
  element: "fire",
  fillColor: zodiacSignFire.fillColor
},{
  number: 6,
  name: "Virgo",
  symbol: "♍",
  element: "earth",
  fillColor: zodiacSignEarth.fillColor
},{
  number: 7,
  name: "Libra",
  symbol: "♎",
  element: "wind",
  fillColor: zodiacSignWind.fillColor
},{
  number: 8,
  name: "Scorpio",
  symbol: "♏",
  element: "water",
  fillColor: zodiacSignWater.fillColor
},{
  number: 9,
  name: "Sagittarius",
  symbol: "♐",
  element: "fire",
  fillColor: zodiacSignFire.fillColor
},{
  number: 10,
  name: "Capricorn",
  symbol: "♑",
  element: "earth",
  fillColor: zodiacSignEarth.fillColor
},{
  number: 11,
  name: "Aquarius",
  symbol: "♒",
  element: "wind",
  fillColor: zodiacSignWind.fillColor
},{
  number: 12,
  name: "Pisces",
  symbol: "♓",
  element: "water",
  fillColor: zodiacSignWater.fillColor
}];

const planets = [];
planets['mars'] = {
  number: 1,
  name: "Mars",
  symbol: "♂"
}
planets['sun'] = {
  number: 5,
  name: "Sun",
  symbol: "☉"
}

/**
* http://www.onlinemathe.de/forum/Kreis-Punkte-auf-der-Linie-Berechnen
* https://upload.wikimedia.org/wikipedia/commons/8/82/Sinus_en_cosinus.png
**/
function getPointOnCircle(radius, degree, offsetFromRadius) {
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

function describeArc(radius, startDegree, endDegree){

    let start = getPointOnCircle(radius, endDegree);
    let end = getPointOnCircle(radius, startDegree);
    let largeArcFlag = endDegree - startDegree <= 180 ? "0" : "1";

    let d = [
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;
}

function calculateOppositeDegree(degree) {
  return degree - 180;
}

const s = Snap("#horoscope");
s.attr({ viewBox: "-50 -50 100 100" });

const zodiacBoundOuter = s.circle(0, 0, radiusZodiacCircleOuter);
zodiacBoundOuter.attr({
    fill: "rgba(250, 250, 250, 0.15)",
    stroke: colorCircleStroke,
    strokeWidth: 0.2
});

const zodiacBoundInner = s.circle(0, 0, radiusZodiacCircleInner);
zodiacBoundInner.attr({
    fill: "rgba(255, 255, 255, 0)",
    stroke: colorCircleStroke,
    strokeWidth: 0.2
});

const zodiacBoundInnerAuxiliary = s.circle(0, 0, radiusZodiacCircleInnerAuxiliary);
zodiacBoundInnerAuxiliary.attr({
    fill: "rgba(255, 255, 255, 0)",
    stroke: colorCircleStroke,
    strokeWidth: 0.1
});

// Degree strokes
for (let degree = 0; degree <= 360; degree++) {
  const radius = 44.5;
  const xLineLength = -1;
  const yLineLength = -1;
  const offsetFromRadius = 1;

  const point1 = getPointOnCircle(radius, degree);
  const point2 = getPointOnCircle(radius, degree, offsetFromRadius);

  const zodiacDegree = s.line(point1.x, point1.y, point2.x, point2.y);
  zodiacDegree.attr({
    stroke: colorCircleStroke,
    strokeWidth: 0.1
  });
}

// zodiac signs
for (let sign = 0; sign <= 11; sign++) {
  let degree = sign * -30;
  let degreeBetweenSigns = degree - 15;
  let degreeNextSign = degree - 30;

  const topLeftPoint = getPointOnCircle(-radiusZodiacCircleOuter, degree);
  const topRightPoint = getPointOnCircle(-radiusZodiacCircleInnerAuxiliary, degree);
  const rightArcDescription = describeArc(-radiusZodiacCircleInnerAuxiliary, degreeNextSign, degree);
  const bottomRightPoint = getPointOnCircle(-radiusZodiacCircleInnerAuxiliary, degreeNextSign);
  const bottomLeftPoint = getPointOnCircle(-radiusZodiacCircleOuter, degreeNextSign);
  const leftArcDescription = describeArc(-radiusZodiacCircleOuter, degreeNextSign, degree);
  const signSymbol = getPointOnCircle(-radiusZodiacBetweenOuterInner, degreeBetweenSigns)

  const zodiacSignAries = s.path([
    "M", topLeftPoint.x, topLeftPoint.y,
    "L", topRightPoint.x, topRightPoint.y,
    rightArcDescription,
    "L", bottomLeftPoint.x, bottomLeftPoint.y,
    "M", topLeftPoint.x, topLeftPoint.y,
    leftArcDescription,
    "M", topLeftPoint.x, topLeftPoint.y,
    "Z"
  ].join(" "));

  zodiacSignAries.attr({
      fill: zodiacSigns[sign].fillColor,
      stroke: colorCircleStroke,
      strokeWidth: 0.1
  });
  const zodiacSignAriesSymbol = s.text(signSymbol.x, signSymbol.y, zodiacSigns[sign].symbol);
  zodiacSignAriesSymbol.attr({
    style: "font-family: Palatino; font-size: 0.15em;",
    textAnchor: "middle"
  });
}

// houses

// 1 + 7
const ascendentDegree = 0;
const ascendentPoint = getPointOnCircle(-radiusZodiacCircleOuter, ascendentDegree, 2);
const descendentPoint = getPointOnCircle(-radiusZodiacCircleOuter, calculateOppositeDegree(ascendentDegree), 2);
const ascendentDesendentAxis = s.line(ascendentPoint.x, ascendentPoint.y, descendentPoint.x, descendentPoint.y);
ascendentDesendentAxis.attr({
    stroke: colorCircleStroke,
    strokeWidth: 0.5
});

// 2 + 8
const house2Degree = -35;
const house2Point = getPointOnCircle(-radiusZodiacCircleOuter, house2Degree, 2);
const house8Point = getPointOnCircle(-radiusZodiacCircleOuter, calculateOppositeDegree(house2Degree), 2);
const house2house8Axis = s.line(house2Point.x, house2Point.y, house8Point.x, house8Point.y);
house2house8Axis.attr({
    stroke: colorCircleStroke,
    strokeWidth: 0.2
});

// 3 + 9
const house3Degree = -55;
const house3Point = getPointOnCircle(-radiusZodiacCircleOuter, house3Degree, 2);
const house9Point = getPointOnCircle(-radiusZodiacCircleOuter, calculateOppositeDegree(house3Degree), 2);
const house3house9Axis = s.line(house3Point.x, house3Point.y, house9Point.x, house9Point.y);
house3house9Axis.attr({
    stroke: colorCircleStroke,
    strokeWidth: 0.2
});

// 4 + 10
const mediumCoelliDegree = -80;
const mediumCoelliPoint = getPointOnCircle(-radiusZodiacCircleOuter, mediumCoelliDegree, 2);
const immumCoelliPoint = getPointOnCircle(-radiusZodiacCircleOuter, calculateOppositeDegree(mediumCoelliDegree), 2);
const mediumImmumCoelliAxis = s.line(mediumCoelliPoint.x, mediumCoelliPoint.y, immumCoelliPoint.x, immumCoelliPoint.y);
mediumImmumCoelliAxis.attr({
    stroke: colorCircleStroke,
    strokeWidth: 0.5
});

// 5 + 11
const house5Degree = -110;
const house5Point = getPointOnCircle(-radiusZodiacCircleOuter, house5Degree, 2);
const house11Point = getPointOnCircle(-radiusZodiacCircleOuter, calculateOppositeDegree(house5Degree), 2);
const house5house11Axis = s.line(house5Point.x, house5Point.y, house11Point.x, house11Point.y);
house5house11Axis.attr({
    stroke: colorCircleStroke,
    strokeWidth: 0.2
});

// 6 + 12
const house6Degree = -150;
const house6Point = getPointOnCircle(-radiusZodiacCircleOuter, house6Degree, 2);
const house12Point = getPointOnCircle(-radiusZodiacCircleOuter, calculateOppositeDegree(house6Degree), 2);
const house6house12Axis = s.line(house6Point.x, house6Point.y, house12Point.x, house12Point.y);
house6house12Axis.attr({
    stroke: colorCircleStroke,
    strokeWidth: 0.2
});

// Planets
function drawPlanet(planet, degree) {

  const point1 = getPointOnCircle(radiusZodiacCircleInner, degree);
  const point2 = getPointOnCircle(radiusZodiacCircleInner, degree, 1);
  const planetAuxiliaryLine = s.line(point1.x, point1.y, point2.x, point2.y);
  planetAuxiliaryLine.attr({
    stroke: colorCircleStroke,
    strokeWidth: 0.2
  });

  const textPoint = getPointOnCircle(radiusZodiacCircleInner, degree, 2);
  const planetSymbol = s.text(textPoint.x, textPoint.y, planet.symbol);
  planetSymbol.attr({
    style: "font-family: Palatino; font-size: 0.25em;",
    textAnchor: "middle"
  });

  // TODO http://stackoverflow.com/questions/28128491/svg-center-text-in-circle
  // TODO http://snapsvg.io/docs/#Paper.group
}

drawPlanet(planets['mars'], 40);
drawPlanet(planets['sun'], 190);
