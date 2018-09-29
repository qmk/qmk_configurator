#!/bin/bash -e
set -x

# This script is intended to be run from the qmk_configurator/functional_tests directory
# Installs Chrome Web Driver
# Installs Selenium Standalone Server

# Determine which OS
OS="$(uname -s)"

# Set Versions
SELENIUM_VERSION="3.13.0"
CHR_DRIVER_VER="2.40"
GKO_DRIVER_VER="0.21.0"
CHR_DRIVER_URL="https://chromedriver.storage.googleapis.com/${CHR_DRIVER_VER}"
GKO_DRIVER_URL="https://github.com/mozilla/geckodriver/releases/download/v${GKO_DRIVER_VER}"

# Get Paths
ROOTPWD=$(pwd) # should be qmk_configurator/functional_tests

rm -fr ./bin ./tmp
mkdir -p ./bin ./tmp

# Determine which Chrome Web Driver to download based on system
if [ "${OS}" == "Darwin" ]; then
    DRIVER="macos"
    GKO_ARCHIVE="geckodriver-v${GKO_DRIVER_VER}-${DRIVER}.tar.gz"
    CHR_ARCHIVE="chromedriver_mac64.zip"
else
    VERSION="$(uname -m)"
    if [ "${VERSION}" == "x86_64:" ]; then
      DRIVER="linux32"
    else
      DRIVER="linux64"
    fi
    GKO_ARCHIVE="geckodriver-v${GKO_DRIVER_VER}-${DRIVER}.tar.gz"
    CHR_ARCHIVE="chromedriver_${DRIVER}.zip"
fi
CHR_DRIVER="${CHR_DRIVER_URL}/${CHR_ARCHIVE}"
GKO_DRIVER="${GKO_DRIVER_URL}/${GKO_ARCHIVE}"

# Download Chrome Web Driver .zip file to temporary location
TEMP_PATH="${ROOTPWD}/tmp/chromedriver"
mkdir -p "$TEMP_PATH" && cd "$TEMP_PATH"
wget $CHR_DRIVER -P "$TEMP_PATH"
printf "Chrome Driver zip file downloaded to %s.\\n" "${TEMP_PATH}"

# Unzip Chrome Driver zip file to qmk_configurator/functional_tests/bin directory
DEST_PATH=${ROOTPWD}"/bin"
unzip "${TEMP_PATH}/${CHR_ARCHIVE}"
mv -f ./chromedriver "$DEST_PATH"
chmod 0755 "$DEST_PATH"

printf "Installed Chrome Web Driver for %s to %s.\\n" "${DRIVER}" "${DEST_PATH}"

# Download geckodriver to temporary location
TEMP_PATH=${ROOTPWD}"/tmp/geckodriver"
mkdir -p "$TEMP_PATH" && cd "$TEMP_PATH"
wget $GKO_DRIVER -P "$TEMP_PATH"
printf "geckodriver downloaded to %s.\\n" "${TEMP_PATH}"

# gunzip/tar geckodriver to qmk_configurator/functional_tests/bin directory
DEST_PATH=${ROOTPWD}"/bin"
gunzip < "${TEMP_PATH}/${GKO_ARCHIVE}" | tar xvf -

mv -f ./geckodriver "$DEST_PATH"
chmod 0755 "${DEST_PATH}"

printf "Installed geckodriver for %s to %s.\\n" "${DRIVER}" "${DEST_PATH}"

#Download and install Standalone Selenium Server
SELENIUM_JAR_FILE=selenium-server-standalone-$SELENIUM_VERSION.jar
wget "http://selenium-release.storage.googleapis.com/$(echo "$SELENIUM_VERSION" | cut -d'.' -f-2)/$SELENIUM_JAR_FILE" -P "$TEMP_PATH"
mv -f "${TEMP_PATH}/${SELENIUM_JAR_FILE}" "${DEST_PATH}"
chmod 755 "${DEST_PATH}/${SELENIUM_JAR_FILE}"

printf "Installed Selenium Standalone Server %s. \\n" "${SELENIUM_VERSION}"

printf "Deleting directory qmk_configurator/functional_tests/tmp \\n"
rm -rf ./tmp/

printf "Installation is successful. \\n"
