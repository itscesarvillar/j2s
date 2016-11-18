const gulp = require('gulp');
const workspace = require('../workspace.js');
const replace = require('gulp-replace');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const fs = require('fs');


function replaceWith(stream, replacements) {
  return stream.pipe(replace(/##(\w+)##/g, function(match, key) {
    return replacements.hasOwnProperty(key) ? replacements[key] : `##${key}##`;
  }));
}

gulp.task('build:environment', function() {
  const environment = (process.env.npm_config_NODE_ENV || gutil.env) === 'prod' ? 'prod' : 'dev';
  const envReplacements = JSON.parse(fs.readFileSync(`config/env/${environment}.json`));
  const configReplacements = JSON.parse(fs.readFileSync('config/values.json'));
  const replacements = Object.assign(envReplacements, configReplacements);
  //console.log('replacements', replacements)

  var stream = gulp.src(`${workspace.src}/**/*.tpl.*`);
  return replaceWith(stream, replacements)
    .pipe(rename(function(path) {
      path.basename = path.basename.replace(/.tpl$/, '');
    }))
    .pipe(gulpif('*.scss',
      gulp.dest(`${workspace.src}`),
      gulp.dest(`${workspace.stage}`)));
});
