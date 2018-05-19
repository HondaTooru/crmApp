<template>
 <div class="mwork">
   <div class="title vux-1px-b">
     <!-- <span class="clear" @click="clearBtn">清空</span> -->
     跟进记录</div>
   <div class="select vux-1px-b">
     <div class="admin"><popup-picker :data='admin' v-if="admin.length" v-model="RecordList.revisit_man" placeholder="请选择" :columns="1" show-name @on-change="selectUser"></popup-picker></div>
     <div class="deparment"><popup-picker :data='list' v-if="list.length" v-model="RecordList.revisit_man_dep" placeholder="请选择" :columns="1" show-name @on-change="selectDepart"></popup-picker></div>
   </div>
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

 </div>
</template>

<script>
import { PopupPicker, VChart, VLine, VArea, VTooltip, VLegend, VBar, XButton, VScale } from 'vux'
import { AllDepartmentApi, AllAdminApi, VisitList, DepUser } from '@/api/api'

export default {
  name: 'mwork',
  data () {
    return {
      list: [],
      admin: [],
      RecordList: {
        time_str: '',
        revisit_time_str: '',
        revisit_man_dep: [],
        revisit_man: []
      },
      data: [],
      width: window.innerWidth - 20
    }
  },
  mounted () {
  },
  created () {
    this.SalesFunnelList()
    this.deparment()
    this.Admin()
  },
  methods: {
    deparment () {
      AllDepartmentApi().then(res => {
        res.data.forEach(item => { this.list.push({value: item.id.toString(), name: item.name}) })
      })
    },
    Admin () {
      AllAdminApi().then(res => {
        res.data.forEach(item => { this.admin.push({ value: item.id.toString(), name: item.username }) })
      })
    },
    // clearBtn () {
    //   this.RecordList.revisit_man_dep = []
    //   this.RecordList.revisit_man = []
    // },
    SalesFunnelList (flag) {
      let g = Object.assign({}, this.RecordList)
      g.revisit_man_dep = g.revisit_man_dep.toString()
      g.revisit_man = g.revisit_man.toString()
      VisitList(g).then(res => {
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
        res.data.length > 6 ? this.width = res.data.length * 60 : this.width = window.innerWidth - 20
        if (this.$refs.chart) this.$refs.chart.rerender()
      })
    },
    selectUser (value) {
      this.SalesFunnelList(true)
    },
    selectDepart (value) {
      this.$nextTick(() => {
        this.SalesFunnelList(true)
        DepUser({revisit_man_dep: value.toString()}).then(res => {
          this.admin = []
          this.RecordList.revisit_man = []
          if (res.data) res.data.forEach(item => { this.admin.push({ value: item.id.toString(), name: item.username }) })
        })
      })
    }
  },
  components: {
    PopupPicker,
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
.mwork {
  .title {
    padding-left: 15px;
    font-size: 14px;
    height: 35px;
    line-height: 40px;
    color: #1cb0f1;
    position: relative;
      .clear {position: absolute;right:0px;display: inline-block;color:#666;height: 100%;padding:0 15px}
  }
  .select {
    overflow: hidden;
    font-size: 14px;
    .deparment {
      float:left;
    }
    .admin {float:right}
  }
  .chart {
    overflow-x: scroll;
    webkit-overflow-scrolling: touch;
  }
}
</style>
