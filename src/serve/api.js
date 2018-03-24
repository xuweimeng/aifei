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
    'Content-Type': 'application/x-www-form-urlencodedcharset=utf-8'
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
      resolve(JSON.parse(response.data))
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
  list (data) {
    return fetch('post', '/api/getDeviceInfo', data)
  }
}
