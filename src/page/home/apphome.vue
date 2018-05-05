<template>
  <div class="crm">
      <section>
        <m-swiper :info="tagList"></m-swiper>
      </section>
      <section>
        <m-work></m-work>
      </section>
      <section>
        <m-schedule></m-schedule>
      </section>
  </div>
</template>

<script>
import MSwiper from './mswiper'
import MWork from './mwork'
import MSchedule from './mschedule'

export default {
  name: 'apphome',
  data () {
    return {
      tagList: null
    }
  },
  components: {
    MSwiper,
    MWork,
    MSchedule
  }
}
</script>

<style lang="less" scoped>
    section{
      margin: 0 10px;
      background: white;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 10px;
  }
  .crm {background:#35495e}
</style>
