const Koa = require('koa')
const chalk = require('chalk')

const app = new Koa()

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

app.listen(3000)
