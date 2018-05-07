<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { AllAdminApi, ERR_OK, AllCustomer, PayWayApi, ContractTypeApi, ContractStatus } from '@/api/api'

export default {
  name: 'contractAdd',
  data () {
    return {
      n: {
        name: 'contract',
        user_id: [],
        user_id_2: [],
        customer: [],
        pay_way: [],
        con_type: [],
        pi_status: []
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
      this.n.user_id_2 = this.n.user_id
    },
    CustomerList () {
      AllCustomer().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.customer.push(item.username)
          })
        }
      })
    },
    getPayWay () {
      PayWayApi({name: 'customer_source'}).then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.pay_way.push(item.showname)
          })
        }
      })
    },
    getContract () {
      ContractTypeApi().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.con_type.push(item.showname)
          })
        }
      })
    },
    getContractStatus () {
      ContractStatus().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.pi_status.push(item.showname)
          })
        }
      })
    }
  },
  created () {
    console.log(this.n.pay_way)
    this.getAllCustomer()
    this.CustomerList()
    this.getPayWay()
    this.getContract()
    this.getContractStatus()
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
