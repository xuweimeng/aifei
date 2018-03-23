import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const List = () => import('@/view/list/list')
const myAccount = () => import('@/view/myAccount/myAccount')
const charge = () => import('@/view/charge/charge')
const recharge = () => import('@/view/recharge/recharge')
const buyCard = () => import('@/view/buyCard/buyCard')
const cardBind = () => import('@/view/cardBind/cardBind')
const charging = () => import('@/view/charging/charging')
const chargeRecord = () => import('@/view/chargeRecord/chargeRecord')
const chargeMeal = () => import('@/view/chargeMeal/chargeMeal')
const nearPower = () => import('@/view/nearPower/nearPower')
const collection = () => import('@/view/collection/collection')
const modifyNickname = () => import('@/view/myAccount/modifyNickname/modifyNickname')
const powerDetails = () => import('@/view/nearPower/powerDetails/powerDetails')
const pay = () => import('@/view/nearPower/pay/pay')
const chargeNum = () => import('@/view/charge/chargeNum/chargeNum')

export default new Router({
  routes: [
    {
      path: '/list',
      component: List,
      name: 'List'
      // redirect: 'list'
    },
    {
      path: '/myAccount',
      component: myAccount,
      name: 'myAccount',
      children: [
        {
          path: 'modifyNickname',
          component: modifyNickname,
          name: 'modifyNickname'
        }
      ]
    },
    {
      path: '/charge',
      component: charge,
      name: 'charge',
      children: [{
        path: 'chargeNum',
        component: chargeNum,
        name: 'chargeNum'
      }]
    },
    {
      path: '/recharge',
      component: recharge,
      name: 'recharge'
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
      name: 'charging'
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
    {
      path: '/nearPower',
      component: nearPower,
      name: 'nearPower',
      children: [
        {
          path: 'powerDetails',
          component: powerDetails,
          name: 'powerDetails',
          children: [
            {
              path: 'pay',
              component: pay,
              name: 'pay'
            }
          ]
        }
      ]
    },
    {
      path: '/collection',
      component: collection,
      name: 'collection'
    }
  ]
})
