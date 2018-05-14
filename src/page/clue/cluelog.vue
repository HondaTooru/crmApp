<template>
  <log-content :type="k"></log-content>
</template>

<script>
import LogContent from '@/page/common/log'

export default {
  name: 'cluelog',
  data () {
    return {
      k: {
        api: 'clue',
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
