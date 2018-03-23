<template>
  <div class="modifyNickname">
    <group>
      <x-input v-model="value" placeholder="昵称"></x-input>
      <div class="borderP">
        <p class="tips">修改您喜欢的用户名</p>
      </div>
    </group>
    <x-button class="saveBtn" style="width: 90%;color: #fff;margin-top: 1rem;background:#2196f3;">保存</x-button>
  </div> 
</template>

<script>
import { Group, XInput, XButton } from 'vux'
export default {
  data () {
    return {
      value: ''
    }
  },
  components: {
    Group,
    XInput,
    XButton
  }
}
</script>

<style lang="less">
  .borderP {
    padding: 0 0.75rem;
    .tips {
      margin: 0 auto;
      padding: 0.4rem 0;
      color: #ccc;
      border-top: 1px solid #2196f3;
      font-size: 0.7rem;
    }
  }
  .modifyNickname {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background: #FBF9FE;
  }
</style>
