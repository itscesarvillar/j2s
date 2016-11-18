const gulp = require('gulp');
const size = require('gulp-size');
const workspace = require('../workspace.js');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src(`${workspace.src}/**/*.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      remove: true
    }))
    .pipe(gulp.dest(`${workspace.stage}`))
    .pipe(size({ title: 'app/styles' }));
});
