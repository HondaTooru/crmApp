<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { AllAdminApi, ERR_OK, AllCustomer } from '@/api/api'

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
    getAllCustomer () {
      AllAdminApi().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.user_id.push(item.username)
          })
        }
      })
    },
    CustomerList () {
      AllCustomer().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.customer.push(item.username)
          })
        }
      })
    }
  },
  created () {
    this.getAllCustomer()
    this.CustomerList()
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
