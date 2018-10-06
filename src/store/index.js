import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount (state, num) {
        state.count = num
      }
    }
  })
}
