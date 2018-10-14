import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      count: 0
    },
    actions: {
      fetchCount ({ commit }, id) {
        return new Promise((resolve, reject) => {
          resolve(id)
        }).then(res => {
          commit('updateCount', res)
        })
      }
    },
    mutations: {
      updateCount (state, num) {
        state.count = num
      }
    }
  })
}
