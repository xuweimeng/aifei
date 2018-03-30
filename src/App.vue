<template>
  <div id="app">
    <!-- <loading v-model="isLoading"></loading> -->
    <!-- <list></list> -->
    <transition name="slide2">
      <router-view></router-view>
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

body {
  background-color: #fbf9fe;
}
#app {
  z-index: 100;
}

.slide2-enter-active, .slide2-leave-active{
  transition: all .3s;
}
.slide2-enter, .slide2-leave-to {
  transform: translate3d(80%, 0, 0)
}

</style>
