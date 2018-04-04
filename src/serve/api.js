import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

/* 默认请求axio */
Vue.prototype.$http = axios

/* 默认请求地址 */
axios.defaults.baseURL = 'http://120.79.223.147:80/'

/* 默认最长响应时间 */
// axios.defaults.timeout = 500

/* 添加请求拦截器 */
axios.interceptors.request.use(function (config) {
  config.data = qs.stringify(config.data)
  // 在发送请求之前做些什么
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

/* 返回一个Promise(发送post请求) */
function fetch (type, url, params) {
  return new Promise((resolve, reject) => {
    if (type === 'get') {
      axios.get(url, {
        params: params
      })
    .then(response => {
      if (typeof (response.data) === 'object') {
        resolve(JSON.stringify(response.data))
      } else {
        resolve(JSON.parse(response.data))
      }
    }, err => {
      reject(err)
    })
    .catch((error) => {
      reject(error)
    })
    } else {
      axios.post(url, params)
    .then(response => {
      resolve(JSON.parse(response.data))
    }, err => {
      reject(err)
    })
    .catch((error) => {
      reject(error)
    })
    }
  })
}

/** 活动通知 *****/
export const powerDetails = {
  /*
  *获取列表
  */
  getDeviceInfo (data) {
    return fetch('post', '/api/getDeviceInfo', data)
  },
  /*
  *支付方式详情接口
  */
  payList (data) {
    return fetch('post', '/api/getChargeInfo', data)
  },
  /*
  *查询我的接口,所有信息展示
  */
  getmyinfo (data) {
    return fetch('post', '/api/getmyinfo', data)
  },
  /*
  *创建订单接口
  */
  createOrder (data) {
    return fetch('post', '/api/createOrder', data)
  },
  /*
  *获取微信jssdk配置信息
  */
  config (data) {
    return fetch('get', '/api/config', data)
  },
  /*
  *获取微信openId
  */
  getOpenId (data) {
    return fetch('post', '/api/getOpenid', data)
  },
  /*
  *获取微信pay
  */
  wxPay (data) {
    return fetch('post', '/api/pay', data)
  },
  /*
  *微信充值
  */
  createOrdeCz (data) {
    return fetch('post', '/api/createOrdeCz', data)
  },
  /*
  *充值记录
  *chargeTypr:0:充电2充值
  */
  getMyChargeListInfo (data) {
    return fetch('post', '/api/getMyChargeListInfo', data)
  },
  /*
  *获取充值面额
  */
  getRechargeConfig (data) {
    return fetch('post', '/api/getRechargeConfig', data)
  },
  /*
  *获取验证码
  */
  sendPhoneCode (data) {
    return fetch('post', '/api/sendPhoneCode', data)
  },
  /*
    *获取验证码
    */
  bindPhone (data) {
    return fetch('post', '/api/bindPhone', data)
  }
}
