#!/bin/sh
# Setup yarn and build qmk_configurator inside the docker container.

set -e
#set -x

# Install node
. /root/.nvm/nvm.sh
nvm install 11.12

# Get yarn installed correctly
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
apt-get update
apt-get remove cmdtest yarn
apt-get install --no-install-recommends -y yarn
rm -rf /var/lib/apt/lists/*

# Setup configurator to build
cd /qmk_configurator
nvm use
yarn install
