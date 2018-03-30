import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({})// 这里你可能已经有其他 module
store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false,
    deviceCode: '', // 电桩二维码的编号
    code: '', // 扫码进来时的code
    userName: '', // 用户名
    userImg: '', // 用户头像
    userPhone: '', // 用户手机号
    balance: '' // 账户余额
  },
  mutations: {
    // 加载中
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    // deviceCode
    deviceCodeMua (state, payload) {
      state.deviceCode = payload.deviceCode
    },
    // code
    codeMua (state, payload) {
      state.code = payload.code
    },
    // 余额
    balance (state, payload) {
      state.balance = payload.myMoney
    }

  },
  getters: {
    deviceCode: (state) => {
      return state.deviceCode
    },
    code: (state) => {
      return state.code
    },
    balance: (state) => {
      return state.balance
    }
  },
  actions: {
    acbalance (context, payload) {
      context.commit('balance', payload)
    },
    acdeviceCode (context, payload) {
      context.commit('deviceCodeMua', payload)
    },
    acCode (context, payload) {
      context.commit('codeMua', payload)
    }

  }

})

export default store
