<template>
<div class="nobar">
   <group :gutter="0">
     <x-textarea :max="200" placeholder="请输入跟进类容" v-model="params.record"></x-textarea>
     <popup-picker title="跟进类型" :data="[listVisits]" v-if="listVisits.length" v-model="k.revisit_way"></popup-picker>
     <datetime title="实际跟进时间" format="YYYY-MM-DD HH:mm" v-model="params.revisit_time"></datetime>
     <cell title="线索" disabled></cell>
     <popup-picker title="跟进状态" :data="[listStauts]" v-if="listStauts.length" v-model="k.status"></popup-picker>
     <datetime title="下次跟进时间" format="YYYY-MM-DD HH:mm" v-model="params.revisit_next_time"></datetime>
     <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
   </group>
</div>
</template>

<script>
import { XTextarea, PopupPicker, Datetime } from 'vux'
import { AllAdminApi, WriteRecord, WhiteClueList, ERR_OK } from '@/api/api'
import MultiPlayer from '@/page/common/multiplayer'

export default {
  name: 'writecommon',
  props: {
    recordtype: Object
  },
  data () {
    return {
      people: {
        xm: false,
        names: '',
        title: '通知他人',
        list: []
      },
      listStauts: [],
      listVisits: [],
      k: {
        status: [],
        revisit_way: []
      },
      params: {
        revisit_time: '',
        record: '',
        revisit_next_time: '',
        customer: JSON.parse(localStorage.getItem('DETAIL_INFO')).body.username,
        row_id: this.$route.params.id,
        contact: '',
        record_type: this.recordtype.name,
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
      let _that = this
      let g = Object.assign({}, this.k, this.params)
      for (let i in g) {
        if (!g[i] && i !== 'contact') {
          this.$vux.toast.show({
            text: '请把信息填完整~'
          })
          return
        } else if (typeof g[i] === 'object' && i !== 'tip_uids' && i !== 'contact') {
          g[i] = g[i].toString()
        }
      }
      WriteRecord(g).then(res => {
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
            text: res.msg
          })
        }
      })
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
    saveRecord () {},
    getList () {
      WhiteClueList().then(res => {
        res[0].data.forEach(item => { this.listVisits.push(item.name) })
        res[1].data.forEach(item => { this.listStauts.push(item.name) })
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
