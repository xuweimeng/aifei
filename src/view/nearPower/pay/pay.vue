<template>
  <div class="payPage fixPosition">
     <flexbox class="payPage_details" @click.native="ToDetails">
        <flexbox-item :span="1/5" class="czNo">
          <div class="circle">03</div>
          <div class="circleText">插座号</div>
        </flexbox-item>
        <flexbox-item :span="3/5" class="czDz">
          
        </flexbox-item>
        <flexbox-item :span="1/5" class="czXq">
        22
        </flexbox-item>
      </flexbox>
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
@import '../../../styles/mixin.less';
  .payPage {
    z-index: 110;
    &_details {
      .wh(100%, 5.5rem);
      background: pink;
      .vux-flexbox-item {
        margin-left: 0!important;
        height: 5.5rem;
      }
      //插座号
      .czNo {
        padding: 20px
      }
    }

  }
</style>

