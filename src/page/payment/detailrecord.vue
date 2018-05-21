<template>
  <div>
    <div v-transfer-dom>
    <x-dialog v-model="xk" :mask-z-index="498" :dialog-style="{ zIndex: 499 }">
      <x-icon type="ios-close-outline" style="fill:#35495e;" class="close" size="32" @click.native="xk = !xk"></x-icon>
        <group :gutter="0" title="审批意见">
        <x-textarea :max="200" placeholder="请输入内容" v-model="params.reason"></x-textarea>
        <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
        </group>
        <div class="savebtn">
        <x-button type="warn" @click.native="saveData" :disabled="!isClick">保存</x-button>
        </div>
    </x-dialog>
  </div>
    <group :gutter="0" v-if="infos">
      <datetime title="回款日期" format="YYYY-MM-DD HH:mm" placeholder="请选择日期" :readonly="Edit"></datetime>
      <x-input title="回款期数" placeholder="请输入回款期数" text-align="right" v-model="infos.qishu" :disabled="Edit"></x-input>
      <x-input title="回款金额" type="number" placeholder="请输入回款金额" text-align="right" v-model="infos.back_money" :disabled="Edit"></x-input>
      <cell is-link title="合同标题" v-model="infos.title" text-align="right" :link="'/contractinfo/' + infos.contract_id"></cell>
      <x-input title="对应客户" v-model="infos.customer" disabled text-align="right"></x-input>
      <popup-picker title="支付方式" :data="[payway]" v-model="infos.pay_way" :disabled="Edit"></popup-picker>
      <popup-picker title="回款类型" :data="[paytype]" v-model="infos.pay_type" :disabled="Edit"></popup-picker>
      <x-input title="逾期状态" disabled text-align="right" v-model="infos.status"></x-input>
      <x-input title="逾期天数" disabled text-align="right" v-model="infos.overdue"></x-input>
      <datetime title="审批提交时间" readonly v-model="infos.pi_put_time"></datetime>
      <datetime title="审批完成时间" readonly v-model="infos.pi_end_time"></datetime>
      <x-input title="审批状态" text-align="right" disabled v-model="infos.status"></x-input>
      <x-input title="创建人" text-align="right" disabled v-model="infos.creater"></x-input>
      <x-input title="备注" v-model="infos.remark" text-align="right" :disabled="Edit"></x-input>
    </group>
    <div class="savebtn">
    <x-button type="warn" @click.native="delItem" :disabled="!flag">删除</x-button>
    </div>
    <div class="caidan">
    <div class="tools" v-if="Edit">
      <span class="icon" @click="show(2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
      <span class="text">审批否决</span>
    </div>
    <div class="tools" v-if="Edit" @click="show(3)">
      <span class="icon"><i class="fa fa-ban" aria-hidden="true"></i></span>
      <span class="text">审批撤销</span>
    </div>
    <div class="tools" v-if="Edit">
      <span class="icon" @click="show(1)"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>
      <span class="text">审批通过</span>
    </div>
    <div class="tools" v-if="!Edit">
      <span class="icon" @click="show(0)"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>
      <span class="text">提交审批</span>
    </div>
    </div>
  </div>
</template>

<script>
import { PlanRecordDetail, PaymentWay, ApprovalLog, Approval, ERR_OK, SaveEditPlan, DelPaymentRecord } from '@/api/api'
import { Datetime, XInput, PopupPicker, XDialog, XTextarea, XButton } from 'vux'
import MultiPlayer from '@/page/common/multiplayer'

export default {
  name: 'detailrecord',
  data () {
    return {
      flag: true,
      is_eidt: 0,
      xk: false,
      infos: null,
      contract: [],
      payway: [],
      paytype: [],
      people: {
        xm: false,
        names: '',
        title: '通知他人',
        list: [],
        checks: []
      },
      params: {
        status: 0,
        row_id: this.$route.params.id,
        reason: '',
        notice_uids: [],
        w_type: 'payment'
      }
    }
  },
  created () {
    this.getInfos()
    this.getList()
    this.$vux.bus.$on('Addinfo', () => {
      this.editSave()
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
    getInfos () {
      let _that = this
      PlanRecordDetail({row_id: this.$route.params.id}).then(res => {
        if (res.data.detail.body.length === undefined) {
          this.infos = res.data.detail.body
          this.infos.pay_way = [this.infos.pay_way]
          this.infos.pay_type = [this.infos.pay_type]
          this.is_eidt = res.data.detail.body.be_approved
        } else { this.$vux.toast.show({text: '该条项目已被删除~', width: '11em', onHide () { _that.$router.back() }}) }
      })
    },
    getList () {
      PaymentWay().then(res => {
        res[0].data.forEach(item => { this.payway.push(item.showname) })
        res[1].data.forEach(item => { this.paytype.push(item.showname) })
        res[2].data.forEach(item => { this.people.list.push({key: item.id, value: item.username}) })
      })
    },
    delItem () {
      let _that = this
      this.flag = false
      this.$vux.confirm.show({
        content: '删除后不可恢复~',
        onCancel () { _that.flag = true },
        onConfirm () {
          DelPaymentRecord({row_id: _that.$route.params.id}).then(res => {
            if (ERR_OK === res.code) {
              _that.$vux.toast.show({
                text: res.msg,
                type: 'success',
                onHide () {
                  _that.$router.back()
                } })
            } else {
              _that.flag = true
              _that.$vux.toast.show({ text: res.msg })
            }
          })
        }
      })
    },
    show (status) {
      this.xk = !this.xk
      this.params.status = status
    },
    select () {
      this.people.xm = !this.people.xm
    },
    selctpeople (ids, value) {
      this.people.names = value.toString().trim()
      this.params.notice_uids = ids
    },
    saveData () {
      let _that = this
      this.flag = false
      ApprovalLog(this.params).then(res => {
        this.params.reason = ''
        if (ERR_OK === res.code) {
          Approval({status: this.params.status, row_id: this.$route.params.id}, this.params.w_type).then(res => {
            if (ERR_OK === res.code) {
              this.xk = !this.xk
              this.$vux.toast.show({ text: res.msg, type: 'success', onHide () { _that.$router.replace('/payment') } })
            } else {
              this.flag = true
              this.$vux.toast.show({ text: res.msg })
            }
          })
        } else {
          this.flag = true
          this.$vux.toast.show({ text: res.msg })
        }
      })
    },
    editSave () {
      if (this.is_eidt) {
        if (!this.flag) return
        let _that = this
        let data = []
        let g = []
        for (let i in this.infos) { data.push({name: i, value: this.infos[i]}) }
        data.forEach(item => { if (typeof item.value === 'object') item.value = item.value.toString() })
        g.field_data = JSON.stringify(data)
        g.row_id = this.$route.params.id
        this.flag = false
        SaveEditPlan(g).then(res => {
          if (ERR_OK === res.code) {
            this.$vux.toast.show({
              text: res.msg,
              type: 'success',
              onHide () { _that.flag = true }
            })
          } else {
            this.$vux.toast.show({
              text: res.msg,
              width: '50%',
              onHide () { _that.flag = true }
            })
          }
        })
      } else {
        this.$vux.toast.show({ text: '审核状态下无法修改内容', width: '50%' })
      }
    }
  },
  components: {
    Datetime,
    XInput,
    PopupPicker,
    XDialog,
    XTextarea,
    XButton,
    MultiPlayer
  },
  computed: {
    Edit () {
      return this.is_eidt === 0
    },
    isClick () {
      return this.params.reason && this.people.names
    }
  }
}
</script>

<style lang="less" scoped>
.caidan {
  width: 52px;
  height: 52px;
  bottom: 0;
  width: 100%;
  left: 0;
  opacity: 1;
  position: absolute;
  z-index: 99;
  overflow: hidden;
  display: flex;
  box-shadow: 1px 1px 20px 0px #35495e;
  border-top: 1px solid #6b6b6b;
  background:#35495e;
  .tools {
    flex:1;
    color:white;
    text-align: center;
    a {color:#10aeff}
    span {
      display: block;
      &.icon{padding: 5px 0 0 0; .fa {font-size: 27px;margin:0}}
      &.text{ font-size: 10px}
    }
  }
}
.savebtn {margin: 15px}
.close{position: absolute;top:0px;right: 0px;}
</style>
