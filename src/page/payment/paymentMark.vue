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
  <group :gutter="0">
    <datetime title="开票日期" v-model="k.back_date"></datetime>
    <cell title="对应客户" v-model="k.customer" is-link @click.native="xw = !xw"></cell>
    <cell title="合同标题" v-model="k.title" is-link  @click.native="xl = !xl"></cell>
    <x-input title="开票金额" v-model="k.back_money" text-align="right" :show-clear="false"></x-input>
    <x-input title="票据类容" v-model="k.content" text-align="right" :show-clear="false"></x-input>
    <x-input title="票据号码" v-model="k.ticket_code" text-align="right" :show-clear="false"></x-input>
    <popup-picker title="票据类型" :data="[v.y]" v-if="v.y.length" v-model="k.ticket_type"></popup-picker>
    <popup-picker title="经办人" :data="[v.u]" v-if="v.u.length" v-model="k.user_id"></popup-picker>
    <x-input title="备注" v-model="k.remark" text-align="right"></x-input>
   </group>
   <div class="btn">
   <x-button type="warn" :disabled="false" @click.native="sb">确认</x-button>
   </div>
   </div>
</template>

<script>
import { Datetime, PopupPicker, XButton, XInput, dateFormat, Radio, Popup } from 'vux'
import { PaymentMark, AddTicket, ERR_OK } from '@/api/api'
// , ,
export default {
  name: 'paymentmark',
  data () {
    return {
      xl: false,
      xw: false,
      v: {
        w: [],
        e: [],
        y: [],
        u: []
      },
      k: {
        back_date: dateFormat(new Date(), 'YYYY-MM-DD'),
        customer: '',
        cid: '',
        title: '',
        contract_id: '',
        back_money: '',
        ticket_type: [],
        ticket_code: '',
        content: '',
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
      PaymentMark().then(res => {
        res[0].data.forEach(item => { this.v.u.push(item.username) })
        res[1].data.forEach(item => { this.v.w.push({key: item.id, value: item.username}) })
        res[2].data.forEach(item => { this.v.e.push({key: item.id, value: item.title}) })
        res[3].data.forEach(item => { this.v.y.push(item.showname) })
      })
    },
    ks (n, m) {
      this.xw = !this.xw
      this.k.customer = m
      this.k.cid = n
    },
    km (n, m) {
      this.xl = !this.xl
      this.k.title = m
      this.k.contract_id = n
    },
    sb () {
      let _that = this
      let g = Object.assign({}, this.k)
      g.ticket_type = g.ticket_type.toString()
      g.user_id = g.user_id.toString()
      for (let i in g) {
        if (!g[i]) {
          this.$vux.toast.show({
            text: '请把信息填完整~',
            width: '11em',
            position: 'center'
          })
          return
        }
      }
      AddTicket(g).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            position: 'center',
            width: '8em',
            onHide () {
              _that.$router.back()
            }
          })
        } else {
          this.$vux.toast.show({
            text: res.msg,
            position: 'center',
            width: '8em'
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
