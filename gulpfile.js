var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var ghPages = require('gulp-gh-pages');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('serve', ['scripts', 'copy-images', 'copy-html', 'copy-libs', 'style'], function() {
  gulp.watch('scss/**/*.scss', ['style']);
  gulp.watch('lib/**/*.js', ['copy-libs']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('*.html', ['copy-html']);

  gulp.watch('dist/js/*.js').on('change', browserSync.reload);
  gulp.watch('dist/*.html').on('change', browserSync.reload);

  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
});

gulp.task('style', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
      .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('copy-lib', function() {
  return gulp.src('./lib/**/*')
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('copy-images', function() {
  return gulp.src('./img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('copy-html', function() {
  return gulp.src('./*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
  gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
  gulp.src('js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-libs', function() {
  gulp.src('./lib/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('dist/lib'));

  gulp.src('./lib/bootstrap/dist/fonts/*')
    .pipe(gulp.dest('dist/fonts'));

  gulp.src('lib/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('dist/lib'));

  return gulp.src('lib/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('dist/lib'));
});

gulp.task('dist', [
  'copy-html',
  'copy-images',
  'style',
  // 'lint',
  'scripts-dist'
]);

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['serve']);
