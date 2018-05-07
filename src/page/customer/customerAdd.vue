<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { USER_KEY, CustomerApi } from '@/api/api'

export default {
  name: 'addCustomer',
  data () {
    return {
      n: {
        name: 'customer',
        status: [],
        source: [],
        customer_type: []
      },
      parmas: {
        customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id,
        uid: JSON.parse(localStorage.getItem(USER_KEY)).id
      }
    }
  },
  methods: {
    getList () {
      CustomerApi().then(res => {
        console.log(res)
        res[0].data.forEach(item => { this.n.status.push(item.showname) })
        res[1].data.forEach(item => { this.n.source.push(item.showname) })
        res[2].data.forEach(item => { this.n.status.push(item.showname) })
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
