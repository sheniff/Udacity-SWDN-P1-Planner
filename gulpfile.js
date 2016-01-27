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

// ToDo: fix to build first in dist
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('copy', function() {
  gulp.src('./js/**/*')
    .pipe(gulp.dest('dist/js'));

  gulp.src('./css/**/*')
    .pipe(gulp.dest('dist/css'));

  gulp.src('./img/**/*')
    .pipe(gulp.dest('dist/img'));

  gulp.src('./lib/**/*')
    .pipe(gulp.dest('dist/lib'));

  gulp.src('./*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['serve']);
