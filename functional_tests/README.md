# Functional Test using Nightwatch.js

TODO:intro

## Structure

#### Globals.js:
Contains the Setup and Teardown methods ran before each test as well as the variables for setting webdriver timeouts. 
Also contains the launch URL for the application under testing.

#### nightwatch.conf.js:
The configuration file for Nightwatch.js that holds the paths to the required folders
as well as the settings for Selenium and the Webdrivers.
 
#### bin directory:
Folder containing the selenium jar and the webdriver executables. Currently the webdrivers are included in the repo, the jar is not.
Ideally these should be downloaded by a script when executed on a CI environment to ensure they are up to date.

## Setup

1. Download the latest Selenium Standalone jar and put it in the 'bin' folder.
Update the 'server_path' setting in 'nightwatch.conf.js' as needed.
2. Run 'npm install'  from the the main qmk_configurator directory

## Execution

To run all tests with the 'default' settings from nightwatch.js.conf:

```console
foo@bar:~/qmk_configurator$ nightwatch
```

To run them with a specific environment, use the '-e' switch:
```console
foo@bar:~/qmk_configurator$ nightwatch -e firefoxHeadless,chromeHeadless
```
The chosen environment(s) will then be executed in their own child process

