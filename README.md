# Lixor web

[![Build Status](https://travis-ci.org/lixor-ab/lixor-web.svg?branch=master)](https://travis-ci.org/lixor-ab/lixor-web)

## TODO
* show Torfinn & Rut
    * go over fonts & line height
    * animations/transitions!
    * show hugo
* add SVG logos (?)
    * and full screen graphics? (show footer)
* automate production properly with correct domain + CDN (?)
    * show them again :)
* robots.txt et al
* do wider screens
* add analytics (google?)
* add service worker for offline exprience
   * maybe, just maybe, we should wait for some analytics data ;)
* add article / blog post template
* add way to navigate main -> post
* add drop down function on arrows
* change picture of Rut
* Remove quote in footer


## Design prototype by Torfin
* zeplin project link: https://zpl.io/ZTbtFf
* zeplin presentation: https://scene.zeplin.io/project/58605bc7880264cf15a0c55f
* sketch original: TODO: put sketch file somewhere, too big for git repo really :)


## Content & basic structure
Using [hugo](https://gohugo.io/) as the static website engine. Look at
https://gohugo.io/content/example/ & in [content](content).


## The rest
* postcss-cssnext for styling
* babel for js
* travis-ci for CI & deploy (see [.travis.yml](.travis.yml) & [scripts/deploy.sh](scripts/deploy.sh))


## Basic dev env setup
* install node (e.g. https://github.com/creationix/nvm#installation + `> nvm install 7.3.0`
* install homebrew (http://brew.sh/)
* `> brew update`
* install yarn (`> brew install yarn`)
* install hugo (`> brew install hugo`)
* do `> yarn` in repo dir


## Dev

All commands in different shells:

    > yarn run hugo-dev
    > yarn run postcss-dev
    > yarn run babel-dev

Edit away & it's livereloaded at http://localhost:1313 (listening on 0.0.0.0 so your IP as well).


## Deploy
Deploy (to github pages), happens via travis-ci. Travis pushed the built files to master branch
at git@github.com:lixor-ab/lixor-ab.github.io.git.

Right now it can be accessed at: https://lixor-ab.github.io/.


