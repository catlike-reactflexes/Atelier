const path = require("path");
const SRC_DIR = path.join(__dirname, "/client/src/index.jsx");
const DIST_DIR = path.join(__dirname, "/client/dist");

module.exports = {
  mode:"development",
  entry: SRC_DIR ,
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
};