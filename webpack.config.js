const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// var DashboardPlugin = require('webpack-dashboard/plugin');

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.js'
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
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              outputPath: 'images/'
            }
          },
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('./index.html')
    })
  ],
  optimization: {
    
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    clientLogLevel: 'none',
    host: '0.0.0.0',
    port: 8080,
    hot: true
  }
}