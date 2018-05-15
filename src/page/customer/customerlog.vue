<template>
  <log-content :type="k"></log-content>
</template>

<script>
import LogContent from '@/page/common/log'

export default {
  name: 'customer',
  data () {
    return {
      k: {
        api: 'customer',
        id: this.$route.params.id
      }
    }
  },
  components: {
    LogContent
  }

}
</script>

<style lang="css">
</style>
