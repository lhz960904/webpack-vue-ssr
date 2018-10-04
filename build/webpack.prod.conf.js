const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = merge(baseConfig, {
  output: {
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            'postcss-loader',
            'stylus-loader'
          ]
        })
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
})
