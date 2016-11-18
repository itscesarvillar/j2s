const gulp = require('gulp');
const eslint = require('gulp-eslint');
const workspace = require('../workspace.js');

gulp.task('lint', () => {
  return gulp.src(`${workspace.src}/**/*.js`)
    .pipe(eslint())
    .pipe(eslint.format())
    //.pipe(eslint.failAfterError());
});
