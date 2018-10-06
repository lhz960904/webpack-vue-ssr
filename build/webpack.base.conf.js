const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const createVueLoaderOptions = require('./vue-loader.conf')
const VueclientPlugin = require('vue-server-renderer/client-plugin')

const resolve = dir => path.resolve(__dirname, '..', dir)
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: resolve('src/client-entry.js'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.[hash:8].js',
    publicPath: 'http://127.0.0.1:8080/'
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
      'vue': resolve('node_modules/vue/dist/vue.js'),
      'components': resolve('src/components'),
      'assets': resolve('src/assets')
    },
    extensions: ['.js', '.vue'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new VueclientPlugin()
  ]
}
