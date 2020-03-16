#!/bin/sh
# Setup yarn and build qmk_configurator inside the docker container.

set -e
#set -x

# Install node
. /root/.nvm/nvm.sh
nvm install 11.12

# Setup configurator to build
cd /qmk_configurator
nvm use
yarn install

# Build configurator
VUE_APP_API_URL=/api yarn run build
