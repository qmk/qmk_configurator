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

1. Download the latest [Selenium Standalone Server .jar](https://www.seleniumhq.org/download/) and put it in the 'functional_tests/bin' directory.
2. Update the 'server_path' setting to the correct path and version in 'nightwatch.conf.js' as needed.
3. If you are using Google Chrome make sure you download the [correct drivers](https://chromedriver.storage.googleapis.com/index.html?path=2.40/) suitable for your system, and place it in the `functional_tests/bin` directory, replacing files as necessary. 
4. Download and install the Java SDK. 
5. Run 'npm install'  from the the main qmk_configurator directory
```console
foo@bar:~/qmk_configurator$ npm install
```

## Execution

To run all tests with the 'default' settings from nightwatch.js.conf:

```console
foo@bar:~/qmk_configurator$ node_modules/nightwatch/bin/nightwatch -e chromeHeadless
```

The chosen environment(s) will then be executed in their own child process

