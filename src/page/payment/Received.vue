<template>
  <div class="nobar">
    <div v-transfer-dom>
     <popup v-model="sw" max-height="50%">
       <div>
         <group :gutter="0">
           <radio :options="q" @on-change="n"></radio>
         </group>
       </div>
     </popup>
    </div>
    <div v-transfer-dom>
     <popup v-model="xw" max-height="50%">
       <div>
         <group :gutter="0">
           <radio :options="e" @on-change="k"></radio>
         </group>
       </div>
     </popup>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="su">
        <x-icon type="ios-close-outline" style="fill:#35495e;" class="close" size="32" @click.native="su = !su"></x-icon>
       <group :gutter="0" title="添加期数">
         <x-input title="期数" :value="nw.qishu" text-align="right" disabled></x-input>
         <datetime v-model="nw.plan_back_date" title="计划回款日期" required></datetime>
         <x-input :show-clear="false" :should-toast-error="false" title="计划回款占百分比" type="number" keyboard="number" v-model.number="nw.plan_back_rate" text-align="right" @on-change="bm(1)" required></x-input>
         <x-input :show-clear="false" :should-toast-error="false" title="计划回款金额" keyboard="number" v-model.number="nw.plan_back_money" text-align="right" @on-change="bm(0)" required></x-input>
         <x-input :show-clear="false" title="备注" v-model="nw.remark" text-align="right"></x-input>
       </group>
       <div class="btn_add">
       <x-button :gradients="['#35495e', '#35495e']" @click.native="addqishu">添加期数</x-button>
       </div>
      </x-dialog>
    </div>
    <group :gutter="0">
      <cell is-link title="对应客户" text-algin="right" :value="eu.customer" @click.native="sw = !sw"></cell>
      <cell is-link title="合同标题" text-algin="right" :value="eu.title"  @click.native="so" :disabled="!e.length"></cell>
      <cell is-link title="合同总金额" :value="eu.amount_money" text-align="right" disabled></cell>
      <cell is-link title="签约日期" :value="eu.sign_date" text-align="right" disabled></cell>
    </group>
    <div class="line">
      <divider>数据列表</divider></div>
    <div class="tableList">
    <x-table :cell-bordered="true" :content-bordered="true" class="tabel">
  <thead>
    <tr style="background-color: #F7F7F7">
      <th>期数</th>
      <th>计划回款日期</th>
      <th>计划回款占比</th>
      <th>计划回款金额</th>
      <th>备注</th>
    </tr>
  </thead>
  <tbody>
    <tr v-if="!tabelList.length">
      <td colspan="5">暂无数据</td></tr>
    <tr v-for="i in tabelList" :key="i.id" v-if="tabelList.length">
      <td><i @click="del(i)" v-if="i.tag" class="fa fa-trash" aria-hidden="true"></i>{{i.qishu}}</td>
      <td>{{i.plan_back_date}}</td>
      <td>{{i.plan_back_rate}}%</td>
      <td>{{i.plan_back_money}}</td>
      <td><p>{{i.remark}}</p></td>
    </tr>
  </tbody>
</x-table>
</div>
<div class="btn">
<x-button type="warn" :disabled="!this.eu.title" @click.native="su = !su">添加期数</x-button>
</div>
  </div>
</template>

<script>
import { XTable, PopupPicker, Radio, Popup, Divider, XButton, XDialog, XInput, Datetime, dateFormat } from 'vux'
import { AllCustomer, ERR_OK, pContractApi, pContractInfoApi, qishuApi, AddqishuApi } from '@/api/api'

export default {
  name: 'received',
  data () {
    return {
      q: [],
      e: [],
      xw: false,
      sw: false,
      su: false,
      ms: {
        customer: ''
      },
      eu: {
        customer: '',
        title: '',
        amount_money: '',
        sign_date: '',
        plan_qi: []
      },
      tabelList: [],
      nw: {
        qishu: 0,
        plan_back_date: dateFormat(new Date(), 'YYYY-MM-DD'),
        plan_back_money: '',
        plan_back_rate: '',
        remark: '',
        c_id: '',
        user_id: '',
        contract_id: '',
        tag: 1
      }
    }
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  created () {
    this.getList()
    this.$vux.bus.$on('Addinfo', () => {
      let _that = this
      if (this.eu.plan_qi.length) {
        this.eu.plan_qi = JSON.stringify(this.eu.plan_qi)
        AddqishuApi(this.eu).then(res => {
          if (ERR_OK === res.code) {
            this.$vux.toast.show({
              text: res.msg,
              type: 'success',
              position: 'center',
              onHide () {
                _that.$router.back()
              }
            })
          } else {
            this.$vux.toast.show({ text: res.msg })
          }
        })
      } else {
        this.$vux.toast.show({ text: '请添加中至少一期数据', width: '11em', position: 'center' })
      }
    })
  },
  methods: {
    getList () {
      AllCustomer().then(res => {
        if (ERR_OK === res.code) res.data.forEach(item => { this.q.push({key: item.id, value: item.username}) })
      })
    },
    n (h, j) {
      this.nw.c_id = h
      this.eu.customer = this.ms.customer = this.nw.user_id = j
      this.sw = !this.sw
      this.e = []
      this.tabelList = []
      this.eu.amount_money = this.eu.title = this.eu.sign_date = ''
      pContractApi(Object.assign({}, this.ms, {is_open: 1})).then(res => {
        if (ERR_OK === res.code) {
          this.ms.customer = h
          res.data.forEach(item => { this.e.push({key: item.id, value: item.title}) })
        }
      })
    },
    so () {
      if (this.e.length) {
        this.xw = !this.xw
      }
    },
    bm (flag) {
      let ratio = (this.eu.amount_money / 100).toFixed(2)
      if (Number(this.nw.plan_back_rate) <= 100) {
        if (flag) {
          this.nw.plan_back_money = this.nw.plan_back_rate * ratio
        } else {
          this.nw.plan_back_rate = this.nw.plan_back_money / ratio
        }
      } else {
        this.$vux.toast.show({ text: '计划回款不能超过100%', width: '11em' })
        this.nw.plan_back_rate = 0
        this.nw.plan_back_money = 0
      }
    },
    k (h, j) {
      this.eu.title = j
      this.xw = !this.xw
      this.tabelList = []
      pContractInfoApi(Object.assign({}, this.ms, {title: j})).then(res => {
        if (ERR_OK === res.code) {
          this.eu.amount_money = res.data.amount_money
          this.eu.sign_date = res.data.sign_date
          this.nw.contract_id = res.data.id
          qishuApi(Object.assign({}, this.ms, {title: j})).then(res => {
            if (ERR_OK === res.code) this.tabelList = res.data
            this.nw.qishu = this.tabelList.length + 1
          })
        }
      })
    },
    addqishu () {
      if (this.nw.plan_back_date && this.nw.plan_back_money && this.nw.plan_back_rate) {
        this.tabelList.unshift(Object.assign({}, this.nw))
        this.eu.plan_qi.push(Object.assign({}, this.nw))
        this.nw.qishu += 1
        this.nw.plan_back_rate = 0
        this.nw.plan_back_money = 0
        this.su = false
      } else {
        this.$vux.toast.show({text: '请把信息填完整~'})
      }
    },
    del (i) {
      this.eu.plan_qi.splice(this.eu.plan_qi.indexOf(i), 1)
      this.tabelList.splice(this.tabelList.indexOf(i), 1)
      this.nw.qishu -= 1
    }
  },
  components: {
    XTable,
    PopupPicker,
    Radio,
    Popup,
    Divider,
    XButton,
    XDialog,
    XInput,
    Datetime
  }
}
</script>

<style lang="less" scoped>
.tableList {
  margin: 10px 0;
  overflow-x: scroll;
  .tabel {
    font-size: 14px;
    th {
      min-width: 110px;
      -webkit-overflow-scrolling:touch
    }
    td {
      p {line-height: 20px;text-align: left;margin: 5px}
      .fa {    color: #ea2424; font-size: 16px;}
    }
  }
}
.line {margin: 15px}
.btn {margin: 20px 15px}
.btn_add{margin: 15px}
.close{position: absolute;top:0px;right: 0px;}
</style>
