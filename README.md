# Lixor web


## TODO
* make it build on travis ci
* automate the github pages deploy properly - only manual now
* show Torfinn & Rut
    * go over fonts & line height
    * animations/transitions!
    * show hugo
* add SVG logos (?)
    * and full screen graphics? (show footer)
* automate production
    * show them again :)
* robots.txt et al
* do wider screens
* add article / blog post template
* add way to navigate main -> post


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


## Dev

All commands in different shells:

    > yarn run hugo-dev
    > yarn run postcss-dev
    > yarn run babel-dev

Edit away & it's livereloaded at http://localhost:1313 (listening on 0.0.0.0 so your IP as well).


## Deploy

    > mkdir public
    > git clone git@github.com:uliedberg/lixor-web.git public
    > cd public
    > git co gh-pages
    > cd ..
    > yarn dist
    > cd dist
    > git add .
    > git c -m "Build ..."
    > git push

Ehm - this should be automated...



