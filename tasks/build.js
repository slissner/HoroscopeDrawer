const gulp = require('gulp');
const fs = require("fs");
const del = require('del');
const browserify = require("browserify");

gulp.task('clean', function () {
  return del([
    'dist/**/*'
  ]);
});

gulp.task('copy', () => {
  return gulp.src('src/horoscope/**/*.{php,html,txt,xml,png,jpg,gif,gpg,svg}')
    .pipe(gulp.dest('dist/'));
});

gulp.task('bundle', function () {
  return browserify({
      entries: ["src/horoscope/main.js"],
      paths: [
        "./node_modules",
        "./src/horoscope"
      ],
      standalone: 'zastro'
    })
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(fs.createWriteStream("dist/horoscope.js"));
});

gulp.task('build',
  gulp.series('clean', gulp.parallel('bundle', 'copy'))
);