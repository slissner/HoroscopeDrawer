const gulp = require('gulp');
const fs = require("fs");
const del = require('del');
const browserify = require("browserify");
const babelify = require('babelify');

gulp.task('example-clean', function () {
  return del([
    'example/**/*'
  ]);
});

gulp.task('example-copy', (done) => {
  gulp.src('src/example/**/*.{php,html,js,txt,xml,png,jpg,gif,gpg,css}')
    .pipe(gulp.dest('example/'));
  done();
});

const entryPoint = "src/example/example.js";
gulp.task('example-bundle', function (done) {
  browserify(entryPoint, {debug: true})
    .transform(babelify, {presets: ["es2015"], sourceMaps: true})
    .bundle()
    .pipe(fs.createWriteStream("example/example.js"));
  done();
});

gulp.task('example-build',
  gulp.series('example-clean', 'example-copy', 'example-bundle')
);