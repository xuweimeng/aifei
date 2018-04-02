<template>
  <div class="chargeRecord">
    <p class="chargeHeader">
      <span class="totals">订单完成数:30</span>
      <span class="cancels">订单取消数:20</span>
    </p>
    <div class="records">
      <div class="records1">
        <p class="rescord_detail">
          <span class="records_position">仓乐雅苑7幢架空层</span>
          <span class="record_pay">未付款<i class="iconfont" >&#xe79e;</i></span>
        </p>
        <flexbox class="record_detail2">
          <flexbox-item :span="4/5">
            <p class="record_time">
              <i class="iconfont" >&#xe79e;</i>
              <span>充电开始时间2018-03-24 17:14:48</span>
            </p>
            <p class="record_money"> 
              <i class="iconfont" >&#xe79e;</i>
              <span>消费金额2.00元</span>
            </p>
          </flexbox-item>
          <flexbox-item :span="1/5"><div class="record_Number">1号</div></flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'
export default {
  components: {
    Flexbox,
    FlexboxItem
  }
}
</script>

<style lang="less">
@import '../../styles/iconfont.less';
.chargeRecord {
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
    padding: 0 .75rem;
    
    .records1 {
      margin-top: .6rem;
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
            color: green;
            font-size: 1.5rem;
          }
        }
      }
    }
  }
}
</style>


