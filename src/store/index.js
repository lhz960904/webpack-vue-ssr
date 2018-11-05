import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      movie: {}
    },
    actions: {
      fetchMovie ({ commit }, id) {
        // 26336252
        return axios.get(`http://api.douban.com/v2/movie/${id}`)
          .then(res => {
            commit('setMoive', { res })
          })
      }
    },
    mutations: {
      setMoive (state, { res }) {
        Vue.set(state, 'movie', res.data)
      }
    }
  })
}
