export class Calc {

  /**
   * Calculates a point on a zodiac circle.
   * http://www.onlinemathe.de/forum/Kreis-Punkte-auf-der-Linie-Berechnen
   * https://upload.wikimedia.org/wikipedia/commons/8/82/Sinus_en_cosinus.png
   *
   * @param radius The radius of the circle.
   * @param degree of the poit on the circle.
   * @param offsetFromRadius
   * @param traditionalDirection Calculate point starting (degree = 0) from ascendent and moving counter-clockwise. Defaults to true.
   * If set to false, the calculation starts from descendent and moves counter-clockwise.
   * @returns {{x: *, y: *}}
  */
  static getPointOnCircle(radius, degree, offsetFromRadius, traditionalDirection = true) {
    if (typeof radius === 'undefined' || typeof degree === 'undefined') {
      throw new Error("Degree and radius parameters required!");
    }

    const xCenterPoint = 0;
    const yCenterPoint = 0;
    const degreeNormalized = degree * (Math.PI / 180.0);

    // fizes JS bug of Math.sin(Math.PI) not being 0. See http://stackoverflow.com/q/6223616/3757139
    let xNormalized = null;
    if (this.isEachDegree(90, degree) && !this.isEachDegree(180, degree)) {
      xNormalized = 0;
    } else if (this.isEachDegree(180, degree)) {
      xNormalized = -1;
    } else {
      xNormalized = Math.cos(degreeNormalized);
    }

    let yNormalized = null;
    if (this.isEachDegree(90, degree) && !this.isEachDegree(180, degree) && !this.isEachDegree(270, degree)) {
      yNormalized = 1;
    } else if (this.isEachDegree(180, degree)) {
      yNormalized = 0;
    } else if (this.isEachDegree(270, degree)) {
      yNormalized = -1;
    } else {
      yNormalized = Math.sin(degreeNormalized);
    }

    let x = null;
    let y = null;

    if (offsetFromRadius) {
      x = xCenterPoint + (radius - offsetFromRadius) * xNormalized;
      y = yCenterPoint + (radius - offsetFromRadius) * yNormalized;
    } else {
      x = xCenterPoint + radius * xNormalized;
      y = yCenterPoint + radius * yNormalized;
    }

    if (traditionalDirection) {
      x = -x;
      y = -y;
    }

    if (typeof offsetFromRadius === "undefined") {
      console.group("Degree", degree);
      console.log("degreeNormalized", degreeNormalized);
      console.log("xNormalized", xNormalized);
      console.log("yNormalized", yNormalized);
      console.log("x", x);
      console.log("y", y);
      console.groupEnd();
    }

    return {x, y};
  }

  static getOppositeDegree(degree) {
    if (degree < 180) {
      return degree + 180;
    } else {
      return degree - 180;
    }
  }

  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  static isEachDegree(interval, degree) {
    return degree % interval == 0 && degree > 0;
  }
}