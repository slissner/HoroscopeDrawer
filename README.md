# Horoscope Drawer

HoroscopeDrawer.js lets you draw zodiac charts in SVG-Format.

![Horoscope Chart](preview.png "Horoscope Chart")


## Getting Started (Example)

Draw a randomized horoscope:

```
const h = new zastro.Horoscope();
const drawn = h.draw("#horoscope");
console.log("Hurray! You have drawn your horoscope.", drawn);
```

Draw a horoscope with parameters:

```
const properties = {
  zodiac: {
    ascendant: {
      sign: 3,      // Sets ascendant by sign. See src/zodiac.js.
      degree: 15    // Sets degree offset for ascendant sign.
    }
  },
  planets: {        // Sets degree of planets.
    sun: 65,
    mercury: 12,
    venus: 151.31,
    mars: 231,
    moon: 188,
    jupiter: 311,
    saturn: 100,
    uranus: 199,
    neptune: 278,
    pluto: 31
  },
  houses: {
    hasHouses: true,
    axes: {
      axis2to8: 27,   // Sets degree of axis.
      axis3to9: 56,
      axis4to10: 81,
      axis5to11: 114,
      axis6to12: 156
    }
  }
};
const h = new zastro.Horoscope(properties);
const drawn = h.draw("#horoscope");
console.log("Hurray! You have drawn your horoscope.", drawn);
```

Target selector shall be a svg-container in parent-html file:

```
<svg id="horoscope"></svg>
```

You can customize horoscope styles like in `/example/horoscope.css`.

## Build

Build the example page with:

```
gulp example-build
```
_note: You may need to manually create an empty `/dist` folder before running the build command._

Outputs the source code files in the `/example` folder.

### Library

Build the library files with:

```
gulp build
```

Output will be placed in `/dist` folder.

## Features

* Zodiac 
* Planets
* Houses

### Planned
* Aspects (1.1.0)
* Transits (1.2.0)

## Built with

* Browserify
* Gulp
* SnapSVG

### License

[MIT](LICENSE), (c) [Samuel Lissner](http://www.slissner.de), 2017

