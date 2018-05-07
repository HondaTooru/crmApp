<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { CustomerApi, AllAdminApi, ERR_OK, AllCustomer } from '@/api/api'

export default {
  name: 'addCustomer',
  data () {
    return {
      n: {
        name: 'customer',
        status: [],
        source: [],
        customer_type: [],
        industry: [],
        user_id: [],
        cooperation: [],
        parent_customer: []
      }
    }
  },
  methods: {
    getList () {
      CustomerApi().then(res => {
        res[0].data.forEach(item => { this.n.status.push(item.showname) })
        res[1].data.forEach(item => { this.n.source.push(item.showname) })
        res[2].data.forEach(item => { this.n.industry.push(item.showname) })
        res[3].data.forEach(item => { this.n.customer_type.push(item.showname) })
      })
    },
    getAdmin () {
      AllAdminApi().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.n.user_id.push(item.username) })
        }
        this.n.cooperation = this.n.user_id
      })
    },
    getAllCustomer () {
      AllCustomer().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.parent_customer.push(item.username)
          })
        }
      })
    }
  },
  created () {
    this.getList()
    this.getAdmin()
    this.getAllCustomer()
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
