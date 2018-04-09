import 'babel-polyfill'
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import VueRouter from 'vue-router'
import App from './App'
import { WechatPlugin, AjaxPlugin, cookie } from 'vux'
import store from './store'
import './config/rem'
import getQueryString from './config/getUrl'
import getGlobal from 'system.global'
const global = getGlobal()

Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(cookie)
Vue.use(VueRouter)

FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.getUrl = getQueryString
console.log(window.location.search.substr(1))
global.browserQuery = {
  code: getQueryString('code'),
  deviceCode: getQueryString('deviceCode'),
  page: getQueryString('page')
}

if (global.browserQuery.page.includes('deviceCode')) {
  let arr1 = global.browserQuery.page.split('/')
  global.browserQuery.page = arr1[0]
  global.browserQuery.deviceCode = arr1[1].substring(11, arr1[1].length)
}
Vue.wechat.closeWindow()
console.log(Vue.wechat)
cookie.set('code', global.browserQuery.code)
router.beforeEach(function (to, from, next) {
  if (global.browserQuery.page === 'list') {
    window.addEventListener('popstate', function (e) {
      // alert('我监听到了浏览器的返回按钮事件啦') // 根据自己的需求实现自己的功能
      // Vue.wechat.closeWindow()
      window.opener = null
    }, false)
  }
  console.log('deviceCode=' + global.browserQuery.deviceCode)
  console.log('code=' + global.browserQuery.code)
  if (global.browserQuery.deviceCode && global.browserQuery.code) {
    console.log('我是router.beforeEach')
    console.log(global.browserQuery.page)
    cookie.remove('code')
    cookie.set('deviceCode', global.browserQuery.deviceCode)
    cookie.set('code', global.browserQuery.code)
    store.dispatch('acdeviceCode', {
      deviceCode: global.browserQuery.deviceCode
    })
    store.dispatch('acCode', {
      code: global.browserQuery.code
    })
    delete global.browserQuery.deviceCode
    if (to.meta.title) {
      document.title = to.meta.title
    }
    store.commit('updateLoadingStatus', { isLoading: true })
    console.log(global.browserQuery.page)
    next('/')
  }
  next()
})

router.afterEach(function (to) {
  console.log('我是router.afterEach')
  console.log(global.browserQuery)
  store.commit('updateLoadingStatus', { isLoading: false })
  if (global.browserQuery.page) {
    let p = global.browserQuery.page
    global.browserQuery = {}
    console.log(p)
    router.push(p)
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
