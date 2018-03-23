<template>
  <div class="charge">
    <img src="../../assets/logo.png" alt="账户余额" class="yue">
    <p class="phoneYe">手机余额</p>
    <p class="money">$100.00</p>
    <div class="startBtn">
      <x-button @click="chargeBtn" class="chargeBtn">充值</x-button>
    </div>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  components: {
    XButton
  },
  data () {
    return {

    }
  },
  methods: {
    // 充值按钮
    chargeBtn () {

    }
  }
}
</script>

<style lang="less">
@import '../../styles/mixin.less';

  .charge {
    .yue {
      margin: 4rem auto 0;
      .wh(4.5rem, 4.5rem);
      clear: both;
      display: block;
      /* margin:auto;  */
    }
    //余额
    .phoneYe {
      color: #333;
      font-size: 1rem;
      line-height: 1.5rem;
      text-align: center;
    }
    .money {
      color: #333;
      font-size: 1.5rem;
      line-height: 3rem;
      text-align: center;
    }
    //充值按钮
    .startBtn {
      padding: 0.4rem;
      margin: 3rem auto 0;
      width: 96%;
      /* background: #efefef; */
      text-align: center;
      .chargeBtn{
        background: #4e82d1!important;
        color: #fff;
        font-size: .8rem;
      }
    }
  }
</style>
