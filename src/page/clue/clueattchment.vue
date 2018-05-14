<template>
<attch-ment :name="k"></attch-ment>
</template>

<script>
import AttchMent from '@/page/common/attchment'

export default {
  name: 'clueattchment',
  data () {
    return {
      k: {
        name: 'clue',
        id: this.$route.params.id
      }
    }
  },
  components: {
    AttchMent
  }
}
</script>

<style lang="less">
</style>
