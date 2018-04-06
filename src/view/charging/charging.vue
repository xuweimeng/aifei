<template>
  <div class="wxCharge">
    <group v-for="(item, index) in recordList" :key="index">
      <flexbox class="chargeFlex">
        <flexbox-item :span="1/6">
          <p class="wxIcon"><i class="iconfont" >&#xe608;</i></p>
        </flexbox-item>
        <flexbox-item :span="3/6">
            <p class="charge_title">微信充值</p>
            <p class="charge_time">{{item.batterystarttime}}</p>
        </flexbox-item>
        <flexbox-item :span="2/6">
          <p class="charge_Money">{{item.ordermoney}}</p>
        </flexbox-item>
      </flexbox>
    </group> 
  </div>
</template>

<script>
import { Group, Flexbox, FlexboxItem, cookie } from 'vux'
import { API } from '../../serve/index'
export default {
  components: {
    Group,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      recordList: [], // 充值历史
      openid: '' // openid
    }
  },
  mounted () {
    this.getCookieOpenid()
    this.getEleRecord()
  },
  methods: {
    /**
     * @description 判断本地cookie是否存储oppenid，否则调用getMyInfo
     */
    getCookieOpenid () {
      let cookieOpenId = cookie.get('openid')
      if (cookieOpenId) {
        this.openid = cookieOpenId
      } else {
        this.getOpenId()
      }
    },
    /** 获取微信openid **/
    getOpenId () {
      API.powerDetails.getOpenId({
        'code': cookie.get('code')
      }).then((res) => {
        this.openid = res.data
      }).catch((error) => {
        console.log(error)
      })
    },
    /**
     * @function getEleRecord
     * @description 获取充值记录
     * @params { String } openid openid
     * @params { String } chargetype 3:充值
     */
    getEleRecord () {
      API.powerDetails.getMyChargeListInfo({
        'openid': this.openid,
        'chargetype': '3'
      }).then((res) => {
        if (res.code === 0) {
          this.recordList = res.data
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less">
@import '../../styles/iconfont.less';
.wxCharge {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #FBF9FE;
  z-index: 500;
  .chargeFlex {
    padding: .5rem 0;
    .vux-flexbox-item {
      .wxIcon {
        text-align: center;
        .iconfont {
          font-size: 1.5rem;
          // color: #08af2d;
        }
      }
      .charge_title {
        line-height: 1.4rem;
        font-size: .75rem;
        color: #333;
      }
      .charge_time {
        line-height: 1.2rem;
        font-size: .6rem;
        color: #666;
      }
      .charge_Money {
        font-size: 1.2rem;
        color: #08af2d;;
        text-align: center;
      }
    }
  }
}
</style>


