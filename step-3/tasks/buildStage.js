const gulp
 = require('gulp');
const size = require('gulp-size');
const workspace = require('../workspace.js');
const runSequence = require('run-sequence');
const del = require('del');

gulp.task('copy2stage', function() {
  return gulp.src([
      `!${workspace.src}/**/*.scss`,
      `!${workspace.src}/**/*.tpl.*`,
      `${workspace.src}/**/*`
    ])
    .pipe(gulp.dest(`${workspace.stage}`))
    .pipe(size({ title: 'stage' }));
});

gulp.task('buildStage', function() {
  return runSequence(
    'clean:buildStage',
    ['sass','copy2stage']);
});

gulp.task('clean:buildStage', function(cb) {
  del.sync([`${workspace.stage}`]);
  cb();
});
