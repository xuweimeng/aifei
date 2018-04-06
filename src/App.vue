<template>
  <div id="app">
    <!-- <loading v-model="isLoading"></loading> -->
    <transition name="slide2">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>

import { Loading } from 'vux'
// import { mapState } from 'vuex'
import List from '@/view/list/list'
import infoHeader from '@/view/infoHeader/infoHeader'

export default {
  name: 'app',
  components: {
    Loading,
    List,
    infoHeader
  },
  computed: {
    // ...mapState({
    //   isLoading: state => state.vux.isLoading
    // })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import 'styles/animate.css';
// @import 'styles/iconfont.less';

body {
  background-color: #fbf9fe;
}
#app {
  z-index: 100;
}

.slide2-enter-active, .slide2-leave-active{
  transition: all .5s;
}
.slide2-enter, .slide2-leave-to {
  transform: translate3d(80%, 0, 0)
}

</style>
