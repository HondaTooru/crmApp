<template>
<div class="nobar">
   <group :gutter="0">
     <x-textarea :max="200" placeholder="请输入跟进类容" v-model="params.record"></x-textarea>
     <popup-picker title="跟进类型" :data="[listVisits]" v-if="listVisits.length" v-model="k.revisit_way"></popup-picker>
     <datetime title="实际跟进时间" format="YYYY-MM-DD HH:mm" v-model="params.revisit_time"></datetime>
     <cell :title="recordtype.alias" disabled v-model="params.customer"></cell>
     <popup-picker :title="recordtype.status" :data="[recordtype.listStauts]" v-if="recordtype.listStauts.length" v-model="recordtype.value"></popup-picker>
     <datetime title="下次跟进时间" format="YYYY-MM-DD HH:mm" v-model="params.revisit_next_time"></datetime>
     <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
   </group>
</div>
</template>

<script>
import { XTextarea, PopupPicker, Datetime } from 'vux'
import { AllAdminApi, WriteRecord, AllVisitApi, ERR_OK } from '@/api/api'
import MultiPlayer from '@/page/common/multiplayer'

export default {
  name: 'writecommon',
  props: {
    recordtype: Object
  },
  data () {
    return {
      people: {
        flag: false,
        xm: false,
        names: '',
        title: '通知他人',
        list: []
      },
      listVisits: [],
      k: {
        revisit_way: []
      },
      params: {
        record_type: this.recordtype.name,
        revisit_time: '',
        record: '',
        customer: this.recordtype.customer,
        revisit_next_time: '',
        row_id: this.$route.params.id,
        rowid: this.$route.params.id,
        contact: '',
        tip_uids: []
      }
    }
  },
  components: {
    XTextarea,
    Datetime,
    PopupPicker,
    MultiPlayer
  },
  created () {
    this.getList()
    this.$vux.bus.$on('Addinfo', () => {
      this.saveRecord()
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
    saveRecord () {
      if (this.flag) return
      let _that = this
      this.k.status = this.recordtype.value
      let g = Object.assign({}, this.k, this.params)
      for (let i in g) {
        if (typeof g[i] === 'object' && i !== 'tip_uids') { g[i] = g[i].toString() }
        if (!g[i] && i !== 'contact') {
          this.$vux.toast.show({ text: '请把信息填完整~', width: '11em' })
          return
        }
      }
      this.flag = true
      WriteRecord(g).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            onHide () {
              _that.$router.back()
              _that.flag = false
            }
          })
        } else {
          _that.flag = false
          this.$vux.toast.show({
            text: res.msg
          })
        }
      })
    },
    getList () {
      AllVisitApi().then(res => {
        res.data.forEach(item => { this.listVisits.push(item.name) })
      })
    },
    select () {
      if (!this.people.list.length) {
        AllAdminApi().then(res => {
          if (ERR_OK === res.code) {
            this.people.xm = !this.people.xm
            res.data.forEach(item => {
              this.people.list.push({key: item.id, value: item.username})
            })
          }
        })
      } else {
        this.people.xm = !this.people.xm
      }
    },
    selctpeople (value, label) {
      this.people.names = label.toString().trim()
      this.params.tip_uids = value
    }
  }
}
</script>

<style lang="less" scoped>

</style>
