import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('userInfo'))
  },
  getters: {

  },
  mutations: {
    SET_USER(state, param) {
      sessionStorage.setItem('userInfo', JSON.stringify(param))
      state.user = param
    }
  }
})

export default store