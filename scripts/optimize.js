#!/usr/bin/env node

// a bit naive - but we should only have 3 levels
// this replaces all refs in any file - should be fine

const gulp = require('gulp');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const recompress = require('imagemin-jpeg-recompress');
const svgo = require('imagemin-svgo');
const lazypipe = require('lazypipe');


const args = process.argv.slice(2);
const inDir = args[0];
const outDir = args[1];

const assetMedia = 'media/**/*.{svg,jpg,jpeg,png}';
const assetMiddle = '**/*.{css,js}';

const mediaPipeline = lazypipe()
  .pipe(imagemin, [
    recompress({ method: 'smallfry', quality: 'medium', max: 85 }),
    svgo()
  ])
  .pipe(rev);

gulp.src(`${inDir}/**/*`, { base: inDir})
  .pipe(gulpif(assetMedia, mediaPipeline()))
  .pipe(revReplace())
  .pipe(gulpif(assetMiddle, rev()))
  .pipe(revReplace())
  .pipe(gulp.dest(outDir));
