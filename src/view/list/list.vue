<template>
<div class="my" v-if="isUser">
  <!-- 头部 -->
  <info-header></info-header>
  <!-- 功能列表 -->
  <group>
    <router-link tag="div" class="tab-item" to="/myAccount">
      <cell title="我的账号" value="" class="beforeLine" is-link>
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe779;</i>
      </cell>
      <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/charge">
      <cell title="我要充值" value="0.00（元）" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe783;</i>
      </cell>
    </router-link>
  </group>
  <!-- <group>
    <router-link tag="div" class="tab-item" to="/recharge">
      <cell title="电卡充值" value="" class="beforeLine" is-link>
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a0;</i>
      </cell>
      <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/buyCard">
      <cell title="在线购卡" value="0.00（元）" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe791;</i>
      </cell>
    </router-link>
  </group> -->
  <group>
    <router-link tag="div" class="tab-item" to="/myAccount">
      <cell title="电卡充值" value="提供在线充卡服务" class="beforeLine" is-link>
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe79e;</i>
      </cell>
      <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/charge">
      <cell title="在线购卡" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a4;</i>
      </cell>
       <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/cardBind">
      <cell title="电卡绑定" value="绑定电卡享有更多服务" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a7;</i>
      </cell>
    </router-link>
  </group>
  <group>
    <router-link tag="div" class="tab-item" to="/charging">
      <cell title="正在充电" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a0;</i>
      </cell>
       <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/chargeRecord">
      <cell title="充电记录" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a0;</i>
      </cell>
       <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/chargeMeal">
      <cell title="套餐记录" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a0;</i>
      </cell>
    </router-link>
  </group>
  <group>
    <router-link tag="div" class="tab-item" to="/powerDetails">
      <cell title="使用情况" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a0;</i>
      </cell>
       <cell-box style="padding: 0;"></cell-box>
    </router-link>
    <router-link tag="div" class="tab-item" to="/collection">
      <cell title="我的收藏" value="" is-link class="tab-link">
        <i class="iconfont" slot="icon" style="display:block;margin-right:5px;">&#xe7a0;</i>
      </cell>
    </router-link>
  </group>
  <!-- <router-link tag="div" class="tab-item" to="/charge">
    <span class="tab-link">运营商管理</span>
  </router-link>
  <router-link tag="div" class="tab-item" to="/userPage">
    <span class="tab-link">代理加盟</span>
  </router-link> -->

</div>
</template>

<script>
import infoHeader from '@/view/infoHeader/infoHeader'
import { Group, Cell, CellBox } from 'vux'
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
  methods: {
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
