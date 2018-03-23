<template>
  <div class="chargeNum fixPosition">
    <div class="chargeMoney">
      <p class="vux-1px-b">选择充值面额</p>
      <checker
        v-model="defaultChecker"
        default-item-class="demo4-item"
        selected-item-class="demo4-item-selected"
        class="checkerList">
          <checker-item :value="1" @on-item-click="onItemClick2">5元<br><span class="spanText">售价：5.00元</span></checker-item>
          <checker-item :value="2" @on-item-click="onItemClick2">10元<br><span class="spanText">售价：10.00元</span></checker-item>
          <checker-item :value="3" @on-item-click="onItemClick2">31元<br><span class="spanText">售价：30.00元</span></checker-item>
          <checker-item :value="4" @on-item-click="onItemClick2">52元<br><span class="spanText">售价：50.00元</span></checker-item>
          <checker-item :value="5" @on-item-click="onItemClick2">104元<br><span class="spanText">售价：100.00元</span></checker-item>
          <checker-item :value="6" @on-item-click="onItemClick2">207元<br><span class="spanText">售价：200.00元</span></checker-item>
          <checker-item :value="7" @on-item-click="onItemClick2">311元<br><span class="spanText">售价：300.00元</span></checker-item>
        </checker>
    </div>
    <div class="goChargeBtn">
      <x-button @click.native="goChargeBtn" class="chargeBtn1">充值</x-button>
    </div>
  </div>
</template>

<script>
import { XButton, Checker, CheckerItem } from 'vux'
export default {
  components: {
    XButton,
    Checker,
    CheckerItem
  },
  data () {
    return {
      defaultChecker: 1, // 默认选中的checker
    }
  },
  methods: {
    /** 立即充值 **/
    goChargeBtn () {

    },
    /** 选择1元，2元，3元，4元 **/
    onItemClick2 (index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less">
@import '../../../styles/mixin.less';
@import '~vux/src/styles/1px.less';
  .chargeNum {
    background: #fff;
    //选择面值
    .chargeMoney {
      p {
        width: 14rem;
        margin-left: 1rem;
        line-height: 2rem;
        font-size: .8rem;

      }
      .checkerList {
        padding: 0 .6rem;
      }
    }
    //充值按钮
    .goChargeBtn {
      padding: 0.4rem;
      margin: 3rem auto 0;
      width: 96%;
      /* background: #efefef; */
      text-align: center;
      .chargeBtn1{
        background: #4e82d1!important;
        color: #fff;
        font-size: .8rem;
      }
    }
  }
  //默认按钮颜色
  .demo4-item {
    padding: .2rem 0;
    width: 4.6rem;
    color: #999;
    font-size: .7rem;
    background: #fff;
    border: 1px solid #999;
    text-align: center;
    border-radius: .2rem;
  }
  //选中按钮颜色
  .demo4-item-selected {
    color: #4e82d1;
    background: #4e82d1;
  }
  .spanText {
    font-size: .6rem;
  }
</style>
