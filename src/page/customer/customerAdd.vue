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
        status: []
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
