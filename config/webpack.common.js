const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const htmlConfig = {
  title: "Tools and Calculators",
  template: "./src/index.ejs",
  appMountId: "ctxToolCalculatorRoot",
  favicon: "./assets/images/favicon.png"
};

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  allChunks: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = {
  resolve: {
    alias: {
      images: path.resolve("./assets/images"),
      fonts: path.resolve("./assets/fonts"),
      constants: path.resolve("./assets/constants/constants.js"),
      containers: path.resolve("./src/containers"),
      components: path.resolve("./src/components"),
      common: path.resolve("./src/common"),
      reducers: path.resolve("./src/reducers"),
      sagas: path.resolve("./src/sagas"),
      node_modules: path.resolve("./src/node_modules"),
    },
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist/"),
    publicPath: "/",
    chunkFilename: '[name].js'
  },
  stats: {
    children: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin(htmlConfig),
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.js$/,
        use: [
          "babel-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: {
              modules: true,
              minimize: process.env.NODE_ENV === "production",
              localIdentName: '[local]' // [path][name]__[local]--[hash:base64:5]
            }
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.css$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: {
              minimize: process.env.NODE_ENV === "production"
            }
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader?name=images/[name].[ext]",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          "file-loader?name=assets/fonts/[name].[ext]",
        ],
      },
    ],
  }
};
