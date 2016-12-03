const gulp = require('gulp');
const fs = require("fs");
const browserify = require("browserify");

gulp.task('build', function(done) {
  browserify("src/js/main.js")
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(fs.createWriteStream("dist/horoscope.js"));
  done();
});