const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('nodemon', function(cb){
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function(){
    if(!called){
      called = true;
      cb();
    }
  })
  .on('restart', function(){
    setTimeout(function(){
      reload({stream: false});
    }, 1000);
  });
});
