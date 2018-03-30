<template>
  <div class="paySuccess fixPosition">
   <div class="successTip">
     <i class="iconfont">&#xe797;</i>充值成功
   </div>
   <div class="successInfo">
      <p>充值账号：<span>XXu</span></p>
      <p>充值金额：<span style="color: #fe5c79">29.70</span>元</p>
      <p>充值信息：<span>30.00元话费</span></p>
      <p>下单时间：<span>2017-12-12 12:50:41</span></p>
   </div>
   <div class="backPage">
     <x-button class="backBtn">返回充电</x-button>
   </div>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  components: {
    XButton
  }
}
</script>

<style lang="less">
@import '../../../styles/iconfont.less';
  .paySuccess {
    .successTip, .iconfont {
      background: #ffF;
      font-size: .75rem;
      color: #27ca6c;
      text-align: center;
      line-height: 2.5rem;
      font-weight: 600;
    }
    .iconfont {
      font-size: .8rem;
      // line-height: 2.5rem;
    }
    .successInfo {
      margin-top: .8rem;
      padding-bottom: .2rem;
      background: #fff;
      p {
        padding-top: .2rem;
        font-size: .6rem;
        color: #496694;
        font-weight: 600;
        text-indent: 2rem;
        line-height: 1.5rem;
      }
    }
    .backPage {
      margin: 2rem auto .4rem;
      width: 96%;
      background: #efefef;
      text-align: center;
      .backBtn{
        background: #4e82d1!important;
        color: #fff;
        font-size: .8rem;
      }
    }
  }
</style>
