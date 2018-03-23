<template>
  <div class="infoHeader">
    <div class="pic left">
      <img src="../../assets/user/userPic.jpg" alt="">
    </div>
    <div class="username left">
      <div class="name">Xxu</div>
      <div class="mobile">17681868102</div>
    </div>
    
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
@import '../../styles/mixin.less';
@import '../../styles/common.less';
  .infoHeader {
    height: 5.3rem;
    width: 100%;
    background: #26a2ff;
    font-size: .8rem;
    padding: 1.4rem 0; 
    .pic {
      .wh(2.5rem,2.5rem);
      margin: 0 1rem;
      img {
        .wh(100%, 100%);
        // .borderRadius(100%, 100%);
        .borderRadius(100%);
      }
    }
    .username {
      .name {
        font-size: 1rem;
        color: @fc;
      }
      .mobile {
        font-size: 0.7rem;
        color: @fc;
      }
    }
  }
</style>


