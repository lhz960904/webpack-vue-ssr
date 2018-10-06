import Vue from 'vue'
import VueRouter from 'vue-router'
import A from 'components/A'
import Test from 'components/Test'

Vue.use(VueRouter)

export default () => {
  return new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    scrollBehavior (to, from, savePosition) {
      if (savePosition) {
        return savePosition
      }
      return { x: 0, y: 0 }
    },
    routes: [
      {
        path: '/',
        redirect: '/a'
      },
      {
        path: '/test',
        name: 'Test',
        component: Test
      },
      {
        path: '/a',
        name: 'A',
        component: A
      }
    ]
  })
}
