<template>
  <add-note :k="n"></add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { ERR_OK, USER_KEY, AllClueAddAPi } from '@/api/api'

export default {
  name: 'addClue',
  data () {
    return {
      n: {
        name: 'clue',
        status: [],
        source: [],
        user_id: [],
        want_department_id: [],
        pre_user_id: [],
        pre_department_id: []
      },
      parmas: {
        customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id,
        uid: JSON.parse(localStorage.getItem(USER_KEY)).id
      }
    }
  },
  methods: {
    getList () {
      AllClueAddAPi(this.parmas).then(res => {
        if (ERR_OK === res[0].code) { res[0].data.forEach(item => { this.n.status.push(item.name) }) }
        if (ERR_OK === res[1].code) { res[1].data.forEach(item => { this.n.source.push(item.name) }) }
        if (ERR_OK === res[2].code) { res[2].data.forEach(item => { this.n.user_id.push(item.username) }) }
        if (ERR_OK === res[3].code) { res[3].data.forEach(item => { this.n.want_department_id.push(item.name) }) }
        this.n.pre_user_id = this.n.user_id
        this.n.pre_department_id = this.n.want_department_id
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
