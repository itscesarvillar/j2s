const gulp = require('gulp');
var through = require('through2');
var workspace = require('../workspace.js');
var fs = require('fs');
var path = require('path');


gulp.task('build:test', function() {
  return gulp.src('test/test-*.js')
  .pipe(copyHTML())
});

function copyHTML() {
  var stream = through.obj(function(file, enc, cb) {
    //console.log(file.path, enc)
    const htmlfilename = path.basename(file.path, '.js').substr(5) //5: test-
    const htmlfileBytes = fs.readFileSync(`${workspace.stage}/${htmlfilename}.html`);

    const scripts2include =
    `<base href="../${workspace.stage}/">
    <script src="../bower_components/web-component-tester/browser.js"></script>
    <script src="../test/test-${htmlfilename}.js"></script>`

    var readyHtmlContent = htmlfileBytes.toString().replace(/<head>/,
      `<head>
      ${scripts2include}`);

    fs.writeFileSync(`./test/test-${htmlfilename}.html`, readyHtmlContent);

    cb(null, file);
  });
  return stream;
}
