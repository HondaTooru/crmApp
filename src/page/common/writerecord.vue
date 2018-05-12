<template>
<div class="nobar">
   <group :gutter="0">
     <x-textarea :max="200" placeholder="请输入跟进类容"></x-textarea>
     <popup-picker title="跟进类型" :data="[]"></popup-picker>
     <datetime title="实际跟进时间" format="YYYY-MM-DD HH:mm"></datetime>
     <cell title="线索" disabled></cell>
     <popup-picker title="跟进状态" :data="[]"></popup-picker>
     <datetime title="下次跟进时间" format="YYYY-MM-DD HH:mm"></datetime>
     <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
   </group>
   <div class="savebtn">
   <x-button type="warn" @click.native="saveRecord">保存</x-button>
   </div>
</div>
</template>

<script>
import { XTextarea, PopupPicker, Datetime, XButton } from 'vux'
import { AllAdminApi, ERR_OK } from '@/api/api'
import MultiPlayer from '@/page/common/multiplayer'

export default {
  name: 'writecommon',
  data () {
    return {
      people: {
        xm: false,
        names: '',
        title: '通知他人',
        list: []
      }
    }
  },
  components: {
    XTextarea,
    Datetime,
    PopupPicker,
    XButton,
    MultiPlayer
  },
  methods: {
    saveRecord () {},
    select () {
      if (!this.people.list.length) {
        AllAdminApi().then(res => {
          if (ERR_OK === res.code) {
            this.people.xm = !this.people.xm
            res.data.forEach(item => {
              this.people.list.push(item.username)
            })
          }
        })
      } else {
        this.people.xm = !this.people.xm
      }
    },
    selctpeople (value) {
      this.people.names = value.toString().trim()
    }
  }
}
</script>

<style lang="less" scoped>
.savebtn {margin: 15px}
</style>
