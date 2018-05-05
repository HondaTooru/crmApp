<template>
  <add-note :k="n">

  </add-note>
</template>

<script>
import AddNote from '@/page/common/addnote'
import { AllStatusApi, ERR_OK } from '@/api/api'

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
    }
  },
  created () {
    this.getStatus()
  },
  components: {
    AddNote
  }
}
</script>

<style lang="less">

</style>
