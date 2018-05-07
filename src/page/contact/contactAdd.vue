<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { contactList } from '@/api/api'

export default {
  name: 'addContact',
  data () {
    return {
      n: {
        name: 'Contact',
        user_id: [],
        customer: []
      }
    }
  },
  methods: {
    getList () {
      contactList().then(res => {
        res[0].data.forEach(item => { this.n.user_id.push(item.username) })
        res[1].data.forEach(item => { this.n.customer.push(item.username) })
      })
    }
  },
  created () {
    this.getList()
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
