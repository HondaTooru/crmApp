<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { } from '@/api/api'

export default {
  name: 'addContact',
  data () {
    return {
      n: {
        name: 'Contact'
      }
    }
  },
  methods: {
  },
  created () {
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
