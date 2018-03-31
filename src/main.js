import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import VueRouter from 'vue-router'
import App from './App'
import { WechatPlugin, AjaxPlugin } from 'vux'
import store from './store'
import './config/rem'
import getQueryString from './config/getUrl'
import getGlobal from 'system.global'
const global = getGlobal()

Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(VueRouter)
// console.log(Vue.http)

FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.getUrl = getQueryString

global.browserQuery = {
  code: getQueryString('code'),
  deviceCode: getQueryString('deviceCode'),
  page: getQueryString('page')
}
// router.beforeEach(function (to, from, next) {
//   console.log('deviceCode=' + global.browserQuery.deviceCode)
//   console.log('code=' + global.browserQuery.code)
//   if (global.browserQuery.deviceCode && global.browserQuery.code) {
//     console.log('我是router.beforeEach')
//     store.dispatch('acdeviceCode', {
//       deviceCode: global.browserQuery.deviceCode
//     })
//     store.dispatch('acCode', {
//       code: global.browserQuery.code
//     })
//     delete global.browserQuery.deviceCode
//     if (to.meta.title) {
//       document.title = to.meta.title
//     }
//     store.commit('updateLoadingStatus', { isLoading: true })
//     console.log(global.browserQuery.page)
//     next('/')
//   }
// })
router.beforeEach(function (to, from, next) {
  console.log('deviceCode=' + global.browserQuery.deviceCode)
  console.log('code=' + global.browserQuery.code)
  // if (global.browserQuery.deviceCode && global.browserQuery.code) {
  console.log('我是router.beforeEach')
  store.dispatch('acdeviceCode', {
    deviceCode: global.browserQuery.deviceCode
  })
  store.dispatch('acCode', {
    code: global.browserQuery.code
  })
  // delete global.browserQuery.deviceCode
  if (to.meta.title) {
    document.title = to.meta.title
  }
  store.commit('updateLoadingStatus', { isLoading: true })
  console.log(global.browserQuery.page)
  next()
  // }
})

// router.afterEach(function (to) {
//   console.log('我是router.afterEach')
//   store.commit('updateLoadingStatus', { isLoading: false })
//   if (global.browserQuery.page) {
//     let p = global.browserQuery.page
//     global.browserQuery = {}
//     router.push(p)
//   }
// })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
