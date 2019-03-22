const webpack = require('webpack');
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '.' : '/',
  configureWebpack: config => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /\.\/ga-development/,
        './ga-production'
      )
    );
  }
};
