// import Vue from 'vue'
// import config from './../../config'
import { getUserInfo } from './../api/common'
const state = {
  info: {}
}
const actions = {
  getUserInfo: function ({ commit }) {
    getUserInfo().then((result) => {
      let { userType } = result.data
      if (userType === 0 || userType === 1) {
        // 0 子账号 1、超级
        result.data.role = 0 // 平台
      } else if (userType === 2 || userType === 3) {
        result.data.role = 1 // 商户
      } if (userType === 1 || userType === 3) {
        result.data.isSuper = true // 超管
      } else if (userType === 0 || userType === 2) {
        result.data.isSuper = false
      }
      result.data.permission = result.data.permission.map(res => {
        return res.id
      })
      console.log(result.data)
      commit('getUserInfo', result.data)
    })
  }
}
const mutations = {
  getUserInfo: function (state, data) {
    state.info = data
  }
}
export default {
  state,
  actions,
  mutations
}
