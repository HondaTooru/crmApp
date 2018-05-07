<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { CListApi } from '@/api/api'

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
        pi_status: [],
        opporttunity: []
      }
    }
  },
  methods: {
    getList () {
      CListApi().then(res => {
        res[0].data.forEach(item => { this.n.pay_way.push(item.showname) })
        res[1].data.forEach(item => { this.n.con_type.push(item.showname) })
        res[2].data.forEach(item => { this.n.pi_status.push(item.showname) })
        res[3].data.forEach(item => { this.n.customer.push(item.username) })
        res[4].data.forEach(item => { this.n.user_id.push(item.username) })
        this.n.user_id_2 = this.n.user_id
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
