<template>
  <div class="bindMobile">
    <group style="margin-top: 2rem;">
      <x-input title="title" v-model="mobile" class="mobileInp" placeholder="请输入手机号" @on-focus="onBlur">
        <i class="iconfont" slot="label" style="display:block;margin-right:5px;color: #999;" width="24" height="24">&#xe630;</i>
      </x-input>
    </group>
    <group style="margin-top: 2rem;">
      <x-input class="weui-vcode mobileCode" placeholder="请输入验证码" title=""> 
      </x-input>
       <x-input class="weui-vcode mobileCode2" placeholder="" style=""> 
        <div slot="right" @click="getCode" class="countBtn">
          <span v-if="!show" style="padding-left: .8rem;">{{showText}}</span>
          <countdown 
            v-model="time1" 
            @on-finish="finish" 
            v-if="show" 
            :start="start" 
          >
          </countdown>
          <span v-if="show">{{showText2}}</span>
        </div>
        </x-input>
    </group>
     <div>
      <x-button class="bindBtn" @click.native="iconType = 'success'">绑定手机号</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Countdown } from 'vux'
export default {
  data () {
    return {
      mobile: '', // 手机号
      start: false, // 是否开始倒计时
      show: false, // 倒计时
      time1: 60, // 倒计时60s
      showText: '发送验证码', // 倒计时文本
      showText2: 's后重新获取' // 倒计时文本
    }
  },
  components: {
    XInput,
    Group,
    XButton,
    Countdown
  },
  methods: {
    /**
     *@function getCode
     *@description 获取短信验证码
     */
    getCode () {
      this.show = true
      this.start = true
    },
    /**
     *@function finish
     *@description 获取短信验证码
     */
    finish () {
      this.show = false
      this.showText = '重新获取'
      this.start = false
      this.time1 = 60
    },
    onBlur (value, $event) {
      let reg = /0?(13|14|15|17|18|19)[0-9]{9}/
      if (reg.test(value)) {
        console.log('手机号正常')
      } else {
        console.log('手机号格式错误')
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/iconfont.less';
.bindMobile {
  padding: 0 .5rem;
  .mobileInp {
    margin: 0 auto;
    border: 1px solid #999;
    border-radius: .2rem;
  }
  .mobileCode {
    float: left;
    width: 50%;
    border: 1px solid #999;
    border-radius: .2rem !important;
  }
  .mobileCode2 {
    float: right;
    width: 35%;
    padding-right: 0.2rem;
    padding-left: .2rem;
    border: 1px solid #999;
    border-radius: .2rem !important;
    .countBtn {
      width: 100%!important;
      height: 24px!important;
      line-height: 1.2rem!important;
      font-size: .75rem;
      span {
        line-height: 24px!important;
      }
    }
    .weui-cell__bd {
      flex: 0!important;
      -webkit-flex: 0!important;
    }
  }
}
.bindBtn {
  margin-top: 2.5rem;
  background: #2ca1fa!important;
  color: #fff!important;
}
::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
    font-size: .75rem;
}
.bindMobile .weui-cells {
  background: transparent!important;
  border-color: transparent!important;
}
.bindMobile .weui-cells:before {
  border: 0!important;
}
.bindMobile .weui-cells:after {
  border: 0!important;
}
</style>


