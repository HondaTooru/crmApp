<template>
  <div class="chart">
    <v-chart ref="chart" :data="data" :width="width" v-if="data.length">
       <v-scale x field="username" />
       <v-scale y field="values" />
       <v-bar series-field="name" :adjust="{
         type: 'dodge',
         marginRatio: 1.1 // 设置分组间柱子的间距
       }" />
       <v-tooltip show-value-in-legend />
     </v-chart>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, XButton, VScale } from 'vux'
import { VisitList } from '@/api/api'
export default {
  name: 'column',
  props: {
    colum: Object
  },
  data () {
    return {
      data: [],
      width: window.innerWidth - 20
    }
  },
  created () {
    this.SalesFunnelList()
  },
  methods: {
    SalesFunnelList (flag) {
      let g = {
        revisit_time_str: '',
        time_str: this.colum.type,
        revisit_man_dep: this.colum.man_dep,
        revisit_man: this.colum.revisit_man
      }
      VisitList(g).then(res => {
        res.data.length > 6 ? this.width = res.data.length * 60 : this.width = window.innerWidth - 20
        if (res.data.length) {
          if (flag) this.data = []
          res.data.forEach(item => {
            for (let i in item) {
              if (i === 'total_count') this.data.push({name: '总跟进次数', username: item.username, values: item[i]})
              if (i === 'lead_count') this.data.push({name: '总线索跟进次数', username: item.username, values: item[i]})
              if (i === 'customer_count') this.data.push({name: '客户跟进数', username: item.username, values: item[i]})
              if (i === 'opportunity_count') this.data.push({name: '商机跟进次数', username: item.username, values: item[i]})
              if (i === 'contract_count') this.data.push({name: '合同跟进次数', username: item.username, values: item[i]})
            }
          })
        } else { this.$vux.toast.show({ text: '暂无数据~', position: 'bottom' }) }
        setTimeout(() => {
          if (this.$refs.chart) this.$refs.chart.rerender()
        }, 50)
        this.$emit('getItem', res.data)
      })
    }
  },
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton,
    VScale
  }
}
</script>

<style lang="less" scoped>
.chart {
  overflow-x: scroll;
  webkit-overflow-scrolling: touch;
}
</style>
