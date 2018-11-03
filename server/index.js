const fs = require('fs')
const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const send = require('koa-send')
const Router = require('koa-router')
const { createBundleRenderer, createRenderer } = require('vue-server-renderer')
const setupDevServer = require('../build/setup-dev-server')

//  第 1 步：创建koa、koa-router 实例
const app = new Koa()
const router = new Router()

let renderer
const templatePath = path.resolve(__dirname, './index.template.html')

// 第 2步：根据环境变量生成不同BundleRenderer实例
if (process.env.NODE_ENV === 'production') {
  // 获取客户端、服务器端打包生成的json文件
  console.log('生产')
  const serverBundle = require('../dist/vue-ssr-server-bundle.json')
  const clientManifest = require('../dist/vue-ssr-client-manifest.json')
  // 赋值
  renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync(templatePath, 'utf-8'),
    clientManifest
  })
  // 静态资源
  router.get('/static/*', async (ctx, next) => {
    await send(ctx, ctx.path, { root: __dirname + '/../dist' });
  })
} else {
  console.log('开发')
  // 开发环境
  setupDevServer(app, templatePath, (bundle, options) => {
    console.log('重新bundle~~~~~')
    const option = Object.assign({
      runInNewContext: false
    }, options)
    renderer = createBundleRenderer(bundle, option)
  }
  )
}


const render = async (ctx, next) => {
  ctx.set('Content-Type', 'text/html')

  const handleError = err => {
    if (err.code === 404) {
      ctx.status = 404
      ctx.body = '404 Page Not Found'
    } else {
      ctx.status = 500
      ctx.body = '500 Internal Server Error'
      console.error(`error during render : ${ctx.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue-SSR-Demos',
    url: ctx.url
  }

  try {
    const html = await renderer.renderToString(context)
    ctx.body = html
  } catch (error) {
    handleError(error)
  }

}

router.get('*', render)

app
  .use(router.routes())
  .use(router.allowedMethods())



const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(chalk.green(`server started at localhost:${port}`))
})
