<template>
  <div class="myAccount">
    <group>
      <router-link tag="div" class="tab-item" to="/myAccount">
        <cell title="头像" class="beforeLine" is-link style="padding: 0.8rem 0.75rem">
          <img
          style="display:block;margin-right:0.24px;width: 2.5rem;height:2.5rem;border-radius: 0.5rem;"
          :src='headImgUrl'>
        </cell>
        <cell-box style="padding: 0;" class="cellBox"></cell-box>
      </router-link>
      <router-link tag="div" class="tab-item" to="">
      <!-- <router-link tag="div" class="tab-item" to="/myAccount/modifyNickname"> -->
        <cell title="名字" :value="`${nickname}`" is-link class="tab-link">
        </cell>
        <cell-box style="padding: 0;"></cell-box>
      </router-link>
      <router-link tag="div" class="tab-item" to="">
      <!-- <router-link tag="div" class="tab-item" to="/myAccount/modifyNickname"> -->
        <cell title="余额" :value="`${myMoney}`" is-link class="tab-link">
        </cell>
        <cell-box style="padding: 0;"></cell-box>
      </router-link>
    </group>
    <group>
      <router-link tag="div" class="tab-item" :to="{ path: '/chargeNum', query: { openid: openid }}">
        <cell title="去充值"  class="beforeLine" is-link>
        </cell>
        <cell-box style="padding: 0;"></cell-box>
      </router-link>
      <router-link tag="div" class="tab-item" to="">
        <cell title="手机号" :value="`${userPhone}`" class="beforeLine" is-link>
        </cell>
        <cell-box style="padding: 0;"></cell-box>
      </router-link>
    </group>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Group, Cell, CellBox, cookie } from 'vux'
import { API } from '../../serve/index'
export default {
  components: {
    Group,
    Cell,
    CellBox
  },
  data () {
    return {
      nickname: '', // 用户名
      headImgUrl: '', // 用户余额
      myMoney: '', // 用户余额
      openid: '', // openid
      userPhone: '' // 手机号
    }
  },
  mounted () {
    this.getCookieOpenid()
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
        this.getMyInfo()
      }
    },
    /**
     * @description 从code获取openid
     * @function getMyInfo
     */
    getMyInfo () {
      API.powerDetails.getmyinfo({
        'code': cookie.get('code'),
        'openid': this.openid
      }).then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.nickname = res.data.nickname
          this.headImgUrl = res.data.headImgUrl
          this.myMoney = res.data.myMoney
          this.userPhone = res.data.phonenum
          this.openid = res.data.openId
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(from)
      if (from.path === '/chargeNum') {
        this.getMyInfo()
      }
    }
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '../../styles/animate.css';
  .myAccount {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    background: #FBF9FE;
  }
  .cellBox::before {
    left: 0!important;
  }

</style>
