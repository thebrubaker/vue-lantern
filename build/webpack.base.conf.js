var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack")

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.tsv'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'bootstrap': resolve('src/bootstrap'),
      'app': resolve('src/bootstrap/app'),
      'drivers': resolve('src/app/drivers'),
      'providers': resolve('src/app/providers'),
      'services': resolve('src/app/services'),
      'store': resolve('src/store'),
      'routes': resolve('src/routes'),
      'layouts': resolve('src/resources/layouts'),
      'middleware': resolve('src/middleware'),
      'utilities': resolve('src/utilities'),
      'config': resolve('src/config'),
      'assets': resolve('src/assets'),
      'src': resolve('src')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      'config': resolve('src/utilities/config'),
      'error': resolve('src/utilities/error'),
      'env': resolve('src/utilities/env'),
      'process.env': resolve('.env.json')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
