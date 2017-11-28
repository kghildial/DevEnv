const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');

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

gulp.task('sass', function(){
  return gulp.src('./public/sass/**/*.scss')
  .pipe(sass())
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./public/assets/css'))
  .pipe(browserSync.reload({ stream: true}));
});


gulp.task('watch', ['browser-sync', 'sass'] ,function(){
  gulp.watch('./views/**/*.ejs', reload);
  gulp.watch('./public/sass/**/*.scss', ['sass']);
  gulp.watch('./public/assets/js/**/*.js', reload);
});
