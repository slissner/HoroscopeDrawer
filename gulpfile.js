const gulp = require('gulp');
const requireDir = require('require-dir');
const dir = requireDir('./tasks');

gulp.task('default', gulp.parallel('build'));

gulp.task('watch', function() {
  gulp.watch('src/horoscope/**/*', gulp.parallel('build'));
});