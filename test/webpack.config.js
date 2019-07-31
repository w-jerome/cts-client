const webpack = require('webpack');
const path = require('path');
require('dotenv').config()

let config_es6 = {
  mode: 'development',
  entry: path.resolve(__dirname, 'assets/js/src/es6.js'),
  output: {
    path: path.resolve(__dirname, 'assets/js/dist'),
    filename: './es6.js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      API_KEY: process.env.API_KEY,
    }),
  ],
};

let config_es5 = {
  mode: 'development',
  entry: path.resolve(__dirname, 'assets/js/src/es5.js'),
  output: {
    path: path.resolve(__dirname, 'assets/js/dist'),
    filename: './es5.js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      API_KEY: process.env.API_KEY,
    }),
  ],
};

module.exports = [config_es6, config_es5];
