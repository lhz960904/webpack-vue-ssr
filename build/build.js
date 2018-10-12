const ora = require('ora') // 优雅的
const rm = require('rimraf') // 执行删除操作 相当于 rm -rf
const path = require('path')
const chalk = require('chalk') // 控制台字符串颜色
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...').start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err

  webpack(webpackConfig, (err, stats) => {
    spinner.stop()

    // 输出到控制台
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // 编译错误不在 err 对象内，而是需要使用 stats.hasErrors() 单独处理
    if (stats.hasErrors()) {
      console.log(chalk.red('Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('Build complete.\n'))
  })
})
