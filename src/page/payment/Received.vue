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
         <datetime v-model="nw.plan_back_date" title="计划回款日期"></datetime>
         <x-input title="计划回款占百分比" type="number" v-model.number="nw.plan_back_rate" text-align="right"></x-input>
         <x-input title="计划回款金额" type="number" v-model.number="nw.plan_back_rate * (all / 100 )" text-align="right"></x-input>
         <x-input title="备注" v-model="nw.remark" text-align="right"></x-input>
       </group>
       <div class="btn_add">
       <x-button :gradients="['#35495e', '#35495e']" :disabled="!this.x">添加期数</x-button>
       </div>
      </x-dialog>
    </div>
    <group :gutter="0">
      <cell is-link title="对应客户" text-algin="right" :value="c" @click.native="sw = !sw"></cell>
      <cell is-link title="合同标题" text-algin="right" :value="x"  @click.native="so" :disabled="!e.length"></cell>
      <cell is-link title="合同总金额" :value="all" text-align="right" disabled></cell>
      <cell is-link title="签约日期" :value="date" text-align="right" disabled></cell>
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
      <td>{{i.qishu}}</td>
      <td>{{i.plan_back_date}}</td>
      <td>{{i.plan_back_rate}}%</td>
      <td>{{i.plan_back_money}}</td>
      <td><p>{{i.remark}}</p></td>
    </tr>
  </tbody>
</x-table>
</div>
<div class="btn">
<x-button type="warn" :disabled="!this.x" @click.native="su = !su">添加期数</x-button>
</div>
  </div>

</template>

<script>
import { XTable, PopupPicker, Radio, Popup, Divider, XButton, XDialog, XInput, Datetime } from 'vux'
import { AllCustomer, ERR_OK, pContractApi, pContractInfoApi, qishuApi } from '@/api/api'

export default {
  name: 'received',
  data () {
    return {
      q: [],
      e: [],
      c: '',
      x: '',
      xw: false,
      sw: false,
      su: false,
      ms: {
        customer: ''
      },
      all: '',
      date: '',
      tabelList: [],
      nw: {
        qishu: 0,
        plan_back_date: '',
        plan_back_money: 0,
        plan_back_rate: 0,
        remark: '',
        c_id: '',
        user_id: '',
        contract_id: ''
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      AllCustomer().then(res => {
        if (ERR_OK === res.code) res.data.forEach(item => { this.q.push({key: item.id, value: item.username}) })
      })
    },
    n (h, j) {
      this.c = this.ms.customer = j
      this.sw = !this.sw
      this.e = []
      this.x = ''
      this.tabelList = []
      this.all = this.date = ''
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
    k (h, j) {
      this.x = j
      this.xw = !this.xw
      this.tabelList = []
      pContractInfoApi(Object.assign({}, this.ms, {title: j})).then(res => {
        if (ERR_OK === res.code) {
          this.all = res.data.amount_money
          this.date = res.data.sign_date
          qishuApi(Object.assign({}, this.ms, {title: j})).then(res => {
            if (ERR_OK === res.code) this.tabelList = res.data
            this.nw.qishu = this.tabelList.length + 1
          })
        }
      })
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
  },
  filters: {
    percent: function (val) {
      if (!val) return ''
      val = val.toString() + '%'
      return val
    }
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
    }
  }
}
.line {margin: 15px}
.btn {margin: 20px 15px}
.btn_add{margin: 15px}
.close{position: absolute;top:0px;right: 0px;}
</style>
