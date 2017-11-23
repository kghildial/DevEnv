const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');

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

gulp.task('browser-sync', ['nodemon'], function(){
  browserSync({
    proxy: 'localhost:3000',
    port: 5000,
    notify: false
  });
});
