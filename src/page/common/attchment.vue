<template>
  <div>
    <empty-data v-if="!list.length"></empty-data>
  </div>
</template>

<script>
import EmptyData from '@/page/common/emptydata'

export default {
  name: 'attchment',
  data () {
    return {
      list: []
    }
  },
  props: {
    name: Object
  },
  components: {
    EmptyData
  }
}
</script>

<style lang="less">
</style>
