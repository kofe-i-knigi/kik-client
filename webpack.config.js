const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js'],
  output: {
      path: __dirname + "/dist",
      publicPath: "/dist",
      filename: "index.js"
  },

  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],

    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.css$/,
      exclude: /\.useable\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.useable\.css$/,
      loader: "style-loader/useable!css-loader"
    }]
  },

  devServer: {
    historyApiFallback: true,
    progress: true,
    stats: 'errors-only',
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  },

  plugins: [],

  eslint: {
    configFile: '.eslintrc'
  }
}
