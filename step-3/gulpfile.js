const gulp = require('gulp');

gulp.task('hello', function() {
  console.log('Hello Zell');
});

require('require-dir')('./tasks', {
  recurse: true
});
