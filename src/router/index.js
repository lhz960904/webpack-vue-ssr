import Vue from 'vue'
import VueRouter from 'vue-router'
import A from 'components/A/A'
import B from 'components/B/B'

Vue.use(VueRouter)

export default () => {
  return new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    routes: [
      {
        path: '/',
        redirect: '/a'
      },
      {
        path: '/a',
        name: 'A',
        component: A
      },
      {
        path: '/b',
        name: 'B',
        component: B
      }
    ]
  })
}
