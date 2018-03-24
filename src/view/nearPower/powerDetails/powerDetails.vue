<template>
  <div class="powerDetails">
    <!-- 充电机位置 -->
    <div class="powerInfo">
      <flexbox class="powerList" @click.native="ToDetails">
        <flexbox-item  class="detailItem">
          <div class="position">仓乐雅苑7幢架空层</div>
          <div class="address">578m|科技大道西部科技园西365米</div>
        </flexbox-item>
        <flexbox-item :span="1/8">
          <div class="flex-demo">
            信号
          </div>
        </flexbox-item>
      </flexbox>
      <div class="bianhao"><span class="span1">编号：0002QU(175927)_V32_2/175</span><span class="span2">2018-03-19 11:19:55</span></div>
    </div>
    <!-- tab功能 -->
    <!-- <flexbox class="useElec">
      <flexbox-item><i class="iconfont">&#xe797;</i>导航</flexbox-item>
      <flexbox-item><i class="iconfont">&#xe797;</i>纠错</flexbox-item>
      <flexbox-item><i class="iconfont">&#xe797;</i>分享</flexbox-item>
      <flexbox-item><i class="iconfont">&#xe797;</i>联系</flexbox-item>
    </flexbox> -->
    <!-- 充电机使用情况 -->
    <div class="electric">
      <div v-for="i in 6" :key="i" class="pp">
        <div class="elekou rel">
          <div class="lines1 abs"></div>
          <div class="lines2 abs"></div>
          <div class="text1 abs">01</div>
          <div class="text2 abs">充电</div>
          <img src="../../../assets/img/kong.png" alt="" class="kong">
        </div>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider, Search, XButton, Grid, GridItem } from 'vux'
import { API } from '../../../serve/index'

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Search,
    XButton,
    Grid,
    GridItem
  },
  mounted () {
    this.getCode()
  },
  methods: {
    getCode () {
      API.powerDetails.list({
        'deviceCode': '001'
      }).then((res) => {
        console.log(res)
        if (res.code === 0) {
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../../../styles/iconfont.less';
@import '../../../styles/mixin.less';
  .powerDetails {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: #FBF9FE;
    /**充电机位置**/
    .powerInfo {
      margin-bottom: 0.1rem;
      height: 4rem;
      .powerList {
        height: 2.75rem;
        background: #fff;
        .detailItem {
          padding-left: 0.5rem;
          .position {
            font-size: .7rem;
            line-height: 1.3rem;
            color: #000;
          }
          .address {
            font-size: .6rem;
            line-height: 1rem;
            color: #000;
          }
        }
      }
      .bianhao {
        padding-left: 0.5rem;
        height: 1.25rem;
        font-size: .55rem;
        line-height: .8rem;
        color: #999;
        background: #fff;
        .span1 {
          float: left;
        }
        .span2 {
          float: right;
          padding-right: .5rem;
        }
      }
    }
    /**充电机使用情况**/
  }
  .useElec {
    margin-top: .2rem;
    .vux-flexbox-item {
      margin-left: 0!important;
      text-align: center;
      height: 2.4rem;
      background: #fff;
      line-height: 2.4rem;
      font-size: 0.8rem;
      i {
        font-size: 1.2rem;
      }
    }
  }
  .electric {
    .pp {
      margin-left: 0!important;
      margin-top: 1rem;
      float: left;
      .wh(3.2rem, 3.2rem);
      background: #fff;
      .elekou {
        margin: 0.19rem .202rem;
        .wh(2.7rem, 2.7rem);
        border-radius: 0.4rem;
        border: 1px solid #79a5e4;
        .lines1 {
          width: .25rem;
          height: 2rem;
          background: #31d51f;
          top: 0.35rem;
          left: -0.16rem;
        }
        .lines2 {
          width: .25rem;
          height: 2rem;
          background: #31d51f;
          top: 0.35rem;
          right: -0.18rem;
        }
        .text1 {
          .wh (1.5rem, 1rem);
          background: #fff;
          text-align: center;
          font-size: 0.8rem;
          line-height: 0.8rem;
          top: -0.4rem;
          left: .6rem;
          color: #333;
        }
        .text2 {
          .wh (1.8rem, 1rem);
          background: #fff;
          text-align: center;
          font-size: 0.6rem;
          line-height: 1rem;
          bottom: -0.5rem;
          left: .45rem;
          color: #79a5e4;
        }
        .kong {
          .wh(1.5rem, 1.5rem);
          margin: .6rem .6rem;
        }
      }
    }
  }
</style>
