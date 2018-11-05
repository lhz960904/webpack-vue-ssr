import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      movie: {}
    },
    actions: {
      fetchMovie ({ commit }, id) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ id })
          }, 500)
        }).then(res => {
          commit('setMoive', { res })
        })
      }
    },
    mutations: {
      setMoive (state, { res }) {
        Vue.set(state, 'movie', res)
      }
    }
  })
}
