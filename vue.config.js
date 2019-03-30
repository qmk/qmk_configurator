const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

global.appRoot = path.resolve(__dirname);
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '.' : '/',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      if (fs.existsSync(global.appRoot + '/ga-production.js')) {
        console.log(global.appRoot);
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            /\.\/ga-development/,
            './ga-production'
          )
        );
      } else {
        console.warn(
          'WARNING: no ga-production.js file found. Using development'
        );
      }
    }
  }
};
