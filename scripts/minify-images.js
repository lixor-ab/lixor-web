#!/usr/bin/env node

const imagemin = require('imagemin');
const recompress = require('imagemin-jpeg-recompress');
const svgo = require('imagemin-svgo');

 // TODO: take args
imagemin(['static/assets/media/**/*.{jpg,svg}'], 'build/', {
    plugins: [
        recompress({
          method: 'smallfry',
          quality: 'medium',
          max: 85
          // accurate: true
        }),
        svgo()
    ]
}).then(files => {
    console.log(files);
});
