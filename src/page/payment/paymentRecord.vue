<template>
  <div class="nobar">
  <group :gutter="0">
    <datetime title="回款日期" v-model="k.back_date"></datetime>
    <cell title="对应客户" v-model="k.customer" is-link></cell>
    <cell title="合同标题" :data="v.e" v-model="k.title" is-link></cell>
    <cell title="回款金额" v-model="k.back_money"></cell>
    <cell title="回款期次" :data="v.t" :disabled="true" v-model="k.qishu" is-link></cell>
    <popup-picker title="付款方式" :data="[v.y]" v-if="v.y.length" v-model="k.pay_way"></popup-picker>
    <popup-picker title="回款类型" :data="[v.u]" v-if="v.u.length" v-model="k.pay_type"></popup-picker>
    <popup-picker title="收款人" :data="[v.i]" v-if="v.i.length" v-model="k.user_id"></popup-picker>
    <cell title="备注" v-model="k.remark"></cell>
   </group>
   </div>
</template>

<script>
import { Datetime, PopupPicker, XButton, XInput, dateFormat } from 'vux'
import { payRecord, addRecordApi, ERR_OK } from '@/api/api'

export default {
  name: 'paymentrecord',
  data () {
    return {
      v: {
        w: [],
        e: [],
        r: '',
        t: [],
        y: [],
        u: [],
        i: [],
        o: ''
      },
      k: {
        back_date: dateFormat(new Date(), 'YYYY-MM-DD'),
        customer: '',
        cid: '',
        title: '',
        contract_id: '',
        back_money: '',
        qishu: '',
        pay_way: [],
        pay_type: [],
        user_id: [],
        remark: ''
      }
    }
  },
  components: {
    Datetime,
    PopupPicker,
    XButton,
    XInput
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      payRecord().then(res => {
        console.log(res)
        res[0].data.forEach(item => { this.v.y.push(item.showname) })
        res[1].data.forEach(item => { this.v.u.push(item.showname) })
        res[2].data.forEach(item => { this.v.i.push(item.username) })
        res[3].data.forEach(item => { this.v.w.push(item.username) })
      })
    }
  }
}
</script>

<style lang="less">
</style>
