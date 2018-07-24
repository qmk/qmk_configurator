#!/bin/bash

# This script is intended to be run from the qmk_configurator/functional_tests directory
# Installs Chrome Web Driver
# Installs Selenium Standalone Server

if [ "$EUID" -ne 0 ]; then 
    exec sudo "$0" "$@"; 
fi

# Determine which OS
OS="$(uname -s)"

# Set Versions
SELENIUM_VERSION="3.13.0"
CHR_DRIVER_VER="2.40"

# Get Paths
PWD="$(pwd)" # should be qmk_configurator/functional_tests

# Determine which Chrome Web Driver to download based on system
if [ "${OS}" == "Darwin" ]; then
    CHR_DRIVER="https://chromedriver.storage.googleapis.com/${CHR_DRIVER_VER}/chromedriver_mac64.zip"
    DRIVER="mac64"
else
    VERSION="$(uname -m)"
    if [ "${VERSION}" == "x86_64:" ]; then
	    CHR_DRIVER="https://chromedriver.storage.googleapis.com/${CHR_DRIVER_VER}/chromedriver_linux32.zip"
        DRIVER="linux32"
    else
	    CHR_DRIVER="https://chromedriver.storage.googleapis.com/${CHR_DRIVER_VER}/chromedriver_linux64.zip"
        DRIVER="linux64"
    fi
fi

# Download Chrome Web Driver .zip file to temporary location
TEMP_PATH=${PWD}"/tmp/chromedriver"
mkdir "$TEMP_PATH" && pushd "$TEMP_PATH"
wget $CHR_DRIVER -P "$TEMP_PATH"
printf "Chrome Driver zip file downloaded to %s.\\n" "${TEMP_PATH}"

# Unzip Chrome Driver zip file to qmk_configurator/functional_tests/bin directory
DEST_PATH=${PWD}"/bin"
unzip "${TEMP_PATH}"/chromedriver_$DRIVER.zip
sudo mv -f ./chromedriver "$DEST_PATH"
sudo chown root:root "$DEST_PATH"
sudo chmod 0755 "$DEST_PATH"

printf "Installed Chrome Web Driver for %s to %s.\\n" "${DRIVER}" "${DEST_PATH}"

#Download and install Standalone Selenium Server
SELENIUM_JAR_FILE=selenium-server-standalone-$SELENIUM_VERSION.jar
wget http://selenium-release.storage.googleapis.com/$(echo "$SELENIUM_VERSION" | cut -d'.' -f-2)/$SELENIUM_JAR_FILE -P "$TEMP_PATH"
mv -f "$TEMP_PATH/$SELENIUM_JAR_FILE" "$DEST_PATH"
chown root:root "$DEST_PATH$SELENIUM_JAR_FILE"
chmod 755 "$DEST_PATH$SELENIUM_JAR_FILE"

printf "Installed Selenium Standalone Server %s. \\n" "${SELENIUM_VERSION}"

printf "Deleting directory qmk_configurator/functional_tests/tmp \\n"
sudo rm -rf tmp/

printf "Installation is successful. \\n"