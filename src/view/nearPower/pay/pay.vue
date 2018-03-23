<template>
  <div class="payPage fixPosition">
    <!-- 充电位置 -->
     <flexbox class="payPage_details" @click.native="ToDetails">
        <flexbox-item :span="1/5" class="czNo">
          <div class="circle">03</div>
          <div class="circleText">插座号</div>
        </flexbox-item>
        <flexbox-item :span="3/5" class="czDz">
          <p class="czText1">捷瑞达科技园七号楼</p>
          <p class="czText2"><i class="iconfont">&#xe797;</i>海创路杭州捷瑞达科创路南79米</p>
          <p class="czText2"><i class="iconfont">&#xe797;</i>海创路杭州捷瑞达科创路南79米</p>
          <p class="czText2"><i class="iconfont">&#xe797;</i>海创路杭州捷瑞达科创路南79米</p>
        </flexbox-item>
        <flexbox-item :span="1/5" class="czXq">
          <div class="problem">?</div>
        </flexbox-item>
      </flexbox>
      <!-- 收费设置 -->
      <tab :line-width="2" default-color="#888" active-color="#5e88c0" custom-bar-width="3rem">
        <tab-item selected @on-item-click="onItemClick">按时收费</tab-item>
        <tab-item @on-item-click="onItemClick">按量收费</tab-item>
      </tab>
      <!-- 按时收费 -->
      <div class="payPage_byTime">
        <!-- 选择按钮 -->
        <div class="btns" v-if="tabIndex == 0">
          <checker
          v-model="defaultChecker"
          default-item-class="demo4-item"
          selected-item-class="demo4-item-selected">
            <checker-item :value="1" @on-item-click="onItemClick2">1元3小时</checker-item>
            <checker-item :value="2" @on-item-click="onItemClick2">2元6小时</checker-item>
            <checker-item :value="3" @on-item-click="onItemClick2">3元9小时</checker-item>
            <checker-item :value="4" @on-item-click="onItemClick2">4元充满</checker-item>
          </checker>
        </div>
        <!-- 提示 -->
        <p class="tips1" v-if="tabIndex == 0">
          提示：大功率电瓶车按时收费可能会被拒充，建议使用按量收费。
        </p>
        <div class="tipe3" v-if="tabIndex == 1">
          <flexbox>
            <flexbox-item :span="1/4">
              <x-button class="manBtn">充满</x-button>
            </flexbox-item>
          </flexbox>
          <p>收费标准（按量收费）</p>
          <flexbox>
            <flexbox-item>
            <p>0~100瓦</p>
            <p>0.4元/小时</p>
            </flexbox-item>
            <flexbox-item>
            <p>100~200瓦</p>
            <p>0.5元/小时</p>
            </flexbox-item>
            <flexbox-item>
            <p>200~400瓦</p>
            <p>0.6元/小时</p>
            </flexbox-item>
            <flexbox-item>
            <p>400~600瓦</p>
            <p>0.8元/小时</p>
            </flexbox-item>
          </flexbox>
        </div>
        <p class="tips2" v-if="tabIndex == 0">提示：如发生过载引起意外中断、电池充满充电时间未到、插头被别人拔出等情况，充电剩余金额不予退还。</p>
        <p class="tips2" v-if="tabIndex == 1" style="padding-top: .5rem;">提示：插座意外断开，将返还剩余金额</p>
        <!-- 开始充电 -->
        <div class="startElerc">
          <x-button @click="startElerc" class="startElercBtn">开始充电</x-button>
        </div>
        <!-- 选择支付方式 -->
        <div class="payType">
          <p class="payTypeTl"><span>选择支付方式</span></p>
          <div>
            <checklist :title="zfType" :options="commonList" v-model="radioValue" :max="1" @on-change="change">22</checklist>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { Divider, Flexbox, FlexboxItem, Tab, TabItem, XButton, CheckIcon, Checklist, Checker, CheckerItem } from 'vux'
export default {
  components: {
    Flexbox,
    FlexboxItem,
    Tab,
    TabItem,
    XButton,
    Divider,
    CheckIcon,
    Checklist,
    CheckerItem,
    Checker
  },
  data () {
    return {
      demo1: false,
      demo2: true,
      tabIndex: '0', // 0：按时收费，1：按量收费
      defaultChecker: 1, // 默认选中的checker
      zfType: '支付方式', // 支付方式标题
      commonList: [ '我的余额', '微信支付' ], // 支付方式选择栏
      radioValue: ['我的余额'], // 默认支付方式
      activeBtn: {
        color: '#fff',
        background: '#4e82d1'
      }, // 选中时的按钮颜色
      defaultBtn: {
        color: '#4e82d1',
        background: '#fff'
      }// 选中时的按钮颜色
    }
  },
  methods: {
    /** 收费tab点击 **/
    onItemClick (index) {
      this.tabIndex = index
      console.log(this.tabIndex)
    },
    /** 开始充电 **/
    startElerc () {

    },
    /** 选择支付方式 **/
    change () {

    },
    /** 选择支付方式 **/
    tabClick (index) {

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
@import '../../../styles/iconfont.less';
  .payPage {
    z-index: 110;
    //充电位置详情
    &_details {
      margin-bottom: .5rem;
      .wh(100%, 5.5rem);
      background: #fff;
      .vux-flexbox-item {
        margin-left: 0!important;
        height: 5.5rem;
      }
      //插座号
      .czNo {
          text-align: center;
        .circle {
          margin: 1rem auto 0;
          .wh(2rem, 2rem);
          background: #e70808;
          border-radius: 50%;
          text-align: center;
          line-height: 2rem;
          color: #fff;
        }
        .circleText {
          font-size: .8rem;
          line-height: 1.8rem;
          color: #000;
        }
      }
      //插座位置
      .czDz {
        .czText1 {
          padding-top: .4rem;
          font-size: .7rem;
          line-height: 1.5rem;
          color: #000;
        }
        .czText2 {
          .iconfont {
            padding-right: .4rem;
            color: #a0a0a0;
          }
          font-size: .5rem;
          color: #a0a0a0;
          line-height: 0.8rem;
        }
      }
      //提示
      .czXq {
        .problem {
          margin: 1rem auto 0;
          .wh(2rem, 2rem);
          color: #fff;
          background: #f39330;
          font-size: 1rem;
          text-align: center;
          line-height: 2rem;
          border-radius: 50%;
        }
      }
    }
    &_byTime {
      background: #fff;
      width: 100%;
      //选择充值金额
      .btns {
        padding: .8rem .25rem 1rem;
        .vux-checker-box .vux-flexbox .vux-flexbox-item {
        }
      }
      //提示
      .tips1 {
        padding:0 .25rem;
        color: #c42510;
        font-size: 0.65rem;
        line-height: 1.2rem;
      }
      .tips2 {
        padding:0 .25rem .1rem;
        color: #b5b5b5;
        font-size: 0.6rem;
        line-height: 1rem;
      }
      //收费标准
      .tipe3 {

        p {
          font-size: .65rem;
          color: #666;
          text-indent: .2rem;
          line-height: 2rem;

        }
        .vux-flexbox .vux-flexbox-item {
          p{
            text-indent: .3rem;
            font-size: .6rem;
            color: #666;
            line-height: 1rem;
          }
          .manBtn {
            margin: 1rem .2rem 0;
            padding: .02rem 0;
            font-size: .6rem;
            color: #fff;
            background: #4e82d1;
          }
        }
      }
      //充电按钮
      .startElerc {
        padding: 0.4rem;
        margin: 0 auto;
        width: 96%;
        background: #efefef;
        text-align: center;
        .startElercBtn{
          background: #4e82d1!important;
          color: #fff;
          font-size: .8rem;
        }
      }
      //选择支付方式
      .payType {
        .payTypeTl {
          padding-left: .3rem;
          font-size: .8rem;
          line-height: 2rem;
          border-bottom: 1px solid #efefef;
        }
      }
    }
  }
  //默认按钮颜色
  .demo4-item {
    padding: .2rem 0;
    width: 3.58rem;
    color: #4e82d1;
    font-size: .6rem;
    background: #fff;
    border: 1px solid #4e82d1;
    text-align: center;
    border-radius: .2rem;
  }
  //选中按钮颜色
  .demo4-item-selected {
    color: #fff;
    background: #4e82d1;
  }
</style>
