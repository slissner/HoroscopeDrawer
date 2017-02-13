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

gulp.task('example-copy-dist', (done) => {
  gulp.src('dist/**/*')
    .pipe(gulp.dest('example/'));
  done();
});

gulp.task('example-copy', (done) => {
  gulp.src('src/example/**/*.{php,html,js,txt,xml,png,jpg,gif,gpg,css}')
    .pipe(gulp.dest('example/'));
  done();
});

// gulp.task('example-bundle', function (done) {
//   browserify({
//     entries: ["src/example/example.js"],
//     debug: true,
//     paths: [
//       "./node_modules",
//       "./example"
//     ]
//   })
//     .transform(babelify, {presets: ["es2015"], sourceMaps: true})
//     .bundle()
//     .pipe(fs.createWriteStream("example/example.js"));
//   done();
// });

gulp.task('example-build',
  gulp.series(
    gulp.parallel('build', 'example-clean'),
    'example-copy-dist',
    'example-copy'
  )
);