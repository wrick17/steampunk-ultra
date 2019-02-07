// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  allChunks: true,
  disable: process.env.NODE_ENV === "development"
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
    },
  },
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      // add your custom rules.
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          }, {
            loader: "sass-loader"
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
  },
};
