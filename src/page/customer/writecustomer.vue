<template>
  <write-record :recordtype="k"></write-record>
</template>

<script>
import WriteRecord from '@/page/common/writerecord'
import { CousterType } from '@/api/api'

export default {
  name: 'writecustomer',
  data () {
    return {
      k: {
        name: 'customer',
        alias: '客户名称',
        status: '跟进记录',
        listStauts: [],
        value: [],
        customer: JSON.parse(localStorage.getItem('DETAIL_INFO')).detail.body.username
      }
    }
  },
  components: {
    WriteRecord
  },
  created () {
    this.getStatus()
  },
  methods: {
    getStatus () {
      CousterType().then(res => { res.data.forEach(item => { this.k.listStauts.push(item.showname) }) })
    }
  }
}
</script>

<style lang="less">
</style>
