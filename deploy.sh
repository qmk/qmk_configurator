#!/bin/bash
set -e # exit with nonzero exit code if anything fails

yarn lint
yarn test:unit
yarn test:e2e

if [ "${TRAVIS_PULL_REQUEST}"  != "false" ]; then
  # Exit if we're running a pull request
  exit 0;
fi

rm -rf .git
cd dist
git init
git remote add origin https://github.com/${TRAVIS_REPO_SLUG}
git pull origin config

rm -rf .git
git init

# inside this git repo we'll pretend to be a new user
git config user.name "QMK Bot"
git config user.email "hello@qmk.fm"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy to GitHub Pages"

# Force push from the current repo's dev branch to the remote github.io
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}" master:gh-pages > /dev/null 2>&1
