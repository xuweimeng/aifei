<template>
  <div class="bindMobile">
    <group style="margin-top: 2rem;">
      <x-input title="title" 
        v-model="mobile" 
        class="mobileInp" 
        placeholder="请输入手机号" 
        @on-blur="onBlur"
        @on-focus="onFocus"
        keyboard="number"
        is-type="china-mobile"
        mask="999 9999 9999"
        :max="13"
        required>
      >
        <i class="iconfont" slot="label" style="display:block;margin-right:5px;color: #999;" width="24" height="24">&#xe630;</i>
      </x-input>
    </group>
    <group style="margin-top: 2rem;">
      <x-input class="weui-vcode mobileCode" placeholder="请输入验证码" title="" v-model="smsCode"> 
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
      <x-button 
      class="bindBtn" 
      @click.native="bindBtn" 
      :show-loading="isShowLoading"
      :text="isShowText"
      :disabled="isDisabled"
      >绑定手机号</x-button>
    </div>
    <!-- 手机号验证弹框 -->
    <alert v-model="alertMobile" title="提示">{{alertText}}</alert>
  </div>
</template>

<script>
import { XInput, Group, XButton, Countdown, Alert, cookie } from 'vux'
import { API } from '../../serve/index'
// import { setTimeout } from 'timers';
export default {
  data () {
    return {
      openid: '', // openid
      mobile: '', // 手机号
      start: false, // 是否开始倒计时
      show: false, // 倒计时
      time1: 60, // 倒计时60s
      showText: '发送验证码', // 倒计时文本
      showText2: 's后重新获取', // 倒计时文本
      isSms: false, // 是否获取过短信验证码
      alertMobile: false, // 弹框是否显示
      alertText: '', // 弹框text
      isShowLoading: false, // 是否显示提交loading
      isShowText: '绑定中...', // 绑定中
      isDisabled: false, // 是否disabled
      smsCode: '' // 验证码
    }
  },
  components: {
    XInput,
    Group,
    XButton,
    Countdown,
    Alert
  },
  mounted () {
    this.getCookieOpenid()
  },
  methods: {
    /**
     * @description 判断本地cookie是否存储oppenid，否则调用getMyInfo
     */
    getCookieOpenid () {
      let cookieOpenId = cookie.get('openid')
      let phoneNum = cookie.get('phonenum')
      if (cookieOpenId) {
        this.openid = cookieOpenId
      }
      if (phoneNum) {
        this.mobile = phoneNum
      }
    },
    /**
     *@function getCode
     *@description 获取短信验证码
     */
    getCode () {
      let reg = /0?(13|14|15|17|18|19)[0-9]{9}/
      let mobile = this.mobile.replace(/\s|\xA0/g, '')
      if (reg.test(mobile)) {
        this.show = true
        this.start = true
      } else {
        this.alertMobile = true
        this.alertText = '手机号格式不对！'
      }
      // 如果开始倒计时，执行ajax函数
      if (this.start) {
        this.getSmsCode()
      }
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
    /** 获得焦点 */
    onFocus () {
      let phonenum = cookie.get('phonenum')
      if (phonenum) {
        this.alertMobile = true
        this.alertText = '您已绑定手机号！'
      }
    },
    /**
     * 为什么无效，function无效
     */
    onBlur (value, $event) {
      let reg = /0?(13|14|15|17|18|19)[0-9]{9}/
      if (reg.test(value)) {
        console.log('手机号正常')
      } else {
        console.log('手机号格式错误')
      }
    },
    /**
     * @description 获取短信验证码
     * @param {String} phone 手机号
     */
    getSmsCode () {
      API.powerDetails.sendPhoneCode({
        'phone': this.mobile
      }).then((res) => {
        console.log(res)
        if (res.code === 0) {
        } else {
          this.alertMobile = true
          this.alertText = res.message
        }
      }).catch((error) => {
        this.alertMobile = true
        this.alertText = error.message
        console.log(error)
      })
    },
    /**
     * @description 绑定手机
     * @function bindBtn
     */
    bindBtn () {
      if (this.smsCode === '') {
        this.alertMobile = true
        this.alertText = '验证码不能为空！'
      } else {
        this.bindFunc()
      }
    },
    bindFunc () {
      API.powerDetails.bindPhone({
        'openid': this.openid,
        'code': this.smsCode,
        'phone': this.mobile
      }).then((res) => {
        if (res.code === 0) {
          this.alertMobile = true
          this.alertText = res.message
          setTimeout(function () {
            this.$router.push({path: '/list'})
          }, 1000)
        }
      }).catch((error) => {
        this.alertMobile = true
        this.alertText = error.message
      })
    }
  }
}
</script>

<style lang="less">
@import '../../styles/iconfont.less';
.bindMobile {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #FBF9FE;
  z-index: 500;
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


