const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
// const ExtractTextPlugin = require("extract-text-webpack-plugin")
const VueServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  target: 'node',
  entry: path.resolve(__dirname, '../src/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-rentry.js',
    path: path.resolve(__dirname, '../server-dist')
  },
  devtool: 'source-map',
  // https://vue-loader.vuejs.org/zh/migrating.html#%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E7%9A%84%E4%BE%9D%E8%B5%96%E6%8E%92%E9%99%A4
  externals: Object.keys(require('../package.json').dependencies),
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
  plugins: [
    new ExtractTextPlugin('styles.[hash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})
