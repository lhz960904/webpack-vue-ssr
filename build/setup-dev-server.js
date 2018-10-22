const fs = require('fs')
const path = require('path')
// memory-fs可以使webpack将文件写入到内存中，而不是写入到磁盘。
const MFS = require('memory-fs')
const webpack = require('webpack')
// 监听文件变化，兼容性更好(比fs.watch、fs.watchFile、fsevents)
const chokidar = require('chokidar')
const clientConfig = require('./webpack.dev.conf')
const serverConfig = require('./webpack.server.conf')
// webpack热加载需要
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
// 配合热加载实现模块热替换
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

// 读取vue-ssr-webpack-plugin生成的文件
const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
  } catch (e) {
    console.log(e)
  }
}

module.exports = function setupDevServer(app, templatePath, cb) {
  let bundle
  let template
  let clientManifest

  let ready
  const readyPromise = new Promise(r => { ready = r })

  // 监听改变后更新函数
  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }

  // 监听html模板改变
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    console.log('index.html template updated.')
    update()
  })

  // 修改webpack入口配合模块热替换使用
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]

  // 编译clinetWebpack 插入Koa中间件
  const clientCompiler = webpack(clientConfig)
  app.use(webpackDevMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath
    // noInfo: true
  }))

  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })

  // 插入Koa中间件(模块热替换)
  app.use(webpackHotMiddleware(clientCompiler))

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    //  vue-ssr-webpack-plugin 生成的bundle
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}

