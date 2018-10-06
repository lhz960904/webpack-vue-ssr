const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const VueServerRender = require('vue-server-renderer')
const serverRender = require('./server-render')

const clientManifest = require('../../dist/vue-ssr-client-manifest.json')
const renderer = VueServerRender.createBundleRenderer(
  path.join(__dirname, '../../server-dist/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const temp = fs.readFileSync(
  path.resolve(__dirname, '../server.template.ejs'),
  'utf-8'
)

const PageRouter = new Router()

PageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, temp)
})

module.exports = PageRouter
