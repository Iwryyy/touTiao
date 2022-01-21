import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))

    user: getItem('TOUTIAO_USER')
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(data))

      setItem('TOUTIAO_USER', data)
    }
  },
  actions: {},
  modules: {}
})
