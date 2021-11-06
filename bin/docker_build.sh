#!/bin/sh
# Setup yarn and build qmk_configurator inside the docker container.

set -e
#set -x


# Activate nvm
. /root/.nvm/nvm.sh

# Install node
cd /qmk_configurator
nvm install

# Setup configurator to build
nvm use
yarn install

# Build configurator
VUE_APP_API_URL=/api yarn run build
