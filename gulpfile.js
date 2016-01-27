var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ghPages = require('gulp-gh-pages');

gulp.task('serve', ['style'], function() {

  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('scss/**/*.scss', ['style']);
  gulp.watch('js/*.js').on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);

});


gulp.task('style', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages());
});

gulp.task('default', ['serve']);
