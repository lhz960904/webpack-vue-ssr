import Vue from 'vue'
import createRouter from './router'
import createStore from './store'
import App from './App'

const router = createRouter()
const store = createStore()

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
