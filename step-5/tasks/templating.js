const gulp = require('gulp');
const workspace = require('../workspace.js');
const nunjucksRender = require('gulp-nunjucks-render');
const rename = require('gulp-rename');
const data = require('gulp-data');
const gutil = require('gulp-util');

gulp.task('build:nunjucks', ['build:environment'], function() {
  return gulp.src(`${workspace.src}/*.+(html|nunjucks|nunjucks.html)`)
  .pipe(data(function() {
    const environment = (process.env.npm_config_NODE_ENV || gutil.env) === 'prod' ? 'prod' : 'dev';
    return require('../config/env/' + environment + '.json');
  }))
  .pipe(nunjucksRender({
     path: [`${workspace.src}/partials`]
  }))
  .pipe(rename(function(path){
    path.basename = path.basename.replace(/.nunjucks$/, '');
  }))
  .pipe(gulp.dest(workspace.stage))
});
