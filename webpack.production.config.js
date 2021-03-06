const path = require('path');
const webpack = require('webpack');

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

module.exports = {
  entry: [`${__dirname}/src/index`],
  output: {
      path: `${__dirname}/dist`,
      publicPath: '/dist',
      filename: "index.js"
  },

  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extension: ['', '.js', '.css']
  },

  module: {
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

  plugins: [
    productionPlugin,
    new webpack.optimize.DedupePlugin(),
    uglifyPlugin
  ]
};
