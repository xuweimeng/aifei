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
          <p class="czText2"><i class="iconfont">&#xe613;</i>设备编号：{{deviceinfoEntity.devicenum}}</p>
          <p class="czText2"><i class="iconfont">&#xe613;</i>插座编号：{{Portnum}}</p>
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
        <!-- 按量收费 -->
        <div class="tipe3" v-if="tabIndex == 2">
          <flexbox>
            <flexbox-item :span="1/4">
              <x-button class="manBtn">{{deviceinfoEntity.chargetype==1 || deviceinfoEntity.chargetype==3?'充满': '不支持充满'}}</x-button>
            </flexbox-item>
          </flexbox>
          <p>收费标准（按量收费）</p>
          <flexbox v-if="deviceinfoEntity.chargetype==1 || deviceinfoEntity.chargetype==3">
            <flexbox-item
            v-for="(item, index) in chargeTypeList1"
            :key="item.id"
            ><p>{{item.minw}}~{{item.maxw}}瓦</p><p>{{item.chargeName}}</p></flexbox-item>
          </flexbox>
          <flexbox v-if="deviceinfoEntity.chargetype==2">
            <flexbox-item><p style="color: #f00"><strong>暂时不支持充满</strong></p></flexbox-item>
          </flexbox>
        </div>
        <p class="tips2" v-if="tabIndex == 1">提示：如发生过载引起意外中断、电池充满充电时间未到、插头被别人拔出等情况，充电剩余金额不予退还。</p>
        <p class="tips2" v-if="tabIndex == 2" style="padding-top: .5rem;">提示：插座意外断开，将返还剩余金额</p>
        <!-- 开始充电 -->
        <div class="startElerc">
          <x-button 
          :disabled="disabled001"
          :show-loading = "showLoading"
          @click.native="startElerc" 
          class="startElercBtn">开始充电</x-button>
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
    <alert v-model="showOrder" title="提示">{{showOrderTxt}}</alert>
  </div>
</template>

<script>
import { Divider, Flexbox, FlexboxItem, Tab, TabItem, XButton, CheckIcon, Checklist, Checker, CheckerItem, Alert, cookie } from 'vux'
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
      commonList: ['1234'], // 支付方式选择栏
      radioValue: [], // 默认支付方式
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
      chargeTypeList1: [], // 按量收费金额
      deviceCode: '', // 电桩号
      code: '', // 公众号code
      payType: '1', // 支付方式1:余额支付  2：微信支付
      btnInfo: { // 按时收费的id, chargeCode
        id: '',
        chargeCode: ''
      },
      openid: '', // 微信openid
      showOrder: false, // 是否支持按时或按量充电
      showOrderTxt: '', // 提示文本
      itemMoney: '', // 选择充值的金额
      disabled001: false, // 开始充电按钮是否不可选
      showLoading: false // 开始充电按钮loading
    }
  },
  computed: {
  },
  mounted () {
    this.getMyInfo()
    this.getPayInfo()
  },
  methods: {
    /**
     * @description 获取我的余额
     * @function getMyInfo
     */
    getMyInfo () {
      let ccMoney = '我的余额：' + cookie.get('myMoney') + '元'
      this.commonList.length = 0
      if (this.tabIndex === '1') {
        this.commonList[0] = ccMoney
        this.commonList[1] = '微信支付'
      } else {
        this.commonList[0] = ccMoney
      }
      // 刷新后选中第一个
      this.$nextTick(function () {
        this.radioValue.push(ccMoney)
      })
    },
    /** 插口号详情 **/
    getPayInfo () {
      // 插口号
      this.Portnum = this.$route.params.id
      this.deviceCode = this.$route.query.deviceCode
      this.openid = cookie.get('openid')
      // 插口号收费方式等
      API.powerDetails.payList({
        'deviceCode': this.deviceCode,
        'Portnum': this.Portnum
      }).then((res) => {
        if (res.code === 0) {
          this.deviceinfoEntity = res.data.deviceinfoEntity
          // this.chargeTypeList = res.data.chargeTypeList
          res.data.chargeTypeList.forEach(item => {
            if (item.type === 1) {
              this.chargeTypeList.push(item)
            } else {
              this.chargeTypeList1.push(item)
            }
          })
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
      console.log(this.tabIndex)
      this.getMyInfo()
    },
    /** 开始充电 **/
    startElerc () {
      this.disabled001 = true
      this.showLoading = true
      if (this.tabIndex === '2') {
        if (this.deviceinfoEntity.chargetype === '2' || this.deviceinfoEntity.chargetype === '3') {
          this.createOrderFun()
        } else {
          this.showOrder = true
          this.showOrderTxt = '暂时不支持按量充电'
        }
      } else if (this.tabIndex === '1') {
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
        'openid': this.openid, // 设备的openid
        'portnum': this.Portnum, // 插座好
        'chargeTypeId': this.btnInfo.id, // --------------------
        'deviceId': this.deviceinfoEntity.id, // 设备的id
        'paytype': this.payType, // 付款方式
        'chargeType': this.tabIndex, // 按时按量首位
        'chargeCode': this.btnInfo.chargeCode
      }).then((res) => {
        this.disabled001 = false
        this.showLoading = false
        if (res.code === 0) {
          let url = 'http://www.mehuabei.com/api/paycz?money=' + this.itemMoney
          let state = res.orderNum
          let weixinUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0ed984de0f8d5972&redirect_uri=' + url + '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect'
          if (this.payType === 1) {
            this.showOrder = true
            this.showOrderTxt = res.message
            setTimeout(() => {
              this.showOrder = false
              this.$router.push({ path: '/powerDetails' })
            }, 1500)
          } else {
            window.location.href = weixinUrl
          }
        } else {
          this.showOrder = true
          this.showOrderTxt = res.message
        }
      }).catch((error) => {
        this.disabled001 = false
        this.showLoading = false
        console.log(error)
        this.showOrder = true
        this.showOrderTxt = error.message
      })
    },
    /** 选择支付方式 **/
    change (value, label) {
      if (label[0] === '微信支付') {
        this.payType = 2
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
      this.itemMoney = item.money
      this.btnInfo.id = item.id
      this.btnInfo.chargeCode = item.chargecode
    }
  }
}
</script>

<style lang="less">
@import '../../../styles/mixin.less';
// @import '../../../styles/iconfont.less';
  .payPage {
    z-index: 2000;
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
