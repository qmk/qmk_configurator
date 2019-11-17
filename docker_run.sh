#!/bin/sh
# Setup yarn and build qmk_configurator inside the docker container.

set -e
#set -x

# Build configurator
cd /qmk_configurator
. /root/.nvm/nvm.sh
nvm use
yarn run build

# Start nginx
cat << EOF
============================================================================
----------------------------------------------------------------------------

QMK Configurator is ready to go! You can access it at the following address:

                         http://localhost:8080

If you have chosen a port other than 8080 you may have to adjust that URL.

----------------------------------------------------------------------------
============================================================================
EOF
nginx -g 'daemon off;'
