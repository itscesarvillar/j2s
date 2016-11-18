const gulp = require('gulp');
const runSequence = require('run-sequence');
const workspace = require('../workspace.js');
const shell = require('gulp-shell');

gulp.task('watch', ['buildStage'], function() {
  gulp.watch(`${workspace.src}/**/*.scss`, ['sass']);
  gulp.watch(`${workspace.src}/**/*.js`, ['lint', 'copy2stage']);
  //gulp.watch(`${workspace.src}/**/*.js`, () => { runSequence('lint', 'copy2stage') });
  gulp.watch(`${workspace.src}/**/*.html`, ['copy2stage']);
});

/* unfortunately if there is no temp folder browser-sync cannot serve nothing
and reload poke has no effect */
gulp.task('watchAndReload', ['watch'], shell.task('browser-sync reload'));
