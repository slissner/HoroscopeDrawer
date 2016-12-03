export class Calc {
  /**
   * http://www.onlinemathe.de/forum/Kreis-Punkte-auf-der-Linie-Berechnen
   * https://upload.wikimedia.org/wikipedia/commons/8/82/Sinus_en_cosinus.png
   **/
  static getPointOnCircle(radius, degree, offsetFromRadius) {
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

  static calculateOppositeDegree(degree) {
    return degree - 180;
  }
}