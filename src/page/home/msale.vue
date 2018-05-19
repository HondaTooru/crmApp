<template>
<div class="msale">
  <div class="title vux-1px-b">业绩排行</div>
  <div class="select vux-1px-b">
    <div class="admin"><popup-picker :data='admin' v-if="admin.length" v-model="RecordList.time_str" placeholder="请选择" :columns="1" show-name @on-change="mx"></popup-picker></div>
    <div class="deparment"><popup-picker :data='list' v-if="list.length" v-model="RecordList.module" placeholder="请选择" :columns="1" show-name @on-change="mo"></popup-picker></div>
  </div>
  <div class="chart">
    <v-chart
      ref="yeji"
      :data="data">
      <v-bar />
      <v-tooltip :show-item-marker="true" />
    </v-chart>
  </div>
</div>
</template>

<script>
import { PopupPicker, VChart, VLine, VArea, VTooltip, VLegend, VBar } from 'vux'
import { Top3Api } from '@/api/api'

export default {
  name: 'msale',
  data () {
    return {
      RecordList: {
        time_str: ['month'],
        module: ['1']
      },
      admin: [
      {value: 'month', name: '本月'},
      {value: 'last month', name: '上个月'},
      {value: 'three month', name: '本季'},
      {value: 'last three month', name: '上季'},
      {value: 'year', name: '今年'},
      {value: 'last year', name: '去年'}
      ],
      list: [{ value: '1', name: '赢单商机金额' }, { value: '2', name: '合同数' }],
      data: [
      ]
    }
  },
  components: {
    PopupPicker,
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar
  },
  created () {
    this.getTop3()
  },
  methods: {
    mx () {},
    mo () {},
    getTop3 () {
      Top3Api(this.RecordList).then(res => {
        if (res.data.length) {
          res.data.forEach(item => {
            this.data.push({name: item.username, value: Number(item.amount)})
          })
        }
        this.$refs.yeji.rerender()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.msale{
  .title {
    padding:0 15px;
    font-size: 14px;
    height: 35px;
    line-height: 40px;
    color: #1cb0f1;
    position: relative;
  }
  .select {
    overflow: hidden;
    font-size: 14px;
    .deparment {
      float:left;
    }
    .admin {float:right}
  }
}
</style>
