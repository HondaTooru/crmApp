<template>
  <div class="nobar">
    <div v-transfer-dom>
     <popup v-model="xw" max-height="50%">
       <div>
         <group :gutter="0">
           <radio :options="v.w" @on-change="ks"></radio>
         </group>
       </div>
     </popup>
    </div>
    <div v-transfer-dom>
     <popup v-model="xl" max-height="50%">
       <div>
         <group :gutter="0">
           <radio :options="v.e" @on-change="km"></radio>
         </group>
       </div>
     </popup>
    </div>
    <div v-transfer-dom>
     <popup v-model="xm" max-height="50%">
       <div>
         <group :gutter="0">
           <radio :options="v.t" @on-change="kx"></radio>
         </group>
       </div>
     </popup>
    </div>
  <group :gutter="0">
    <datetime title="回款日期" v-model="k.back_date"></datetime>
    <cell title="对应客户" v-model="k.customer" is-link @click.native="xw = !xw"></cell>
    <cell title="合同标题" v-model="k.title" is-link :disabled="!this.v.e.length" @click.native="show"></cell>
    <cell title="回款金额" v-model="k.back_money"></cell>
    <cell title="回款期次" v-model="v.m" :disabled="!this.v.t.length" is-link @click.native="show1"></cell>
    <popup-picker title="付款方式" :data="[v.y]" v-if="v.y.length" v-model="k.pay_way"></popup-picker>
    <popup-picker title="回款类型" :data="[v.u]" v-if="v.u.length" v-model="k.pay_type"></popup-picker>
    <popup-picker title="收款人" :data="[v.i]" v-if="v.i.length" v-model="k.user_id"></popup-picker>
    <cell title="备注" v-model="k.remark"></cell>
   </group>
   <div class="btn">
   <x-button type="warn" :disabled="false" @click.native="sb">确认</x-button>
   </div>
   </div>
</template>

<script>
import { Datetime, PopupPicker, XButton, XInput, dateFormat, Radio, Popup } from 'vux'
import { payRecord, pContractApi, qishuApi, addRecordApi, ERR_OK } from '@/api/api'
// , ,
export default {
  name: 'paymentrecord',
  data () {
    return {
      xl: false,
      xw: false,
      xm: false,
      v: {
        w: [],
        e: [],
        t: [],
        y: [],
        u: [],
        i: [],
        m: ''
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
    XInput,
    Radio,
    Popup
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      payRecord().then(res => {
        res[0].data.forEach(item => { this.v.y.push(item.showname) })
        res[1].data.forEach(item => { this.v.u.push(item.showname) })
        res[2].data.forEach(item => { this.v.i.push(item.username) })
        res[3].data.forEach(item => { this.v.w.push({key: item.id, value: item.username}) })
      })
    },
    show () {
      if (this.v.e.length) this.xl = !this.xl
    },
    show1 () {
      if (this.v.t.length) this.xm = !this.xm
    },
    ks (m, n) {
      this.k.cid = m
      this.k.customer = n
      this.xw = !this.xw
      this.v.e = this.v.t = []
      this.k.back_money = this.k.remark = this.k.title = this.k.qishu = ''
      pContractApi({customer: n, is_open: 1}).then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.v.e.push({ key: item.id, value: item.title }) })
        }
      })
    },
    km (m, n) {
      this.k.title = n
      this.xl = !this.xl
      this.v.t = []
      this.k.back_money = this.k.remark = this.v.m = this.k.qishu = ''
      this.k.contract_id = m
      qishuApi({title: n, customer: this.k.cid}).then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => { this.v.t.push({ key: item.id, value: '第' + item.qishu + '期', id: item.id, money: item.plan_back_money, rate: item.plan_back_rate, remark: item.remark, date: item.plan_back_date }) })
        }
      })
    },
    kx (m, n) {
      this.xm = !this.xm
      this.v.m = n
      this.v.t.forEach(item => {
        if (item.key === m) {
          this.k.back_money = item.money
          this.k.remark = item.remark
          this.k.qishu = item.id
        }
      })
    },
    sb () {
      let g = Object.assign({}, this.k)
      let _that = this
      g.user_id = g.user_id.toString()
      g.pay_type = g.pay_type.toString()
      g.pay_way = g.pay_way.toString()
      for (let i in g) {
        if (!g[i]) {
          this.$vux.toast.show({ text: '请把信息填完整~', width: '11em', position: 'center' })
          return
        }
      }
      addRecordApi(g).then(res => {
        console.log(res)
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            position: 'center',
            type: 'success',
            onHide () { _that.$router.back() }
          })
        } else {
          this.$vux.toast.show({
            text: res.msg,
            position: 'center',
            width: '12em'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.btn {margin: 20px 15px}
</style>
