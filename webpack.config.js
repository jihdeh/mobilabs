// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

const AssetsPlugin = require("assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");


var devtool, loaders;
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
    filename: "js/[id]-[chunkhash].js",
    chunkFilename: "js/[id]-[chunkhash].js"
  },
  module: {
    preLoaders: [
      { test: /\.json$/, loader: "json" },
    ],
    loaders: [{
      test: /\.js$/,
      loaders: loaders,
      exclude: /node_modules/
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 3, interlaced: false, pngquant:{quality: "30-40", speed: 1}}'
      ]
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
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
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
