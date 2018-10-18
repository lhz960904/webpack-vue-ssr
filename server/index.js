const Koa = require('koa')
const path = require('path')
const chalk = require('chalk')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('../build/setup-dev-server')

const app = new Koa()
const router = new Router()

app.use(async (ctx, next) => {
  try {
    console.log(chalk.cyan(`request with path ${ctx.path}`))
    await next()
  } catch (error) {
    console.log(chalk.red(error))
    ctx.status = 500
    ctx.body = error.message
  }
})

let renderer

const templatePath = path.resolve('../index.template.html')

setupDevServer(app, templatePath, (bundle, options) => {
  createBundleRenderer(bundle, {
    runInNewContext: false
  })
  }
)





const render = async (ctx, next) {
  ctx.set('Content-Type', 'text/html')

  const handleError = err => {
    if (err.url) {
      ctx.redirect(err.url)
    } else if (err.code === 404) {
      ctx.status = 404
      ctx.body = '404 Page Not Found'
    } else {
      ctx.status = 500
      ctx.body = '500 Internal Server Error'
      // console.error(`error during render : ${req.url}`)
      // console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue-SSR-Demo',
    url: ctx.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    ctx.body = html
  })
}

router.get('*', isProd ? render: () => {
  readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(chalk.green(`server started at localhost:${port}`))
})
