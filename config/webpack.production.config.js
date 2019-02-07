const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const workboxPlugin = require('workbox-webpack-plugin');
const common = require('./webpack.common');
const merge = require('webpack-merge');

const prodSpecifics = {
  entry: {
    app: [
      './src/index.prod.js'
    ],
  },
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'react-redux': 'preact-redux',
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin([path.resolve('./dist')], {
      root: path.resolve('./'),
      verbose: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJSPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
    new CompressionPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve('./assets/static'),
      to: path.resolve('./dist')
    }]),
  ],
  devtool: "cheap-module-source-map"
};


const productionConfig = merge(common, prodSpecifics);

module.exports = productionConfig;
