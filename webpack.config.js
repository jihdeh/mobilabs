// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

const AssetsPlugin = require("assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

let devtool, loaders;
if (process.env.NODE_ENV === "development") {
  loaders = ["react-hot-loader/webpack", "babel-loader", "babel"];
  devtool = "cheap-module-eval-source-map";
} else {
  devtool = "cheap-module-source-map";
  loaders = ["babel"];
}

module.exports = {
  devtool: devtool,
  entry: {
    app: ["babel-polyfill", "./app/client.js"]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    preLoaders: [
      { test: /\.json$/, loader: "json" },
    ],
    loaders: [{
      test: /\.js$/,
      loaders: loaders,
      exclude: /node_modules/
    }]
  },
  plugins: (process.env.NODE_ENV === "production" ? [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	] : []).concat([
		new CleanWebpackPlugin([path.join("dist", "js")]),
		new webpack.optimize.LimitChunkCountPlugin({maxChunks: 2}),

		// Emit a file with assets paths
		// https://github.com/sporto/assets-webpack-plugin#options
		new AssetsPlugin({
			path: path.resolve(__dirname, "dist", "js"),
			filename: "chunks.json",
			processOutput: x => JSON.stringify(x)
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ar/)
	])
};
