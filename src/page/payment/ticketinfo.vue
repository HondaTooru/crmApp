<template>
  <div class="nobar">
    <group gutter="0" v-if="infos">
      <datetime title="开票日期" format="YYYY-MM-DD HH:mm" v-model="infos.back_date"></datetime>
      <cell title="对应客户" v-model="infos.customer" disabled text-align="right"></cell>
      <cell title="合同标题" v-model="infos.title" disabled text-align="right"></cell>
      <x-input title="票据内容" :value="'ssss'" v-model="infos.content" text-align="right"></x-input>
      <x-input title="开票金额" type="number" v-model="infos.amount_money" disabled text-align="right"></x-input>
      <popup-picker title="票据类型" :data="[ticket_type]" v-model="infos.ticket_type" text-align="right"></popup-picker>
      <x-input title="发票号码" v-model="infos.ticket_code" text-align="right"></x-input>
      <popup-picker title="合同负责人" :data="[admin]" text-align="right" v-model="infos.user_id"></popup-picker>
      <x-input title="经手人" v-model="infos.user_id_2"></x-input>
      <x-input title="备注" v-model="infos.remark" text-align="right"></x-input>
    </group>
    <div class="saveBtn">
      <x-button type="warn" @click.native="del" :disabled="!flag">删除</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Datetime, PopupPicker, XButton } from 'vux'
import { TicketDetail, ERR_OK, EditTicket, DelTicketRecord, SaveTicketDetail } from '@/api/api'

export default {
  name: 'ticketinfo',
  data () {
    return {
      infos: '',
      ticket_type: [],
      admin: [],
      flag: true
    }
  },
  components: {
    XInput,
    Datetime,
    PopupPicker,
    XButton
  },
  created () {
    this.getInfo()
    this.getlist()
    this.$vux.bus.$on('Addinfo', () => {
      this.saveData()
    })
  },
  beforeDestroy () { this.$vux.on.off('Addinfo') },
  methods: {
    getInfo () {
      TicketDetail({row_id: this.$route.params.id}).then(res => {
        if (ERR_OK === res.code) {
          this.infos = res.data.body
          this.infos.user_id = [this.infos.user_id]
          this.infos.ticket_type = [this.infos.ticket_type]
        } else {
          this.$router.back()
        }
      })
    },
    getlist () {
      EditTicket().then(res => {
        res[0].data.forEach(item => { this.ticket_type.push(item.showname) })
        res[1].data.forEach(item => { this.admin.push(item.username) })
      })
    },
    del () {
      let _that = this
      this.flag = true
      this.$vux.confirm.show({
        content: '删除后不可恢复~',
        onCancel () { _that.flag = false },
        onConfirm () {
          DelTicketRecord({row_id: _that.$route.params.id}).then(res => {
            if (ERR_OK === res.code) {
              _that.$vux.toast.show({ text: res.msg, type: 'success', onHide () { _that.$router.go(-1) } })
            } else {
              _that.flag = false
              _that.$vux.toast.show({ text: res.msg })
            }
          })
        }
      })
    },
    saveData () {
      let g = {}
      let _that = this
      let data = []
      if (!this.flag) return
      for (let i in this.infos) { data.push({name: i, value: this.infos[i]}) }
      data.forEach(item => { if (typeof item.value === 'object') item.value = item.value.toString() })
      g.field_data = JSON.stringify(data)
      g.row_id = this.$route.params.id
      this.flag = false
      SaveTicketDetail(g).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            onHide () {
              _that.$router.back()
            }
          })
        } else {
          this.$vux.toast.show({
            text: res.msg,
            onHide () {
              _that.flag = false
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.saveBtn {
  margin: 15px;
}
</style>
