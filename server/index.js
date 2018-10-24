const fs = require('fs')
const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const send = require('koa-send')
const Router = require('koa-router')
const { createBundleRenderer, createRenderer } = require('vue-server-renderer')
const setupDevServer = require('../build/setup-dev-server')


const app = new Koa()
const router = new Router()

// app.use(async (ctx, next) => {
//   try {
//     console.log(chalk.cyan(`request with path ${ctx.path}`))
//     await next()
//   } catch (error) {
//     console.log(chalk.red(error))
//     ctx.status = 500
//     ctx.body = error.message
//   }
// })

let renderer
let readyPromise

const templatePath = path.resolve(__dirname, './index.template.html')
template = fs.readFileSync(templatePath, 'utf-8')
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

readyPromise = setupDevServer(app, templatePath, (bundle, options) => {
  const option = Object.assign({
    runInNewContext: false
  }, options)
  renderer = createBundleRenderer(bundle, option)
  }
)
// setupDevServer(app)


const render = async (ctx, next) => {

  // renderer = createBundleRenderer(serverBundle, {
  //   runInNewContext: false, // 推荐
  //   template, // （可选）页面模板
  //   clientManifest // （可选）客户端构建 manifest
  // })

  ctx.set('Content-Type', 'text/html')

  const handleError = err => {
    if (err.code === 404) {
      console.log('---------------')
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

// app.use(serve(__dirname, '/dist'))

router.get('/static/*', async (ctx, next) => {
  console.log(path.resolve(__dirname, '../dist'))
  await send(ctx, ctx.path, { root: __dirname + '/../dist' });
})

router.get('*', async (ctx, next) => {
  await readyPromise
  await render
})

app
  .use(router.routes())
  .use(router.allowedMethods())



const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(chalk.green(`server started at localhost:${port}`))
})
