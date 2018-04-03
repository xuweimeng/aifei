<template>
<div class="my" v-if="isUser">
  <!-- 头部 -->
  <info-header :user-img="headImgUrl" :user-phone="phonenum" :user-name="nickname"></info-header>
  <!-- 功能列表 -->
  <group>
    <router-link tag="div" class="tab-item" :to="{ path: '/myAccount', query: { userName: nickname,userPhone: phonenum, imgUrl: headImgUrl}}">
      <cell title="我的账号" value="" class="beforeLine" is-link >
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe66c;</i>
      </cell>
      <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/chargeNum">
      <cell title="我要充值" :value="`${myMoney}元`" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe796;</i>
      </cell>
    </router-link>
  </group>
  <group>
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
    <!-- <router-link tag="div" class="tab-item" to="/cardBind">
      <cell title="电卡绑定" value="绑定电卡享有更多服务" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a7;</i>
      </cell>
    </router-link> -->
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
    <!-- <router-link tag="div" class="tab-item" to="/chargeMeal">
      <cell title="套餐记录" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a0;</i>
      </cell>
    </router-link> -->
  </group>
  <group>
    <router-link tag="div" class="tab-item" to="/powerDetails">
      <cell title="充电" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe625;</i>
      </cell>
       <cell-box style="padding: 0;"></cell-box>
    </router-link>
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
import { Group, Cell, CellBox } from 'vux'
import { API } from '../../serve/index'

export default {
  created () {
  },
  components: {
    infoHeader,
    Group,
    Cell,
    CellBox
  },
  computed: {
    isUser () {
      return this.$route.path.match('list') ? this.$route.path.match('list').length : ''
    }
  },
  data () {
    return {
      nickname: '赵中偶', // 用户名
      headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/PiajxSqBRaEIHVqmlIwoRSqlBQU2kyXibgRjjbqQUgVXcCLQL1mp8Mof7lcK46cC8wpBmrOlblibPJibDH2FdJoh1w/132', // 用户头像
      myMoney: '1000000.00', // 用户余额
      phonenum: '17681868101' // 用户手机号
    }
  },
  mounted () {
  },
  methods: {
    getMyInfo () {
      API.powerDetails.getmyinfo({
        'code': 'oyRTo0Q3d9FhSq9HbzfisWKG2AfI'
      }).then((res) => {
        console.log(res)
        if (res.code === 0) {
          this.openId = res.data.openid
          this.nickname = res.data.nickname
          this.headImgUrl = res.data.headImgUrl
          this.myMoney = res.data.myMoney
          console.log(this.powerNumber)
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
