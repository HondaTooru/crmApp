<template>
  <write-record :recordtype="k"></write-record>
</template>

<script>
import WriteRecord from '@/page/common/writerecord'
import { AllStatusApi } from '@/api/api'

export default {
  name: 'writeclue',
  data () {
    return {
      k: {
        name: 'lead',
        alias: '线索',
        status: '跟进记录',
        listStauts: [],
        value: [],
        customer: JSON.parse(localStorage.getItem('DETAIL_INFO')).body.username
      }
    }
  },
  created () {
    this.getStatus()
  },
  methods: {
    getStatus () {
      AllStatusApi().then(res => { res.data.forEach(item => { this.k.listStauts.push(item.name) }) })
    }
  },
  components: {
    WriteRecord
  }
}
</script>

<style lang="less">
</style>
