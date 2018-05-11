<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'

export default {
  name: 'productAdd',
  data () {
    return {
      n: {
        name: 'product',
        user_id: []
      }
    }
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
