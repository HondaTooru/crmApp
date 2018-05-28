<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { ProCategroy } from '@/api/api'

export default {
  name: 'productAdd',
  data () {
    return {
      n: {
        name: 'product',
        user_id: [],
        cate_id: []
      }
    }
  },
  created () {
    ProCategroy().then(res => { res.data.forEach(item => { this.n.cate_id.push(item.name) }) })
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
