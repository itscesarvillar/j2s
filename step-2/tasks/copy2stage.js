const gulp = require('gulp');
const size = require('gulp-size');
const workspace = require('../workspace.js');

gulp.task('copy2stage', function() {
  return gulp.src([
      `!${workspace.src}/**/*.scss`,
      `${workspace.src}/**/*`
    ])
    .pipe(gulp.dest(`${workspace.stage}`))
    .pipe(size({ title: 'stage' }));
});
