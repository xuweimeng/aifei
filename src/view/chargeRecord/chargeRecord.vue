<template>
  <div class="chargeRecord">
    <p class="chargeHeader">
      <span class="totals">支付成功：{{successPay.length}}</span>
      <span class="cancels">待支付：{{failPay.length}}</span>
    </p>
    <div class="records">
      <div class="records1" v-for="(item, index) in chargeList" :key="index">
        <p class="rescord_detail">
          <span class="records_position">{{item.deviceaddress}}</span>
          <span class="record_pay">
            {{item.paystatus === '1'?'待支付':item.paystatus === '2'?'支付成功':item.paystatus === '3'?'支付失败':''}}
            <i class="iconfont" style="color: #08af2d;font-weight:bold;" v-if="item.paystatus === '2'">&#xe6ae;</i>
          </span>
        </p>
        <flexbox class="record_detail2">
          <flexbox-item :span="4/5">
            <p class="record_time">
              <i class="iconfont" >&#xe6c6;</i>
              <span>开始时间：{{item.batterystarttime}}</span>
            </p>
            <p class="record_money"> 
              <i class="iconfont" >&#xe91a;</i>
              <span>消费金额：{{item.ordermoney}}元</span>
            </p>
            <p class="record_money"> 
              <i class="iconfont" >&#xe60a;</i>
              <span>充电类型：{{item.chargetypedetail}}</span>
            </p>
          </flexbox-item>
          <flexbox-item :span="1/5"><div class="record_Number">{{item.portnum}}</div></flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'
import { API } from '../../serve/index'
export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      chargeList: [], // 充值历史
      successPay: [], // 支付成功
      failPay: [] // 待支付
    }
  },
  mounted () {
    // this.getOpenId()
    this.getChregeRecord()
  },
  created () {
    this.routeChange()
  },
  methods: {
    /** 获取微信openid **/
    getOpenId () {
      API.powerDetails.getOpenId({
        'code': this.code
      }).then((res) => {
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * @function getChregeRecord
     * @description 获取充值记录
     * @params { String } openid openid
     * @params { String } chargetype 0:充电
     */
    getChregeRecord () {
      API.powerDetails.getMyChargeListInfo({
        'openid': 'oyRTo0Q3d9FhSq9HbzfisWKG2AfI',
        'chargetype': '0'
      }).then((res) => {
        if (res.code === 0) {
          this.chargeList = res.data
          res.data.forEach((item) => {
            if (item.paystatus === '2') {
              this.successPay.push(item)
            } else if (item.paystatus === '3') {
              this.failPay.push(item)
            }
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * @augments
     * @function routerChange
     * @description 路由变化之后重新获取个人信息
     */
    routeChange () {
      this.getChregeRecord()
    }
  },
  watch: {
    '$route': 'routeChange'
  }
}
</script>

<style lang="less">
@import '../../styles/iconfont.less';
.chargeRecord {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #FBF9FE;
  z-index: 500;
  .chargeHeader {
    line-height: 2.5rem;
    background: #fff;
    font-size: .8rem;
    color: #666;
    .totals {
      padding-left: .5rem;
    }
    .cancels {
      padding-left: 3rem;
    }
  }
  .records {
    padding: 0 .5rem;
    .records1 {
      margin-top: .55rem;
      padding: .1rem;
      background: #fff;
      border-radius: .25rem;
      box-shadow:2px 2px 5px #999;
      -webkit-box-shadow:2px 2px 5px #999;
      .rescord_detail {
        line-height: 1.2rem;
        color: #666;
        font-size: .75rem;
        .records_position {
          float: left;
        }
        .record_pay {
          float: right;
          margin-right: .4rem;
        }
      }
      .record_detail2 {
        .vux-flexbox-item {
          .record_time, .record_money {
            font-size: .65rem;
            color: #999;
          }
          .record_Number {
            color: #08af2d;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
}
</style>


