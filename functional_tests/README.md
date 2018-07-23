# Functional Test using Nightwatch.js

[Nightwatch](http://nightwatchjs.org/) is an automated testing framework for web applications and websites. It is written using Node.js and the W3C WebDriver API. 

## Structure

#### globals.js:
Contains the Setup and Teardown methods ran before each test as well as the variables for setting webdriver timeouts. 
Also contains the launch URL for the application under testing.

#### nightwatch.conf.js:
The configuration file for Nightwatch.js that holds the paths to the required folders
as well as the settings for Selenium and the Webdrivers.
 
#### bin directory:
Folder containing the selenium jar and the webdriver executables. Currently the Linux webdrivers are included in the repo, the jar is not.
Ideally these should be downloaded by a script when executed on a CI environment to ensure they are up to date.

## Setup

1. Run the `selenium_setup.sh` script to install the following to `qmk_configurator/functional_tests/bin`  
            Selenium Standalone Server 
            Chrome Web Driver version 

```
foo@bar:~/qmk_configurator/functional_tests$ ./selenium_setup.sh
```
At the time of this writing, `chromedriver` is at `2.40` and Selenium Standalone Server is at `3.13.0'

2. Download and install the Java SDK. 
3. Run 'npm install'  from the the main qmk_configurator directory
```console
foo@bar:~/qmk_configurator$ npm install
```
4. Update `qmk_configurator/nightwatch.conf.js` to have the correct version for the `Selenium Standalone Server`

## Execution

To run all tests with the 'default' settings from nightwatch.js.conf:

```console
foo@bar:~/qmk_configurator$ node_modules/nightwatch/bin/nightwatch -e chromeHeadless
```

The chosen environment(s) will then be executed in their own child process

