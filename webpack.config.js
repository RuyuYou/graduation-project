'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToBootstarp = path.resolve(node_modules, 'bootstrap/dist/');

var config = {
  entry: {
    'index': './client/src/index.js',
    'vendors': ['bootstrap.css', 'react', 'react-dom', 'font-awesome.css']
  },
  output: {
    path: __dirname + '/public/',
    filename: '[chunkhash:8].[name].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    loaders: [

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=10000&name=/build/[name].[ext]'
      }
    ],
    noParse: [pathToBootstarp]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new ExtractTextPlugin('[chunkhash:8].[name].css'),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  ],
  resolve: {
    alias: {
      'bootstrap.css': 'bootstrap/dist/css/bootstrap.min.css',
      'font-awesome.css': 'font-awesome/css/font-awesome.min.css',
      'bootstrap.js': 'bootstrap/dist/js/bootstrap.min.js',
      'ie': 'component-ie'
    }
  }
};

function htmlwebpackPluginBuilder(fileName, deps) {
  return new HtmlwebpackPlugin({
    filename: fileName,
    minify: {collapseWhitespace: true},
    template: __dirname + '/client/' + fileName,
    inject: true,
    chunks: deps
  });
}

config.plugins.push(htmlwebpackPluginBuilder('index.html', ['vendors', 'index']));

module.exports = config;
