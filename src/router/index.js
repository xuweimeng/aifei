import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const List = () => import('@/view/list/list')
const myAccount = () => import('@/view/myAccount/myAccount')
// const charge = () => import('@/view/charge/charge')
const recharge = () => import('@/view/recharge/recharge')
const buyCard = () => import('@/view/buyCard/buyCard')
const cardBind = () => import('@/view/cardBind/cardBind')
const charging = () => import('@/view/charging/charging')
const chargeRecord = () => import('@/view/chargeRecord/chargeRecord')
const chargeMeal = () => import('@/view/chargeMeal/chargeMeal')
const bindMobile = () => import('@/view/bindMobile/bindMobile')
const collection = () => import('@/view/collection/collection')
const modifyNickname = () => import('@/view/myAccount/modifyNickname/modifyNickname')
const powerDetails = () => import('@/view/nearPower/powerDetails/powerDetails')
const pay = () => import('@/view/nearPower/pay/pay')
const paySuccess = () => import('@/view/nearPower/pay/paySuccess')
const chargeNum = () => import('@/view/charge/chargeNum/chargeNum')

export default new Router({
  mode: 'history',
  // base: '/app/',
  routes: [
    {
      path: '/',
      // redirect: '/powerDetails'
      component: List
    },
    {
      path: '/list',
      component: List,
      meta: { title: '首页' }
    },
    {
      path: '/myAccount',
      component: myAccount,
      name: 'myAccount',
      children: [
        {
          path: 'modifyNickname',
          component: modifyNickname,
          name: 'modifyNickname',
          meta: { title: '修改密码' }
        }
      ]
    },
    {
      path: '/chargeNum',
      component: chargeNum,
      name: 'chargeNum',
      meta: { title: '充值' }
      // children: [{
      //   path: 'chargeNum',
      //   component: chargeNum,
      //   name: 'chargeNum',
      //   meta: { title: '充值' }
      // }]
    },
    {
      path: '/recharge',
      component: recharge,
      name: 'recharge'
    },
    {
      path: '/bindMobile',
      component: bindMobile,
      name: 'bindMobile',
      meta: { title: '绑定手机号' }
    },
    {
      path: '/buyCard',
      component: buyCard,
      name: 'buyCard'
    },
    {
      path: '/cardBind',
      component: cardBind,
      name: 'cardBind'
    },
    {
      path: '/charging',
      component: charging,
      name: 'charging',
      meta: { title: '充值记录' }
    },
    {
      path: '/chargeRecord',
      component: chargeRecord,
      name: 'chargeRecord'
    },
    {
      path: '/chargeMeal',
      component: chargeMeal,
      name: 'chargeMeal'
    },
    // {
    //   path: '/nearPower',
    //   component: nearPower,
    //   name: 'nearPower',
    //   children: [
    //     {
    //       path: 'powerDetails',
    //       component: powerDetails,
    //       name: 'powerDetails',
    //       children: [
    //         {
    //           path: 'pay',
    //           component: pay,
    //           name: 'pay'
    //         }
    //       ]
    //    }
    //   ]
    // },
    {
      path: '/collection',
      component: collection,
      name: 'collection'
    },
    {
      path: '/powerDetails',
      component: powerDetails,
      name: 'powerDetails',
      meta: { title: '充电信息' },
      children: [
        {
          path: 'pay/:id',
          component: pay,
          name: 'pay',
          meta: { title: '充电' }
        },
        {
          path: 'paySuccess',
          component: paySuccess,
          name: 'paySuccess',
          meta: { title: '支付成功' }
        }
      ]
    }
  ]
})
