<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { ERR_OK, AllCustomer, oppoApi, AllAdminApi, AllDepartmentApi } from '@/api/api'

export default {
  name: 'addCustomer',
  data () {
    return {
      n: {
        name: 'opportunities',
        customer: [],
        oppo_source: [],
        oppo_type: [],
        sales_phase: [],
        user_id: [],
        user_id_2: [],
        want_department_id: [],
        per_department: [],
        per_user: []
      }
    }
  },
  methods: {
    CustomerList () {
      AllCustomer().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.customer.push(item.username)
          })
        }
      })
    },
    getOppo () {
      oppoApi().then(res => {
        res[0].data.forEach(item => { this.n.oppo_source.push(item.showname) })
        res[1].data.forEach(item => { this.n.sales_phase.push(item.showname) })
        res[2].data.forEach(item => { this.n.oppo_type.push(item.showname) })
      })
    },
    getAllCustomer () {
      AllAdminApi().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.user_id.push(item.username)
          })
        }
        this.n.user_id_2 = this.n.per_user = this.n.user_id
      })
    },
    getDepartment () {
      AllDepartmentApi().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.want_department_id.push(item.name)
          })
        }
        this.n.per_department = this.n.want_department_id
      })
    }
  },
  created () {
    this.CustomerList()
    this.getOppo()
    this.getAllCustomer()
    this.getDepartment()
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
