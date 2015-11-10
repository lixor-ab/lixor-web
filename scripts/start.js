// TODO: rambda refactor! meh - RxJS refactor! :)
// TODO: use gulp watch?
// TODO: use npm vars?
// TODO: DRY...
// TODO: this is getting silly - why am I doing this now again? :)

"use strict";

const browserSync = require("browser-sync"),
      gulp = require('gulp'),
      gutil = require('gulp-util'),
      postcss = require('gulp-postcss'),
      cssnext = require('cssnext'),
      postcssNested = require('postcss-nested'),
      postcssSimpleVars = require('postcss-simple-vars'),
      cssnano = require('cssnano'),
      babel = require('gulp-babel'),
      imagemin = require('gulp-imagemin'),
      uglify = require('gulp-uglify'),
      minifyHtml = require('gulp-minify-html');


const bs = browserSync.create(),
      id = function() {};

const dirs = {
  src: 'src',
  dist: 'dist'
};
const globs = {
  html: dirs.src + '/**/*.html',
  css: dirs.src + '/**/css/*.css',
  js: dirs.src + '/**/js/*.js',
  images: dirs.src + '/**/images/*'
};

const cpy2Dist = function(src, dest, done) {
  return gulp.src(src, { base: dirs.src })
    .pipe(gulp.dest(dest))
    .on('end', done);
}

const htmlTransform = function(src, dest) {
  return gulp.src(src)
    .pipe(minifyHtml()) // inline?
    .pipe(gulp.dest(dest));
}

const cssTransform = function(src, dest) {
  return gulp.src(src, { base: dirs.src })
    .pipe(postcss([
      cssnext,
      postcssNested,
      postcssSimpleVars,
      cssnano // source maps or not always...
    ]).on('error', function(err) { gutil.log(err.message); }))
    .pipe(gulp.dest(dest))
    .pipe(bs.stream()); // TODO: should be an argument // {match: '**/*.css'} when using sourcemaps
}

const jsTransform = function(src, dest) {
  return gulp.src(src, { base: dirs.src})
    .pipe(babel().on('error', function(err) { gutil.log(err.message); }))
    .pipe(uglify())
    .pipe(gulp.dest(dest))
    .pipe(bs.stream())
}

const imageTransform = function(src, dest) {
  return gulp.src(src)
      .pipe(imagemin({
          progressive: true
      }))
      .pipe(gulp.dest(dest))
      .pipe(bs.stream());
}

// might have to care about ordering if we want to inline in htmlTransform
const initBuild = function() {
  cssTransform(globs.css, dirs.dist);
  jsTransform(globs.js, dirs.dist);
  imageTransform(globs.images, dirs.dist);
  htmlTransform(globs.html, dirs.dist);
}

bs.watch(globs.html).on('change', function(file) {
  htmlTransform(file, dirs.dist);
});

bs.watch(globs.css).on('change', function(file) {
  cssTransform(file, dirs.dist);
});

bs.watch(globs.js).on('change', function(file) {
  jsTransform(file, dirs.dist);
});

bs.watch(globs.images).on('change', function(file) {
  imageTransform(file, dirs.dist);
});


initBuild();
bs.init({
  server: dirs.dist,
  open: false
});
