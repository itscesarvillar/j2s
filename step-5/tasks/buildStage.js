const gulp = require('gulp');
const size = require('gulp-size');
const workspace = require('../workspace.js');
const runSequence = require('run-sequence');
const del = require('del');

gulp.task('copy2stage', function() {
  return gulp.src([
      `!${workspace.src}/**/*.scss`,
      `!${workspace.src}/**/*.tpl.*`,
      `!${workspace.src}/**/*.nunjucks.*`,
      `!${workspace.src}/partials{,/**}`,
      `${workspace.src}/**/*`
    ])
    .pipe(gulp.dest(`${workspace.stage}`))
    .pipe(size({ title: 'stage' }));
});

gulp.task('buildStage', function(callback) {
  return runSequence(
    'clean:buildStage',
    ['build:environment', 'build:nunjucks','build:sass','copy2stage'],
    callback);
});

gulp.task('clean:buildStage', function() {
  return del.sync([`${workspace.stage}`]);
});
