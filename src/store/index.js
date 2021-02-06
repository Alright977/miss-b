import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/webStorage'
// import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 菜单按钮收放
    collapsed: false,
    // 用户登入信息
    token: getToken(),
    // 存储菜单的路由
    menuRoutes: [],
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed
    },
    userToken(state, role) {
      state.token = role
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes
    },
  },

  actions: {
    // 菜单按钮收放
    changeCollapsed({ commit }) {
      commit('changeCollapsed')
    },
    // 存储到用户appkey
    userToken({ commit }, role) {
      commit('userToken', role)
      setToken(role)
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes)
    },
  },
  modules: {},
})
