import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// try {
  
  
// } catch (e) { }


let token = {},userInfo={};
try{
    if(localStorage.token){
      token=JSON.parse(localStorage.token)
    }
    if(localStorage.userInfo){
      userInfo=JSON.parse(localStorage.userInfo)
    }
} catch (e){
  console.log(e);
}

export default new Vuex.Store({

  state: {
    userInfo: userInfo,
    token: token,
    scroll: {},
  },

  actions: {

  },

  mutations: {
    setUserInfo(state, payload) {
      localStorage.userInfo = JSON.stringify(payload);
      Vue.set(state, 'userInfo', payload);
    },

    setToken(state, payload) {
      localStorage.token = JSON.stringify(payload);
      Vue.set(state, 'token', payload);
    },
    setScroll(state, payload) {
      Vue.set(state.scroll, payload.key, payload.value);
    }
  },


})