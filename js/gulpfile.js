const gulp = require('gulp');

const sass = require('gulp-sass');

const autoprefixer = require('gulp-autoprefixer');

const cleanCSS = require('gulp-clean-css');

const concat = require('gulp-concat');

const uglify = require('gulp-uglify');

const rename = require('gulp-rename');

const sourcemaps = require('gulp-sourcemaps');


function styles() {
  return gulp.src('css/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css'));
}


function scripts() {
  return gulp.src([
      'js/vendor/**/*.js',
      'js/scripts.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('js'));
}


function watch() {
  gulp.watch('css/scss/**/*.scss', styles);
  gulp.watch('js/**/*.js', scripts);
}


exports.default = gulp.series(styles, scripts, watch);