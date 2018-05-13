Development Tips
================

## Local Development using Jekyll

Configurator leverages the Jekyll static site generator available as part of github pages. A single page app is basically a static web page that communicates with an API. There are no cross site origin restrictions on the QMK API, so you are free to develop code locally and it will still be able to talk to the QMK APIs.

 1. ensure you have a recent install of ruby. This was tested on OSX with Ruby 2.5.1p57
 1. install jekyll. You can find instructions [here](https://jekyllrb.com/)
 1. git clone the qmk_configurator project from github using your favorite git tool
 1. cd into this directory
 1. If you have never run serve before you may have to install the ruby dependencies for this project
   `bundle install`. You'll get a warning if the next command doesn't work.
 1. from the CLI run `bundle exec jekyll serve`

On OSX, it will open a browser pointing to localhost port 4000. You are now able to do development. You will have to reload between changes as jekyll in it's default configuration doesn't supoprt live reloading. If someone wants to contribute that please do.

## Development using gh-pages

TBD
