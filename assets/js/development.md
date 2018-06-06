Development Tips
================

## Local Development using Jekyll

The [QMK Configurator](https://config.qmk.fm/) leverages the Jekyll static site generator available as part of [GitHub Pages](https://pages.github.com/). A single page app is basically a static web page that communicates with an API. There are no cross site origin restrictions on the QMK API, so you are free to develop code locally and it will still be able to talk to the QMK APIs.

 1. Ensure you have a recent install of ruby. This was tested on OSX with Ruby 2.5.1p57
 1. Install `jekyll`. You can find instructions [here](https://jekyllrb.com/)
 1. `git clone` the qmk_configurator project from [GitHub](https://github.com/qmk/qmk_configurator) using your favorite Git tool

        git clone https://github.com/qmk/qmk_configurator.git

 1. `cd` into this directory

        cd qmk_configurator

 1. If you have never run serve before you may have to install the ruby dependencies for this project.    
    From the CLI, run `bundle install`. You'll get a warning if the next command doesn't work.
 1. From the CLI, run `bundle exec jekyll serve`

      You should see output similar to the following:

 ```
 you@qmk_machine:~/Documents/qmk_configurator$bundle exec jekyll serve
Configuration file: none
Configuration file: none
            Source: /Users/you/Documents/qmk_configurator
       Destination: /Users/you/Documents/qmk_configurator/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 0.036 seconds.
 Auto-regeneration: enabled for '/Users/you/Documents/qmk_configurator'
Configuration file: none
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
 ```

On OSX, it will open a browser pointing to localhost port 4000. If it does not, open up a browser and paste http://127.0.0.1:4000 into the search bar. 

You are now able to do development. 

You will have to reload between changes as `jekyll` in it's default configuration doesn't support live reloading. If someone wants to contribute that please do.

## Development using gh-pages

TBD
