const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const createVueLoaderOptions = require('./vue-loader.conf')

const resolve = dir => path.resolve(__dirname, '..', dir)
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.(vue|js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      }
    ]
  },
  resolve: {
    alias: {
      'components': resolve('src/components'),
      'assets': resolve('src/assets')
    },
    extensions: ['.js', '.vue'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('index.html')
    })
  ]
}
