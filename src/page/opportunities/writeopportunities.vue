<template>
  <write-record :recordtype="k"></write-record>
</template>

<script>
import WriteRecord from '@/page/common/writerecord'
import { OppoStage } from '@/api/api'

export default {
  name: 'writeclue',
  data () {
    return {
      k: {
        name: 'opportunity',
        alias: '商机',
        status: '销售阶段',
        listStauts: [],
        value: [],
        customer: JSON.parse(localStorage.getItem('DETAIL_INFO')).body.title
      }
    }
  },
  created () {
    this.getStatus()
  },
  methods: {
    getStatus () {
      OppoStage({stype: 'sale_stage'}).then(res => { res.data.forEach(item => { this.k.listStauts.push(item.showname) }) })
    }
  },
  components: {
    WriteRecord
  }
}
</script>

<style lang="less">
</style>
