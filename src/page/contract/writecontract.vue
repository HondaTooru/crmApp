<template>
  <write-record :recordtype="k"></write-record>
</template>

<script>
import WriteRecord from '@/page/common/writerecord'
import { ContractStatusApi } from '@/api/api'

export default {
  name: 'writecontract',
  data () {
    return {
      k: {
        name: 'contract',
        alias: '合同',
        status: '跟进记录',
        listStauts: [],
        value: [],
        customer: JSON.parse(localStorage.getItem('DETAIL_INFO')).detail.body.title
      }
    }
  },
  created () {
    this.getStatus()
  },
  methods: {
    getStatus () {
      ContractStatusApi().then(res => { res.data.forEach(item => { this.k.listStauts.push(item.showname) }) })
    }
  },
  components: {
    WriteRecord
  }
}
</script>

<style lang="less">
</style>
