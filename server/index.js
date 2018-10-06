const Koa = require('koa')
const send = require('koa-send')
const app = new Koa()
const path = require('path')
const staticRouter = require('./routes/static')

const isDev = process.env.NODE_ENV === 'development'

app.use(staticRouter.routes())
  .use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routes/dev.ssr')
} else {
  pageRouter = require('./routes/ssr')
}

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', path.resolve(__dirname, '../'))
  } else {
    await next()
  }
})

app.use(pageRouter.routes())
  .use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
