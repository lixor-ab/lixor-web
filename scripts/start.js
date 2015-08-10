// TODO: rambda refactor!
// TODO: use gulp watch?
// TODO: use npm vars?

"use strict";

const browserSync = require("browser-sync"),
      gulp = require('gulp'),
      gutil = require('gulp-util'),
      postcss = require('gulp-postcss'),
      cssnext = require('cssnext');

const bs = browserSync.create(),
      id = function() {};

const dirs = {
  src: 'src',
  dist: 'dist'
};
const globs = {
  html: dirs.src + '/**/*.html',
  css: dirs.src + '/**/css/*.css'
};

const cpy2Dist = function(src, dest, done) {
  gulp.src(src, { base: dirs.src })
    .pipe(gulp.dest(dest))
    .on('end', done);
}

const cssTransform = function(src, dest) {
  gulp.src(src, { base: dirs.src })
    .pipe(postcss([cssnext]).on('error', function(err) { gutil.log(err.message); }))
    .pipe(gulp.dest(dest))
    .pipe(bs.stream()); // TODO: should be an argument // {match: '**/*.css'} when using sourcemaps
}

const initBuild = function() {
  cpy2Dist(globs.html, dirs.dist, id);
  cssTransform(globs.css, dirs.dist);
}

bs.watch(globs.html).on('change', function(file) {
  cpy2Dist(file, dirs.dist, bs.reload);
});

bs.watch(globs.css).on('change', function(file) {
  cssTransform(file, dirs.dist);
});


initBuild();
bs.init({
  server: dirs.dist,
  open: false
});
