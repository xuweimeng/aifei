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

FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.getUrl = getQueryString

console.log(Vue.wechat)
router.beforeEach(function (to, from, next) {
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
