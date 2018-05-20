<template>
  <div>
    <group :gutter="0" v-if="infos">
      <datetime title="回款日期" format="YYYY-MM-DD HH:mm" placeholder="请选择日期"></datetime>
      <x-input title="回款期数" placeholder="请输入回款期数" text-align="right" v-model="infos.pay_type"></x-input>
      <x-input title="回款金额" type="number" placeholder="请输入回款金额" text-align="right" v-model="infos.back_money"></x-input>
      <x-input title="合同标题" v-model="infos.title" disabled text-align="right"></x-input>
      <x-input title="对应客户" v-model="infos.customer" disabled text-align="right"></x-input>
      <popup-picker title="支付方式" :data="list"></popup-picker>
      <popup-picker title="回款类型" :data="list"></popup-picker>
      <x-input title="逾期状态" disabled text-align="right" v-model="infos.status"></x-input>
      <x-input title="逾期天数" disabled text-align="right" v-model="infos.overdue"></x-input>
      <datetime title="审批提交时间" readonly v-model="infos.pi_put_time"></datetime>
      <datetime title="审批完成时间" readonly v-model="infos.pi_end_time"></datetime>
      <x-input title="审批状态" text-align="right" disabled v-model="infos.status"></x-input>
      <x-input title="创建人" text-align="right" disabled v-model="infos.creater"></x-input>
      <x-input title="备注" v-model="infos.remark" text-align="right"></x-input>
    </group>
  </div>
</template>

<script>
import { PlanRecordDetail, payRecord } from '@/api/api'
import { Datetime, XInput, PopupPicker } from 'vux'

export default {
  name: 'detailrecord',
  data () {
    return {
      infos: null,
      contract: []
    }
  },
  created () {
    this.getInfos()
    this.getList()
  },
  methods: {
    getInfos () {
      PlanRecordDetail({row_id: this.$route.params.id}).then(res => {
        this.infos = res.data.detail.body
      })
    },
    getList () {
      payRecord().then(res => {
        console.log(res)
      })
    }
  },
  components: {
    Datetime,
    XInput,
    PopupPicker
  }
}
</script>

<style lang="less">
</style>
