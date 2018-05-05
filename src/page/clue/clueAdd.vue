<template>
  <add-note :k="n">

  </add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { AllStatusApi, ERR_OK, AllSourceApi, AllAdminApi, AllDepartmentApi } from '@/api/api'

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
      }
    }
  },
  methods: {
    getStatus () {
      AllStatusApi().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.n.status.push(item.name) })
        }
      })
    },
    getSource () {
      AllSourceApi().then(res => {
        console.log(res)
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.n.source.push(item.name) })
        }
      })
    },
    getUser () {
      AllAdminApi().then(res => {
        console.log(res)
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.n.user_id.push(item.username) })
        }
      })
    },
    getDepart () {
      AllDepartmentApi().then(res => {
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
