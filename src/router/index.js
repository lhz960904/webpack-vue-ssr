import Vue from 'vue'
import VueRouter from 'vue-router'
const A = () => import('components/A/A')
const B = () => import('components/B/B')

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
