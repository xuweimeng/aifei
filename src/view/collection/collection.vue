<template>
  <div class="collection">
    <p class="question">已经付了钱,设备却没有供电。</p>
    <p class="answer">请检查一下，您的充电器是否有连接好插座。</p>
    <p class="question">地下室没有信号，手机无法扫码。</p>
    <p class="answer">请您记住该站点名称，连接好插座并记住插座编号，然后到有信号的环境点慧充新能源微信公众号-扫码充电-选择编号-付款。</p>
    <p class="question">我的电瓶车放在楼下充电安不安全?</p>
    <p class="answer">设备带有充满自停，过载保护，火灾报警以及充电器被拔通知，全方位保障您的充电安全。</p>
    <p class="question">怎么时间没到就停止充电了呢?</p>
    <p class="answer">您好，设备带有充电自停功能，系统检测到您的电池充满了，为了防止过充等安全隐患，社别回停止充电。</p>
    <p class="question">插座拔出了，怎么就断电了呢?</p>
    <p class="answer">设备检测到您的充电器被拔出了，此时插座内依然带电，为了保障您的安全，如在1分钟左右未将插头插回去，该插座会断电。</p>
    
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
  .collection {
    margin: .4rem;
    .question {
      padding: 1.75rem 0 .75rem 1.25rem;
      font-size: .8rem;
      text-indent: 2.5rem;
      color: #f8ad2d;
      border-bottom: 1px dashed #ddd;
      border-top: 1px solid #ddd;
      background: url('../../assets/problems/question.png') no-repeat 1.5rem center ;
    }
    .answer {
      padding: 1.75rem 0 .75rem 2.25rem;
      font-size: .7rem;
      text-indent: 1.5rem;
      line-height: 2rem;
      background: url('../../assets/problems/answer.png') no-repeat 1.5rem 1.8rem;
    }
  }
</style>


