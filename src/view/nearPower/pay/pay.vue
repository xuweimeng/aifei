<template>
  <div class="payPage fixPosition">
    <div class="payPage_over">
      <!-- 充电位置 -->
      <flexbox class="over_details" @click.native="ToDetails">
        <flexbox-item :span="1/5" class="czNo">
          <div class="circle">{{Portnum}}</div>
          <div class="circleText">插座号</div>
        </flexbox-item>
        <flexbox-item :span="3/5" class="czDz">
          <p class="czText1">{{deviceinfoEntity.adressdetail}}</p>
          <!-- <p class="czText2"><i class="iconfont">&#xe797;</i>海创路杭州捷瑞达科创路南79米</p> -->
          <p class="czText2"><i class="iconfont">&#xe797;</i>设备编号：{{deviceinfoEntity.devicenum}}</p>
          <p class="czText2"><i class="iconfont">&#xe797;</i>插座编号：{{Portnum}}</p>
        </flexbox-item>
        <flexbox-item :span="1/5" class="czXq">
          <div class="problem">?</div>
        </flexbox-item>
      </flexbox>
      <!-- 收费设置 -->
      <tab :line-width="2" default-color="#888" active-color="#5e88c0" custom-bar-width="3rem">
        <tab-item selected @on-item-click="onItemClick">按时收费</tab-item>
        <tab-item @on-item-click="onItemClick">按量收费</tab-item>
      </tab>
      <!-- 按时收费 -->
      <div class="over_byTime">
        <!-- 选择按钮 -->
        <div class="btns" v-if="tabIndex == 1">
          <checker
          v-model="defaultChecker"
          default-item-class="demo4-item"
          selected-item-class="demo4-item-selected">
            <checker-item
            v-for="(item, index) in chargeTypeList"
            :key="item.id"
            :value="index+1"
            @on-item-click="onItemClick2(item)">{{item.chargeName}}</checker-item>
          </checker>
        </div>
        <!-- 提示 -->
        <p class="tips1" v-if="tabIndex == 1">
          提示：大功率电瓶车按时收费可能会被拒充，建议使用按量收费。
        </p>
        <div class="tipe3" v-if="tabIndex == 2">
          <flexbox>
            <flexbox-item :span="1/4">
              <x-button class="manBtn">{{deviceinfoEntity.chargetype==1 || deviceinfoEntity.chargetype==3?'充满': '不支持充满'}}</x-button>
            </flexbox-item>
          </flexbox>
          <p>收费标准（按量收费）</p>
          <flexbox v-if="deviceinfoEntity.chargetype==1 || deviceinfoEntity.chargetype==3">
            <flexbox-item><p>0~100瓦</p><p>0.4元/小时</p></flexbox-item>
            <flexbox-item><p>100~200瓦</p><p>0.5元/小时</p></flexbox-item>
            <flexbox-item><p>200~400瓦</p><p>0.6元/小时</p></flexbox-item>
            <flexbox-item><p>400~600瓦</p><p>0.8元/小时</p></flexbox-item>
          </flexbox>
          <flexbox v-if="deviceinfoEntity.chargetype==2">
            <flexbox-item><p style="color: #f00"><strong>暂时不支持充满</strong></p></flexbox-item>
          </flexbox>
        </div>
        <p class="tips2" v-if="tabIndex == 1">提示：如发生过载引起意外中断、电池充满充电时间未到、插头被别人拔出等情况，充电剩余金额不予退还。</p>
        <p class="tips2" v-if="tabIndex == 2" style="padding-top: .5rem;">提示：插座意外断开，将返还剩余金额</p>
        <!-- 开始充电 -->
        <div class="startElerc">
          <x-button @click.native="startElerc" class="startElercBtn">开始充电</x-button>
        </div>
        <!-- 选择支付方式 -->
        <div class="payType">
          <p class="payTypeTl"><span>选择支付方式</span></p>
          <div>
            <checklist :title="zfType" :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
          </div>
        </div>
      </div>
    </div>
    <!-- 创建订单弹框 -->
    <alert v-model="showOrder" :title="提示">{{showOrderTxt}}</alert>
  </div>
</template>

<script>
import { Divider, Flexbox, FlexboxItem, Tab, TabItem, XButton, CheckIcon, Checklist, Checker, CheckerItem, Alert } from 'vux'
import { API } from '../../../serve/index'
// import '../../../config/jweixin-1.2.0'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Tab,
    TabItem,
    XButton,
    Divider,
    CheckIcon,
    Checklist,
    CheckerItem,
    Checker,
    Alert
  },
  data () {
    return {
      demo1: false,
      demo2: true,
      tabIndex: '1', // 1：按时收费，2：按量收费
      defaultChecker: 1, // 默认选中的checker
      zfType: '支付方式', // 支付方式标题
      commonList: [ '我的余额', '微信支付' ], // 支付方式选择栏
      radioValue: ['微信支付'], // 默认支付方式
      activeBtn: {
        color: '#fff',
        background: '#4e82d1'
      }, // 选中时的按钮颜色
      defaultBtn: {
        color: '#4e82d1',
        background: '#fff'
      }, // 选中时的按钮颜色
      Portnum: '', // 电桩插口号
      deviceinfoEntity: { // 设备信息
        id: '', // 设备的id
        adressdetail: '', // 设备地址
        devicenum: '', // 设备编号
        chargetype: '' // 2:按时，1：按量，3，按时+按量
      },
      chargeTypeList: [], // 按时收费金额
      deviceCode: '', // 电桩号
      code: '', // 公众号code
      payType: '', // 支付方式1:余额支付  2：微信支付
      btnInfo: { // 按时收费的id, chargeCode
        id: '',
        chargeCode: ''
      },
      openid: '', // 微信openid
      showOrder: false, // 是否支持按时或按量充电
      showOrderTxt: '', // 提示文本
      itemMoney: '' // 选择充值的金额
    }
  },
  computed: {
  },
  mounted () {
    this.getPayInfo()
    // this.getOpenId()
    // this.$nextTick(function () {
    this.getConfig()
    // })
  },
  methods: {
    /** 插口号详情 **/
    getPayInfo () {
      // 插口号
      this.Portnum = this.$route.params.id
      this.deviceCode = this.$route.query.deviceCode
      this.openid = this.$route.query.openid
      // 账户余额
      let balance = this.$store.state.vux.balance
      // console.log(this.$store.state.vux.balance)
      this.commonList[0] = ' 我的余额 ' + ' &nbsp;' + ' <span class="span"> ' + ' ( ' + balance + ' 元) ' + ' </apsn> '
      // 插口号收费方式等
      API.powerDetails.payList({
        'deviceCode': this.deviceCode,
        'Portnum': this.Portnum
      }).then((res) => {
        if (res.code === 0) {
          this.deviceinfoEntity = res.data.deviceinfoEntity
          this.chargeTypeList = res.data.chargeTypeList
          // 默认赋值选择的金额
          this.btnInfo.id = this.chargeTypeList[0].id
          this.btnInfo.chargeCode = this.chargeTypeList[0].chargeCode
          this.itemMoney = this.chargeTypeList[0].money // 默认充值金额
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /** 收费tab点击 **/
    onItemClick (index) {
      this.tabIndex = String(index + 1) // 1按量2按时
    },
    /** 开始充电 **/
    startElerc () {
      if (this.tabIndex === '1') {
        if (this.deviceinfoEntity.chargetype === '2' || this.deviceinfoEntity.chargetype === '3') {
          this.createOrderFun()
        } else {
          this.showOrder = true
          this.showOrderTxt = '暂时不支持按量充电'
        }
      } else if (this.tabIndex === '2') {
        if (this.deviceinfoEntity.chargetype === '1' || this.deviceinfoEntity.chargetype === '3') {
          this.createOrderFun()
        } else {
          this.showOrder = true
          this.showOrderTxt = '暂时不支持按时充电'
        }
      }
      // 按时收费
    },
    /** 创建订单 **/
    createOrderFun () {
      API.powerDetails.createOrder({
        'openid': this.openid, // 设备的code
        'Portnum': this.Portnum, // 插座好
        'chargeTypeId': this.btnInfo.id, // --------------------
        'deviceId': this.deviceinfoEntity.id, // 设备的id
        'paytype': this.payType, // 付款方式
        'chargeType': this.tabIndex, // 按时按量首位
        'chargeCode': this.btnInfo.chargeCode
      }).then((res) => {
        if (res.code === 0) {
          let url = 'http://www.mehuabei.com/api/paycz?money=' + this.itemMoney
          let state = res.orderNum
          let weixinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0ed984de0f8d5972&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect'
          console.log(weixinUrl)
          window.location.href = weixinUrl
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /** 选择支付方式 **/
    change (value, label) {
      if (label[0] === '微信支付') {
        this.payType = 2
      } else if (label[0] === undefined) {
        this.payType = ''
      } else {
        this.payType = 1
      }
    },
    /** 选择支付方式 **/
    tabClick (index) {
      //
    },
    /** 选择1元，2元，3元，4元 **/
    onItemClick2 (item) {
      console.log(item)
      this.itemMoney = item.money
      this.btnInfo.id = item.id
      this.btnInfo.chargeCode = item.chargecode
    },
    /** 获取微信openid **/
    // getOpenId () {
    //   API.powerDetails.getOpenId({
    //     'code': this.code
    //   }).then((res) => {
    //     console.log(res)
    //     this.openid = res.data
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // },
    /** 获取微信jssdk配置信息 **/
    getConfig () {
      let url = location.href.split('#')[0] // 获取锚点之前的链接
      API.powerDetails.config({
        'rurl': url
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    },
    /** 获取微信pay **/
    wxPay (test) {
      API.powerDetails.wxPay({
        'code': test,
        'money': '2',
        'state': '11'
      }).then((res) => {
        console.log(res)
        this.weixinPay(res.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    weixinPay (data) {
      console.log('test--------------pay的data')
      // pay(data)
      // function pay () {
      //   if (typeof WeixinJSBridge === 'undefined') {
      //     if (document.addEventListener) {
      //       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      //     } else if (document.attachEvent) {
      //       document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      //       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      //     }
      //   } else {
      //     onBridgeReady(data)
      //   }
      // }
      // function onBridgeReady (data) {
      //   console.log('test--------------pay的data')
      //   WeixinJSBridge.invoke(
      //     'getBrandWCPayRequest', {
      //       'appId': data.appid, // 公众号名称，由商户传入
      //       'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
      //       'nonceStr': data.nonceStr, // 随机串
      //       'package': data.packageValue,
      //       'signType': 'MD5', // 微信签名方式
      //       'paySign': data.paySign // 微信签名
      //     }, function (res) {
      //       if (res.err_msg === 'get_brand_wcpay_request:ok') {
      //         alert('微信支付成功!')
      //       } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
      //         alert('用户取消支付!')
      //       } else {
      //         alert('支付失败!')
      //       }
      //     })
      // }
    },
    /** 微信支付 **/
    weixinFun (res) {
      // res = eval('('+res+')')
      // res = JSON.parse(res)
      // this.$wechat.config({
      //   debug: true,
      //   appId: res.appId, // wx0ed984de0f8d5972
      //   timestamp: res.timestamp,
      //   nonceStr: res.nonceStr,
      //   signature: res.signature,
      //   jsApiList: [
      //     'chooseWXPay',
      //     'getNetworkType',
      //     'chooseImage'
      //   ]
      // })
      // 通过ready接口处理成功验证
      // this.$wechat.ready(function () {
      //   console.log(this.$wechat)
      //   this.$wechat.chooseImage({
      //     count: 1, // 默认9
      //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      //     success: function (res) {
      //       let localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //       alert('调取照片成功')
      //       console.log(localIds)
      //     },
      //     fail: function (res) {
      //       console.log(res)
      //     }
      //   })
      //   this.$wechat.getNetworkType({
      //     success: function (res) {
      //       var networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
      //       alert(' 设备信息 = ' + networkType)
      //     }
      //   })
      // })
      // 错误挫力
      // this.$wechat.error(function (res) {
      //   console.log(res)
      // })
    }

  },
  watch: {
    $route (to, from) {
      this.getConfig()
    }
  }
}
</script>

<style lang="less">
@import '../../../styles/mixin.less';
@import '../../../styles/iconfont.less';
  .payPage {
    z-index: 110;
    &_over {
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
      //充电位置详情
      .over_details {
        margin-bottom: .5rem;
        .wh(100%, 5.5rem);
        background: #fff;
        .vux-flexbox-item {
          margin-left: 0!important;
          height: 5rem;
        }
        //插座号
        .czNo {
            text-align: center;
          .circle {
            margin: 1rem auto 0;
            .wh(2rem, 2rem);
            background: #e70808;
            border-radius: 50%;
            text-align: center;
            line-height: 2rem;
            color: #fff;
          }
          .circleText {
            font-size: .75rem;
            line-height: 1.8rem;
            color: #000;
          }
        }
        //插座位置
        .czDz {
          .czText1 {
            padding-top: .4rem;
            font-size: .85rem;
            line-height: 1.5rem;
            color: #000;
          }
          .czText2 {
            padding-top: .2rem;
            font-size: .7rem;
            color: #a0a0a0;
            line-height: 0.8rem;
            .iconfont {
              padding-right: .4rem;
              color: #a0a0a0;
              font-size: .5rem;
            }
          }
        }
        //提示
        .czXq {
          .problem {
            margin: 1rem auto 0;
            .wh(2rem, 2rem);
            color: #fff;
            background: #f39330;
            font-size: 1rem;
            text-align: center;
            line-height: 2rem;
            border-radius: 50%;
          }
        }
      }
      .over_byTime {
        background: #fff;
        width: 100%;
        overflow-y: auto;
        //选择充值金额
        .btns {
          padding: .8rem .25rem 1rem;
        }
        //提示
        .tips1 {
          padding:0 .25rem;
          color: #c42510;
          font-size: 0.65rem;
          line-height: 1.2rem;
        }
        .tips2 {
          padding:0 .25rem .1rem;
          color: #b5b5b5;
          font-size: 0.6rem;
          line-height: 1rem;
        }
        //收费标准
        .tipe3 {
          p {
            font-size: .65rem;
            color: #666;
            text-indent: .2rem;
            line-height: 2rem;

          }
          .vux-flexbox .vux-flexbox-item {
            p{
              text-indent: .3rem;
              font-size: .6rem;
              color: #666;
              line-height: 1rem;
            }
            .manBtn {
              margin: 1rem .2rem 0;
              padding: .02rem 0;
              font-size: .6rem;
              color: #fff;
              background: #4e82d1;
            }
          }
        }
        //充电按钮
        .startElerc {
          margin: 0.4rem auto .4rem;
          width: 96%;
          background: #efefef;
          text-align: center;
          .startElercBtn{
            background: #4e82d1!important;
            color: #fff;
            font-size: .8rem;
          }
        }
        //选择支付方式
        .payType {
          .payTypeTl {
            padding-left: .3rem;
            font-size: .8rem;
            line-height: 2rem;
            border-bottom: 1px solid #efefef;
          }
        }
      }
    }
  }
  //默认按钮颜色
  .demo4-item {
    margin: 0 .1rem;
    padding: .2rem 0;
    width: 3.57rem;
    color: #4e82d1;
    font-size: .6rem;
    background: #fff;
    border: 1px solid #4e82d1;
    text-align: center;
    border-radius: .2rem;
  }
  //选中按钮颜色
  .demo4-item-selected {
    color: #fff;
    background: #4e82d1;
  }
  .span {
    color: #4e82d1;
    font-size: .7rem;
  }
  // 滚动条样式
  ::-webkit-scrollbar {  /* 滚动条整体部分 */
      width:0;
  }
  ::-webkit-scrollbar-button { /* 滚动条两端的按钮 */
      width:0;
      background-color: yellow;
  }
  ::-webkit-scrollbar:horizontal {
      height:0;
  }
  ::-webkit-scrollbar-track {  /* 外层轨道 */
      border-radius: 0;
  }
  ::-webkit-scrollbar-track-piece {  /*内层轨道，滚动条中间部分 */
      background-color: #333333;
      border-radius: 0;
  }
  ::-webkit-scrollbar-thumb {  /* 滑块 */
      width:0;
      border-radius: 5px;
      background: #CBCBCB;
  }
  ::-webkit-scrollbar-corner { /* 边角 */
      width: 0;
      background-color: red;
  }
  ::-webkit-scrollbar-thumb:hover { /* 鼠标移入滑块 */
      background: #909090;
  }
</style>
