const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var commonConfig = {
  entry: path.resolve(__dirname + '/src/Paginator.vue'),
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'laravue-paginator.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!less!css'
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};


module.exports = [
    // Config 1: For browser environment
    merge(commonConfig, {
      entry: path.resolve(__dirname + '/src/plugin.js'),
      output: {
        filename: 'laravue-paginator.min.js',
        libraryTarget: 'window',
        library: 'LaravuePaginator'
      }
    }),

    // Config 2: For Node-based development environments
    merge(commonConfig, {
      entry: path.resolve(__dirname + '/src/Paginator.vue'),
      output: {
        filename: 'laravue-paginator.js',
        libraryTarget: 'umd',
        library: 'laravue-paginator',
        umdNamedDefine: true
      }
    })
  ];