<template>
  <add-note :k="n">

  </add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { AllStatusApi, ERR_OK, AllSourceApi, AllAdminApi, AllDepartmentApi, USER_KEY } from '@/api/api'

export default {
  name: 'addClue',
  data () {
    return {
      n: {
        name: 'clue',
        status: [],
        source: [],
        user_id: [],
        want_department_id: []
      },
      parmas: {
        customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id,
        uid: JSON.parse(localStorage.getItem(USER_KEY)).id
      }
    }
  },
  methods: {
    getStatus () {
      AllStatusApi(this.parmas).then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.n.status.push(item.name) })
        }
      })
    },
    getSource () {
      AllSourceApi(this.parmas).then(res => {
        console.log(res)
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.n.source.push(item.name) })
        }
      })
    },
    getUser () {
      AllAdminApi(this.parmas).then(res => {
        console.log(res)
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.n.user_id.push(item.username) })
        }
      })
    },
    getDepart () {
      AllDepartmentApi(this.parmas).then(res => {
        console.log(res)
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.n.want_department_id.push(item.name) })
        }
      })
    }
  },
  created () {
    this.getStatus()
    this.getSource()
    this.getDepart()
    this.getUser()
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
