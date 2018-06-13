# How to set up a GitHub instance of the QMK Configurator

This document will walk you through deploying an instance of the QMK Configurator via your own repository.

## 1. Fork the qmk/qmk_configurator repository

Go to [qmk/qmk_configurator](https://github.com/qmk/qmk_configurator), and click the `fork` button at top right.

## 2. Create a gh-pages branch

In your git CLI, enter:

    git checkout gh-pages

This will create a copy of the `gh-pages` branch that is already on the QMK repo.

## 3. Remove the CNAME file

Remove the `CNAME` file, which is only for the production version of the Configurator.

    rm CNAME

## 4. Edit the _config.yml file

In the root directory, open the `_config.yml` file in a text editor, and edit it as appropriate:

    title: QMK Configurator
    email: <github_email>     # the email attached to your GitHub account
    show_downloads: true
    description: QMK for potatoes - an open source configurator for QMK Firmware (only the AVR boards right now)
    baseurl: "/qmk_configurator"     # DO NOT CHANGE THIS LINE!
    # Replace <github_username> on the following three lines with your GitHub username
    url: "http://<github_username>.github.io"
    github_username: <github_username>
    repository: <github_username>/qmk_configurator
    theme: jekyll-theme-minimal

## 5. Deploy your instance

When you're done editing, save the file, commit it to your branch, and push your changes to your GitHub repo.

    git add .
    git commit -m "initial setup"
    git push

Once you've pushed your changes, your instance should be live in about 30 seconds at `https://<github_username>.github.io/qmk_configurator`.
