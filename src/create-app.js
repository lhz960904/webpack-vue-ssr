import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App'
import createRouter from './router'
import createStore from './store'

Vue.use(Meta)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
