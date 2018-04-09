<template>
  <div class="powerDetails">
    <!-- 充电机位置 -->
    <div class="powerInfo">
      <flexbox class="powerList" @click.native="ToDetails">
        <flexbox-item  class="detailItem">
          <div class="position"><i class="iconfont">&#xe77e;</i>{{ powerMessage?powerMessage.adressdetail : '' }}</div>
          <!-- <div class="address">578m|科技大道西部科技园西365米</div> -->
        </flexbox-item>
        <flexbox-item :span="1/8">
          <!-- <div class="flex-demo">
            信号
          </div> -->
        </flexbox-item>
      </flexbox>
      <div class="bianhao"><span class="span1">编号：{{ powerMessage?powerMessage.devicenum : '' }}</span><span class="span2">{{ powerMessage?powerMessage.installtime : '' }}</span></div>
    </div>
    <!-- 充电机使用情况 -->
    <div class="electric">
      <div v-for="(item, index) in powerNumber" :key="index" class="pp" @click="goPayFun(item.info, index)">
        <div class="elekou rel" v-bind:class="[item.info == 3 || item.info == 4?chargeBorder2:chargeBorder1 ]">
          <div class="lines1 abs" v-bind:class="[item.info == 1?freeBackground:item.info == 2?(useingBackground):item.info == 3?disableBackground:item.info == 4?faultBackground:'']">
          </div>
          <div class="lines11 abs"></div>
          <!-- <div class="lines11 abs">
            <div class="transDiv div1 showDiv1"></div>
            <div class="transDiv div2 showDiv2"></div>
            <div class="transDiv div3 showDiv3"></div>
            <div class="transDiv div4 showDiv4"></div>
            <div class="transDiv div5 showDiv5"></div>
          </div> -->
          <div class="lines2 abs" v-bind:class="[item.info == 1?freeBackground:item.info == 2?useingBackground:item.info == 3?disableBackground:item.info == 4?faultBackground:'']">
          </div>
          <div class="lines22 abs freeBackground"></div>
          <div class="text1 abs">
            {{index+1 < 10 ? '0'+(index+1):index+1}}
            </div>
          <div class="text2 abs"  v-bind:class="[item.info == 1?free:item.info == 2?useing:item.info == 3?disable:item.info == 4?fault:'']">
            {{item.info == 1?'空闲':item.info == 2?'充电':item.info == 3?'禁用':item.info == 4?'故障':''}}
          </div>
          <img src="../../../assets/img/kong.png" alt="" class="kong" v-if="item.info == 1 || item.info == 2">
          <img src="../../../assets/img/problem.png" alt="" class="kong" v-if="item.info == 3 || item.info == 4">
        </div>
      </div>
      </div>
      <!-- 补充 -->
      <div class="supplement">
        <p class="vux-1px-b">说明(本资费仅为移动支付费用，不代表现场数卡资费)</p>
        <p class="vux-1px-b">按时收费(充电过程中， 充电器过载引起的意外中断，插座被人拔出等情况，充电剩余金额不予返还)<br></p>
        <p class="vux-1px-b">按量收费<br>根据充电电量来收费，充多少电算多少钱，剩余的钱会退到您的余额账户</p>
      </div>
      <!-- 弹框提示 -->
      <div>
        <alert v-model="show" title=""> {{showText}} </alert>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider, Search, XButton, Grid, GridItem, Alert, cookie } from 'vux'
import { API } from '../../../serve/index'

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Search,
    XButton,
    Grid,
    GridItem,
    Alert
  },
  data () {
    return {
      openId: '', // 微信的oppenid
      code: '', // url上的code
      powerMessage: { // 电桩信息
        adressdetail: '', // 位置
        installtime: '', // 扫描时间
        devicenum: '' // 设备编号
      },
      powerNumber: [], // 电桩数量 状态  1：端口空闲； 2：端口正在使用； 3：端口禁用； 4：端口故障
      free: 'free', // 空闲
      fault: 'fault', // 故障
      disable: 'disable', // 禁用
      useing: 'useing', // 充电
      freeBackground: 'freeBackground', // 空闲
      faultBackground: 'faultBackground', // 故障
      disableBackground: 'disableBackground', // 禁用
      useingBackground: 'useingBackground', // 充电
      chargeBorder1: 'chargeBorder1', // 正常
      chargeBorder2: 'chargeBorder2', // 禁用
      show: false, // 充电桩状态弹框
      showText: '' // 充电桩状态提示语
    }
  },
  mounted () {
    this.getCode()
  },
  methods: {
    /** 获取当前二维码的电桩信息 **/
    getCode () {
      let deviceCode = cookie.get('deviceCode')
      API.powerDetails.getDeviceInfo({
        // 'deviceCode': '001'
        'deviceCode': deviceCode
      }).then((res) => {
        if (res.code === 0) {
          this.powerMessage = res.data.deviceinfoEntity
          this.powerNumber = res.data.portEntityList
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /** 当前端庄端口号的付款页面 **/
    goPayFun (info, val) {
      if (info === '3' || info === '4') {
        this.show = true
        this.showText = '提示：该插孔不可用'
      } else if (info === '2') {
        this.show = true
        this.showText = '提示：该插孔正在充电中'
      } else if (info === '1') {
        this.$router.push(
          {path: `/powerDetails/pay/${val + 1}`,
            query: { openid: cookie.get('openid'), deviceCode: cookie.get('deviceCode') }}
        )
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
// @import '../../../styles/iconfont.less';
@import '../../../styles/mixin.less';
  .powerDetails {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: #FBF9FE;
    overflow-y: auto;
    /**充电机位置**/
    .powerInfo {
      margin-bottom: 0.5rem;
      height: 4rem;
      overflow: hidden;
      .powerList {
        height: 2.7rem;
        background: #fff;
        .detailItem {
          padding-left: 0.5rem;
          .position {
            font-size: .9rem;
            line-height: 1.3rem;
            color: #000;
          }
          .address {
            font-size: .8rem;
            line-height: 1rem;
            color: #000;
          }
        }
      }
      .bianhao {
        padding-left: 0.5rem;
        height: 1.25rem;
        font-size: .7rem;
        line-height: .8rem;
        color: #999;
        background: #fff;
        .span1 {
          float: left;
        }
        .span2 {
          float: right;
          padding-right: .5rem;
        }
      }
    }
    /**充电机使用情况**/
  }
  // .useElec {
  //   margin-top: .2rem;
  //   .vux-flexbox-item {
  //     margin-left: 0!important;
  //     text-align: center;
  //     height: 2.4rem;
  //     background: #fff;
  //     line-height: 2.4rem;
  //     font-size: 0.8rem;
  //     i {
  //       font-size: 1.2rem;
  //     }
  //   }
  // }
  .electric {
    height: auto;
    padding: .2rem 0 .4rem 0;
    background: #fff;
    overflow: hidden;
    .pp {
      margin-left: 0!important;
      margin-top: 1rem;
      float: left;
      .wh(3.2rem, 3.2rem);
      background: #fff;
      .elekou {
        margin: 0.19rem .202rem;
        .wh(2.5rem, 2.5rem);
        border-radius: 0.4rem;
        // border: 1px solid #79a5e4;
        .lines11 {
          bottom: 0.41rem;
          left: -0.16rem;
          z-index: 100;
          width: .25rem;
          height: 1.66rem;
          background: #fff;
          border: 1px solid #79a5e4;
          .transDiv {
            margin: .11rem auto 0;
            width: .15rem;
            height: .2rem;
            background: red;
            
          }
        }
        .lines1 {
          width: .25rem;
          height: 1.66rem;
          z-index: 1000;
          bottom: 0.44rem;
          left: -0.12rem;
        }
        .lines2 {
          bottom: 0.43rem;
          right: -0.15rem;
          z-index: 1000;
          width: .25rem;
          height: 1.66rem;
        }
        .lines22 {
          bottom: 0.41rem;
          right: -0.2rem;
          z-index: 100;
          width: .25rem;
          height: 1.67rem;
          background: #fff;
          border: 1px solid #79a5e4;
        }
        .text1 {
          .wh (1.32rem, .8rem);
          background: #fff;
          text-align: center;
          font-size: 0.8rem;
          line-height: 0.8rem;
          top: -0.4rem;
          left: .6rem;
          color: #333;
        }
        .text2 {
          .wh (1.8rem, .8rem);
          background: #fff;
          text-align: center;
          font-size: 0.6rem;
          line-height: 1rem;
          bottom: -0.5rem;
          left: .45rem;
        }
        .kong {
          .wh(1.5rem, 1.5rem);
          margin: .6rem .6rem;
        }
      }
    }
  }
  .electric::after {
    clear: both;
  }
  .supplement {
    margin-top: .5rem;
    padding: 0 .7rem;
    background: #fff;
    p {
      padding: .4rem 0;
      font-size: .65rem;
      color: #333;
      line-height: 1rem;
    }
  }
  //动画
  .animateClass {
    animation:  myfirst 3s linear  infinite;
    -webkit-animation:  myfirst 3s linear  infinite;
  }
  @keyframes myfirst
  {
  0%   { height: .2rem}
  15%  { height: .4rem}
  30%  { height: .6rem}
  45%  { height: .8rem}
  60%  { height: 1rem}
  75%  { height: 1.2rem}
  90%  { height: 1.4rem}
  100% { height: 1.6rem}
  }
  @-webkit-keyframes myfirst
  {
  0%   { height: .2rem}
  15%  { height: .4rem}
  30%  { height: .6rem}
  45%  { height: .8rem}
  60%  { height: 1rem}
  75%  { height: 1.2rem}
  90%  { height: 1.4rem}
  100% { height: 1.6rem}
  }
  // 空闲
  .free {
    color: #79a5e4;
  }
  // 故障
  .fault {
    color: #bfbfbf;
  }
  // 禁用
  .disable {
    color: #bfbfbf;
  }
  // 充电
  .useing {
    color: #ff6800;
  }
  // 空闲
  .freeBackground {
    background: #31d51f;
  }
  // 故障
  .faultBackground {
    background: #bfbfbf;
  }
  // 禁用
  .disableBackground {
    background: #bfbfbf;
  }
  // 充电
  .useingBackground {
    background: #ff6800;
    animation:  myfirst 1s linear  infinite;
    -webkit-animation:  myfirst 1s linear  infinite;
  }
  // 边框正常
  .chargeBorder1 {
    border: 1px solid #79a5e4;
  }
  // 边框禁用
  .chargeBorder2 {
    border: 1px solid #bfbfbf;
  }
</style>
