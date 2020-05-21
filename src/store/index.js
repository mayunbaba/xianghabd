import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    userInfo: {},
    token: {}
  },

  actions: {

  },

  mutations: {
    setUserInfo(state, payload) {
      Vue.set(state, 'userInfo', payload);
    },

    setToken(state, payload) {
      Vue.set(state, 'token', payload);
    }
  },


})