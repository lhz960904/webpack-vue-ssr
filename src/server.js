const Koa = require('koa')
const path = require('path')
const createApp = require('/path/to/built-server-bundle.js')
const Router = require('koa-router')
// const renderer = require('vue-server-renderer').createRenderer({
//   template: require('fs').readFileSync(path.resolve(__dirname, '../index.template.html'), 'utf-8')
// })

const app = new Koa()
const router = new Router()

router.get('*', (ctx, next) => {

  // const app = createApp(ctx)

  const context = { title: '访问' + ctx.url }

  createApp(ctx).renderToString(app, context).then(html => {
    ctx.body = html
  }).catch(err => {
    ctx.status = err.code || 500
    switch (ctx.status) {
      case 404:
        ctx.body = 'Page not found'
        break
      case 500:
        ctx.body = 'Internal Server Error'
        break
    }
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000);
