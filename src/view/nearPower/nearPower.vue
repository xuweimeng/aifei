<template>
  <div class="nearPower">
    <!-- 搜索 -->
    <div class="searchPower">
      <!-- <div class="selectPosition">搜索位置</div> -->
      <div class="searchInput">
        <search
          :results="results"
          v-model="value"
          ref="search">
          </search>
        </div>
    </div>
    <!-- 附近电源列表 -->
    <flexbox class="powerList vux-1px-b" @click.native="ToDetails">
      <flexbox-item :span="8" class="detailItem">
        <div class="position">仓乐雅苑7幢架空层</div>
        <div class="address">科技大道西部科技园西365米</div>
        <flexbox class="powerUse">
          <flexbox-item class="detailUse">
            <div class="useSquare green">闲</div>
            <div class="useNumber">1个</div>
          </flexbox-item>
          <flexbox-item class="detailUse">
            <div class="useSquare red">充</div>
            <div class="useNumber">9个</div>
          </flexbox-item>
          <flexbox-item class="detailUse">
            <div class="useSquare yellow">共</div>
            <div class="useNumber">10个</div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          信号
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox class="powerList vux-1px-b">
      <flexbox-item :span="8" class="detailItem">
        <div class="position">仓乐雅苑7幢架空层</div>
        <div class="address">科技大道西部科技园西365米</div>
        <flexbox class="powerUse">
          <flexbox-item class="detailUse">
            <div class="useSquare green">闲</div>
            <div class="useNumber">1个</div>
          </flexbox-item>
          <flexbox-item class="detailUse">
            <div class="useSquare red">充</div>
            <div class="useNumber">9个</div>
          </flexbox-item>
          <flexbox-item class="detailUse">
            <div class="useSquare yellow">共</div>
            <div class="useNumber">10个</div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          信号
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox class="powerList vux-1px-b">
      <flexbox-item :span="8" class="detailItem">
        <div class="position">仓乐雅苑7幢架空层</div>
        <div class="address">科技大道西部科技园西365米</div>
        <flexbox class="powerUse">
          <flexbox-item class="detailUse">
            <div class="useSquare green">闲</div>
            <div class="useNumber">1个</div>
          </flexbox-item>
          <flexbox-item class="detailUse">
            <div class="useSquare red">充</div>
            <div class="useNumber">9个</div>
          </flexbox-item>
          <flexbox-item class="detailUse">
            <div class="useSquare yellow">共</div>
            <div class="useNumber">10个</div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          信号
        </div>
      </flexbox-item>
    </flexbox>
    <flexbox class="powerList vux-1px-b">
      <flexbox-item :span="8" class="detailItem">
        <div class="position">仓乐雅苑7幢架空层</div>
        <div class="address">科技大道西部科技园西365米</div>
        <flexbox class="powerUse">
          <flexbox-item class="detailUse">
            <div class="useSquare green">闲</div>
            <div class="useNumber">1个</div>
          </flexbox-item>
          <flexbox-item class="detailUse">
            <div class="useSquare red">充</div>
            <div class="useNumber">9个</div>
          </flexbox-item>
          <flexbox-item class="detailUse">
            <div class="useSquare yellow">共</div>
            <div class="useNumber">10个</div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo">
          信号
        </div>
      </flexbox-item>
    </flexbox>
    <router-view></router-view>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider, Search, XButton } from 'vux'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Search,
    XButton
  },
  data () {
    return {
      results: [],
      value: '请输入地点'
    }
  },
  methods: {
    ToDetails () {
      this.$router.push({path: 'nearPower/powerDetails'})
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../../styles/mixin.less';
  .nearPower {
    background: #FBF9FE;
    .powerList {
      height: 4.3rem;
      background: #fff;
      .detailItem {
        padding-left: 0.5rem;
        .position {
          font-size: .8rem;
          line-height: 1.5rem;
          color: #000;
        }
        .address {
          font-size: .7rem;
          line-height: 1.2rem;
          color: #666;
        }
        .powerUse {
          .detailUse {
            .useSquare {
              float: left;
              .wh(1rem,1rem);
              font-size: .6rem;
              color: #fff;
              line-height: 1rem;
              text-align: center;
              border-radius: 0.25rem;
            }
            .useNumber {
              float: left;
              font-size: .6rem;
              color: #666;
              line-height: 1rem;
            }
          }
        }
      }
    }
  }
  .green {
    background: green;
  }
  .red {
    background: red;
  }
  .yellow {
    background: #ff6800;
  }
</style>


