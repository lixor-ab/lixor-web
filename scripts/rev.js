#!/usr/bin/env node

// a bit naive - but we should only have 3 levels
// this replaces all refs in any file - should be fine

const gulp = require('gulp');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const gulpif = require('gulp-if');


const args = process.argv.slice(2);
const inDir = args[0];
const outDir = args[1];

const assetLeaf = 'media/**/*.{svg,jpg,jpeg,png}';
const assetMiddle = '**/*.{css,js}';

gulp.src(`${inDir}/**/*`, { base: inDir})
  .pipe(gulpif(assetLeaf, rev()))
  .pipe(revReplace())
  .pipe(gulpif(assetMiddle, rev()))
  .pipe(revReplace())
  .pipe(gulp.dest(outDir));
