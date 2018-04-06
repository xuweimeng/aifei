<template>
  <div class="chargeNum fixPosition">
    <div class="chargeMoney">
      <p class="vux-1px-b">选择充值面额</p>
      <checker
        v-model="defaultChecker"
        default-item-class="demo4-item"
        selected-item-class="demo4-item-selected"
        class="checkerList">
          <checker-item
            v-for = "(item, index) in moneyList"
            :key ='index'
            :value="Number(index+1)" 
            @on-item-click="onItemClick2(item)"
          >
            {{item.getMoney}}元<br>
            <span class="spanText">售价:{{item.payMoney}}元</span>
          </checker-item>
        </checker>
    </div>
    <div class="goChargeBtn">
      <x-button @click.native="goChargeBtn" class="chargeBtn1">充值</x-button>
    </div>
  </div>
</template>

<script>
import { XButton, Checker, CheckerItem, cookie } from 'vux'
import { API } from '../../../serve/index'
export default {
  components: {
    XButton,
    Checker,
    CheckerItem
  },
  data () {
    return {
      defaultChecker: 1, // 默认选中的checker
      checkMoney: null, // 充值面值
      openid: '', // openid
      moneyList: [] // 活动充值面额
    }
  },
  mounted () {
    this.isOpenid()
    this.getRechargeConfig()
  },
  methods: {
    /** 立即充值 **/
    goChargeBtn () {
      this.createOrdeCz()
    },
    /** 如果从路由获取到openid，那么久不需要从接口获取了 **/
    isOpenid () {
      let getopenid = this.$route.query.openid
      if (getopenid) {
        this.openid = getopenid
      } else {
        this.getOpenId()
      }
    },
    /** 获取openid **/
    getOpenId () {
      API.powerDetails.getOpenId({
        'code': cookie.get('code')
      }).then((res) => {
        if (res.code === 0) {
          this.openid = res.data
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * @function getRechargeConfig
     * @description 获取充值面额
     */
    getRechargeConfig () {
      API.powerDetails.getRechargeConfig({
      }).then((res) => {
        if (res.code === 0) {
          this.moneyList = res.data
          // 请求道面值后，默认第一次不选时的充值面额
          this.checkMoney = res.data[0].payMoney
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /** 选择1元，2元，3元，4元 **/
    onItemClick2 (item) {
      this.checkMoney = item.payMoney
    },
    /** 创建订单 **/
    createOrdeCz () {
      API.powerDetails.createOrdeCz({
        'openid': cookie.get('openid'), // openid
        'chargeType': 3, // 按时按量首位
        'money': this.checkMoney
      }).then((res) => {
        if (res.code === 0) {
          console.log('hello')
          let url = 'http://www.mehuabei.com/api/paycz?money=' + this.checkMoney
          let state = res.orderNum
          let weixinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0ed984de0f8d5972&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect'
          console.log(weixinUrl)
          window.location.href = weixinUrl
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less">
@import '../../../styles/mixin.less';
@import '~vux/src/styles/1px.less';
  .chargeNum {
    background: #FBF9FE;
    //选择面值
    .chargeMoney {
      p {
        width: 14rem;
        margin-left: 1rem;
        line-height: 2rem;
        font-size: .8rem;

      }
    }
    //充值按钮
    .goChargeBtn {
      padding: 0.4rem;
      margin: 3rem auto 0;
      width: 96%;
      /* background: #efefef; */
      text-align: center;
      .chargeBtn1{
        background: #4e82d1!important;
        color: #fff;
        font-size: .8rem;
      }
    }
  }
  //默认按钮颜色
  .demo4-item {
    margin-top: .4rem;
    margin-left: .58rem;
    padding: .3rem 0;
    width: 4.5rem;
    color: #999;
    font-size: .7rem;
    background: #fff;
    border: 1px solid #999;
    text-align: center;
    border-radius: .2rem;
  }
  //选中按钮颜色
  .demo4-item-selected {
    color: #4e82d1;
    border-color: #4e82d1;
    position: relative;
    /* background: #4e82d1; */
  }
  .demo4-item-selected ::after {
    content: "";
    .wh(0, 0);
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100;
    border-top:1.2rem solid transparent;
    border-left:1.2rem solid transparent;
    border-right:1.2rem solid #0066cc;
  }
  .demo4-item-selected ::before {
    content: "✔";
    color: #fff;
    width: .8rem;
    height: .8rem;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }
  .spanText {
    font-size: .6rem;
  }
</style>
