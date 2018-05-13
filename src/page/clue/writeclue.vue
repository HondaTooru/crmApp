<template>
  <write-record :recordtype="k"></write-record>
</template>

<script>
import WriteRecord from '@/page/common/writerecord'

export default {
  name: 'writeclue',
  data () {
    return {
      k: {
        name: 'lead',
        alias: '线索'
      }
    }
  },
  components: {
    WriteRecord
  }
}
</script>

<style lang="less">
</style>
