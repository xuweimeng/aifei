<template>
<div class="my" v-if="isUser">
  <!-- 头部 -->
  <info-header :user-img="headImgUrl" :user-phone="phonenum" :user-name="nickname"></info-header>
  <group>
    <router-link tag="div" class="tab-item" to="/chargeNum">
      <cell title="我要充值" :value="`${myMoney}元`" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe796;</i>
      </cell>
      <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/charging">
      <cell title="充值记录" value="" class="beforeLine" is-link>
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe640;</i>
      </cell>
      <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/bindMobile">
      <cell title="绑定手机号" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe630;</i>
      </cell>
       <cell-box style="padding: 0;"></cell-box>
    </router-link>
  </group>
  <group>
    <router-link tag="div" class="tab-item" to="/charging">
      <cell title="正在充电" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe609;</i>
      </cell>
       <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/chargeRecord">
      <cell title="充电记录" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe63c;</i>
      </cell>
       <cell-box style="padding: 0;"></cell-box>
    </router-link>
  </group>
  <group style="margin-bottom: 1rem">
    <!-- <router-link tag="div" class="tab-item" to="/powerDetails">
      <cell title="联系我们" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe625;</i>
      </cell>
       <cell-box style="padding: 0;"></cell-box>
    </router-link> -->
    <router-link tag="div" class="tab-item" to="/collection">
      <cell title="常见故障" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe600;</i>
      </cell>
    </router-link>
  </group>
</div>
</template>

<script>
import infoHeader from '@/view/infoHeader/infoHeader'
import { Loading, Group, Cell, CellBox, cookie, XButton } from 'vux'
import { API } from '../../serve/index'

export default {
  components: {
    infoHeader,
    Group,
    Cell,
    CellBox,
    Loading,
    XButton
  },
  computed: {
    isUser () {
      return this.$route.path.match('list') ? this.$route.path.match('list').length : ''
    }
  },
  data () {
    return {
      nickname: '', // 用户名
      headImgUrl: '', // 用户头像
      myMoney: '', // 用户余额
      phonenum: '' // 用户手机号
    }
  },
  mounted () {
    this.getMyInfo()
  },
  methods: {
    getMyInfo () {
      API.powerDetails.getmyinfo({
        'code': cookie.get('code')
      }).then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.openId = res.data.openId
          this.nickname = res.data.nickname
          this.headImgUrl = res.data.headImgUrl
          this.myMoney = res.data.myMoney
          cookie.set('myMoney', res.data.myMoney)
          cookie.set('openid', this.openId)
          cookie.set('phonenum', res.data.phonenum)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    watch: {
      '$route' (to, from) {
        console.log(to, from)
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/iconfont.less';

  .beforeLine:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 10px;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
</style>
