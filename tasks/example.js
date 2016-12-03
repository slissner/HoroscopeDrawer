const gulp = require('gulp');
const fs = require("fs");
const del = require('del');
const browserify = require("browserify");

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

gulp.task('example-bundle', function(done) {
  browserify("src/example/example.js")
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(fs.createWriteStream("example/example.js"));
  done();
});

gulp.task('example-build',
  gulp.series('build', 'example-clean', 'example-copy', 'example-bundle')
);