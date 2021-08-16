const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

global.appRoot = path.resolve(__dirname);
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '.' : '/',
  configureWebpack: (config) => {},
  chainWebpack: (config) => {
    config.module
      .rule('translations')
      .test(/\.csv$/)
      .use(path.resolve('scripts/i18n/loader.js'))
      .loader(path.resolve('scripts/i18n/loader.js'))
      .end();
  }
};
