const ejs = require('ejs')
module.exports = async (ctx, renderer, temp) => {
  ctx.headers['ContentType'] = 'text/html'

  const context = { url: ctx.path }

  try {
    const appString = await renderer.renderToString(context)

    const {
      title
    } = context.meta.inject()

    const html = ejs.render(temp, {
      appString,
      title: title.text(),
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })

    ctx.body = html
  } catch (error) {
    console.log('render error', error)
    throw error
  }
}
