import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import VueRouter from 'vue-router'
import App from './App'
import { WechatPlugin, AjaxPlugin } from 'vux'
import store from './store'
import './config/rem'
import getQueryString from './config/getUrl'

Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(VueRouter)
// console.log(Vue.http)

FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.getUrl = getQueryString

// console.log(Vue.wechat)
router.beforeEach(function (to, from, next) {
  // 获取当前的url后面的参数
  let deviceCode = getQueryString('deviceCode')
  let code = getQueryString('code')

  store.dispatch('acdeviceCode', {
    deviceCode: deviceCode
  })
  store.dispatch('acCode', {
    code: code
  })
  // location.href = window.location.href.split('/')[3]
  // 为每个页面添加一个title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  store.commit('updateLoadingStatus', { isLoading: true })
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', { isLoading: false })
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
