const gulp = require('gulp');
const runSequence = require('run-sequence');
const workspace = require('../workspace.js');
const shell = require('gulp-shell');
const gutil = require('gulp-util');

const environment = (process.env.npm_config_NODE_ENV || gutil.env) === 'prod' ? 'prod' : 'dev';
const stubbyCMD = environment === 'prod' ? '' : 'stubby -d stubby.yaml -l localhost -s 8017';
//console.log('start stubby:', stubbyCMD !== '');

gulp.task('watch', ['buildStage'], function() {
  gulp.watch(`${workspace.src}/**/*.scss`, ['build:sass']);
  gulp.watch(`${workspace.src}/**/*.js`, ['lint', 'copy2stage']);
  //gulp.watch(`${workspace.src}/**/*.js`, () => { runSequence('lint', 'copy2stage') });
  gulp.watch(`${workspace.src}/**/*.html`, ['copy2stage']);
  gulp.watch(`${workspace.src}/**/*.nunjucks.html`, ['build:nunjucks']);
});

/* unfortunately if there is no temp folder browser-sync cannot serve nothing
and reload poke has no effect */
gulp.task('watchAndReload',
  ['watch'],
  shell.task([
    'browser-sync reload',
    stubbyCMD
  ]));
