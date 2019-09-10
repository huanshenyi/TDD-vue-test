import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    inputValue: ''
  },
  mutations: {
    changeInputValue (state, payLoad) {
      state.inputValue = payLoad
    }
  }
})

export default store
