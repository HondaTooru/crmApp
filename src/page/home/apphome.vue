<template>
  <div>
    <section>
      <m-swiper></m-swiper>
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
  components: {
    MSwiper,
    MWork,
    MSchedule
  }
}
</script>

<style lang="less">
section{
  background: white;
  margin: 0 10px;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}
</style>
