const webpack = require('webpack');
const path = require('path');
require('dotenv').config()

let config = {
  mode: 'development',
  entry: path.resolve(__dirname, 'assets/js/src/app.js'),
  output: {
    path: path.resolve(__dirname, 'assets/js/dist'),
    filename: './app.js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      API_KEY: process.env.API_KEY,
    }),
  ],
};

module.exports = config;
