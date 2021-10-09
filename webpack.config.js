const path = require("path");
const SRC_DIR = path.join(__dirname, "/client/src/index.jsx");
const DIST_DIR = path.join(__dirname, "/client/dist");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const WebpackCompressionPlugin = require("compression-webpack-plugin");
// const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

// let devMode = process.env.devMode || true;

module.exports = {
  mode: "production",
  entry: SRC_DIR,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

    ],
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  // plugins: [
  //   new CompressionPlugin(),
  //   new BundleAnalyzerPlugin()
  // ],
};