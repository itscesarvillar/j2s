const gulp = require('gulp');
const runSequence = require('run-sequence');
const workspace = require('../workspace.js');

gulp.task('watch', function() {
  gulp.watch(`${workspace.src}/**/*.scss`, ['sass']);
  gulp.watch(`${workspace.src}/**/*.js`, ['lint', 'copy2stage']);
  //gulp.watch(`${workspace.src}/**/*.js`, () => { runSequence('lint', 'copy2stage') });
  gulp.watch(`${workspace.src}/**/*.html`, ['copy2stage']);
});
