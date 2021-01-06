# Quantum Mechanical Keyboard Configurator

[![Build Status](https://github.com/qmk/qmk_configurator/workflows/Website%20build/badge.svg)](https://github.com/qmk/qmk_configurator/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/qmk/qmk_configurator/badge.svg)](https://snyk.io/test/github/qmk/qmk_configurator)
[![Discord](https://img.shields.io/discord/440868230475677696.svg)](https://discord.gg/Uq7gcHh)
[![GitHub contributors](https://img.shields.io/github/contributors/qmk/qmk_configurator.svg)](https://github.com/qmk/qmk_configurator/pulse/monthly)
[![GitHub forks](https://img.shields.io/github/forks/qmk/qmk_configurator.svg?style=social&label=Fork)](https://github.com/qmk/qmk_configurator/)

The QMK Configurator is an online tool used for easily creating firmware files for keyboards supported in [qmk_firmware](https://github.com/qmk/qmk_firmware). The tool is located on https://config.qmk.fm.

The QMK Configurator allows simple keymap creation and saving via .json keymap files, and generates appropriate firmware files for flashing onto selected keyboards.

This project is very much a work in progress. To begin contributing, please refer to the following:

 * [Issues](https://github.com/qmk/qmk_configurator/issues)

## Development

We recommend you install and use [NVM](https://github.com/creationix/nvm) to manage node versions. There is a .nvmrc file in the root of the project directory that has been tested with our dependencies.

### Select node version
```shell
nvm use
```

### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
Start the server separatly
```
yarn run test:cypress
```

### Run your end-to-end tests like CI
Start the server separatly
```
yarn run test:cypress:ci
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Docker

If you don't have a webserver already and don't already have one in mind you can use docker. By default it spins up a self-contained environment.

    docker run -p 8080:80 qmkfm/qmk_configurator:latest

You can specify a different backend URL by setting `VUE_APP_API_URL`:

    docker run -e VUE_APP_API_URL=http://localhost:8080 -p 8080:80 qmkfm/qmk_configurator:latest

If you'd like to develop locally you can use a volume to tie your local filesystem to the container:

    docker run --mount type=volume,source=.,target=/qmk_configurator -p 8080:80 qmkfm/qmk_configurator:latest

### Building The Docker Image

Most of the time you don't need to do this, you can use volume mounts as described above to use the pre-built image with your local tree. 

If for some reason you do need to build it yourself, you can use this command:

    docker build -t qmk_configurator .

This process will take a while. You may want to go make some tea or something. When it finishes you can run it with this command:

    docker run -p 8080:80 qmk_configurator
    
## Internationalization Guide

Please refer to [this document](internationalization_guide.md)
