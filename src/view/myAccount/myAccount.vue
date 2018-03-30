<template>
  <div class="myAccount"> 
    <group>
      <router-link tag="div" class="tab-item" to="/myAccount">
        <cell title="头像" class="beforeLine" is-link style="padding: 0.8rem 0.75rem">
          <img  style="display:block;margin-right:0.24px;width: 2.5rem;height:2.5rem;border-radius: 0.5rem;" src="../../assets/user/userPic.jpg">
        </cell>
        <cell-box style="padding: 0;" class="cellBox"></cell-box>
      </router-link>
      <router-link tag="div" class="tab-item" to="/myAccount/modifyNickname">
        <cell title="名字" :value="`${nickname}3`" is-link class="tab-link">
        </cell>
        <cell-box style="padding: 0;"></cell-box>
      </router-link>
      <router-link tag="div" class="tab-item" to="/charge">
        <cell title="充电卡号" value="" class="tab-link">
        </cell>
      </router-link>
    </group>
    <group>
      <router-link tag="div" class="tab-item" to="/myAccount">
        <cell title="修改手机号" value="17681868102" class="beforeLine" is-link>
        </cell>
        <cell-box style="padding: 0;"></cell-box>
      </router-link>
    </group>
    <!-- <transition name="slide"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
import infoHeader from '@/view/infoHeader/infoHeader'
import { Group, Cell, CellBox } from 'vux'
export default {
  components: {
    infoHeader,
    Group,
    Cell,
    CellBox
  },
  data () {
    return {
      nickname: '', // 用户名
      imgUrl: '', // 用户余额
      userPhone: '' // 用户手机号
    }
  },
  computed: {
    nickname: function () {
      return this.$route.query.userName
    },
    userPhone: function () {
      return this.$route.query.userPhone
    },
    imgUrl: function () {
      return this.$route.query.imgUrl
    }

  },
  methods: {
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '../../styles/name.less';

  .myAccount {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .cellBox::before {
    left: 0!important;
  }
    
</style>


