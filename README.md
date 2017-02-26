# Lixor web

[![Build Status](https://travis-ci.org/lixor-ab/lixor-web.svg?branch=master)](https://travis-ci.org/lixor-ab/lixor-web)

## TODO
* remove quote in footer
* do wider screens
* add analytics (google?)
* invalidate cloud front on release - done
	* only invalidate on actual diff in content
* empty s3-bucket?
* clean up all deploy stuff
* image optimizations (fix lighthouse score :) )
* compress as part of build (?)
* add service worker for offline exprience
   * maybe, just maybe, we should wait for some analytics data ;)
* add article / blog post template


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
* travis-ci for CI & deploy (see [.travis.yml](.travis.yml) & [scripts/build-all-deploy-non-master.sh](scripts/build-all-deploy-non-master.sh))
  * gh-pages for staging
  * amazon S3 & Cloudfront for production


## Basic dev env setup
* install node (e.g. https://github.com/creationix/nvm#installation + `> nvm install 7.3.0`
* install homebrew (http://brew.sh/)
* `> brew update`
* install yarn (`> brew install yarn`)
* install hugo (`> brew install hugo`)
* do `> yarn` in repo dir


## Dev

All commands in different shells:

    > yarn run dev

Edit away & it's livereloaded at http://localhost:1313 (listening on 0.0.0.0 so your IP as well).


## Deploy

### Production
Deploy to https://www.lixor.se happens when master is pushed to github. Travis
picks this up & deploys to Amazon S3 & then invalidates the Amazon Cloudfront
CDN. Can take a couple of minutes.

### Staging (i.e. not master :) )
Deploy (to github pages), happens via travis-ci. Travis pushed the built files to master branch
at git@github.com:lixor-ab/lixor-ab.github.io.git.

Right now it can be accessed at: https://lixor-ab.github.io/.

So the latest push to any branch except master will be live there. Might need some work.
(robots.txt is changed in testing env so google et al should not index this one)
