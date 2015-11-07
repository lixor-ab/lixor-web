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
      babel = require('gulp-babel');


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
  gulp.src(src, { base: dirs.src })
    .pipe(gulp.dest(dest))
    .on('end', done);
}

const cssTransform = function(src, dest) {
  gulp.src(src, { base: dirs.src })
    .pipe(postcss([
      cssnext,
      postcssNested,
      postcssSimpleVars
    ]).on('error', function(err) { gutil.log(err.message); }))
    .pipe(gulp.dest(dest))
    .pipe(bs.stream()); // TODO: should be an argument // {match: '**/*.css'} when using sourcemaps
}

const jsTransform = function(src, dest) {
  gulp.src(src, { base: dirs.src})
    .pipe(babel().on('error', function(err) { gutil.log(err.message); }))
    .pipe(gulp.dest(dest))
    .pipe(bs.stream())
}

const initBuild = function() {
  cpy2Dist(globs.html, dirs.dist, id);
  cssTransform(globs.css, dirs.dist);
  jsTransform(globs.js, dirs.dist);
  cpy2Dist(globs.images, dirs.dist, id);
}

bs.watch(globs.html).on('change', function(file) {
  cpy2Dist(file, dirs.dist, bs.reload);
});

bs.watch(globs.css).on('change', function(file) {
  cssTransform(file, dirs.dist);
});

bs.watch(globs.js).on('change', function(file) {
  jsTransform(file, dirs.dist);
});

bs.watch(globs.images).on('change', function(file) {
  cpy2Dist(file, dirs.dist, bs.reload);
});


initBuild();
bs.init({
  server: dirs.dist,
  open: false
});
