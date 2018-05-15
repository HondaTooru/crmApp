<template>
<group :gutter="0">
  <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
</group>
</template>

<script>
import MultiPlayer from '@/page/common/multiplayer'
import { AllAdminApi, TransferRemove, ERR_OK } from '@/api/api'

export default {
  name: 'cluetransfer',
  data () {
    return {
      people: {
        xm: false,
        names: '',
        title: '新建负责人',
        list: []
      }
    }
  },
  components: {
    MultiPlayer
  },
  created () {
    this.$vux.bus.$on('Addinfo', () => {
      this.saveData()
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
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
    },
    saveData () {
      if (this.people.names) {
        let _that = this
        let data = JSON.parse(localStorage.getItem('DETAIL_INFO'))
        let id = data.id ? data.id : data.detail.body.id
        let g = {row_id: id, new_user_id: this.people.names}
        TransferRemove(g, this.$route.params.type).then(res => {
          if (ERR_OK === res.code) {
            this.$vux.toast.show({
              text: res.msg,
              width: '11em',
              onHide () {
                _that.$router.back()
              }
            })
          } else {
            this.$vux.toast.show({ text: res.msg, width: '11em' })
          }
        })
      } else {
        this.$vux.toast.show({ text: '请选择负责人~' })
      }
    }
  }
}
</script>

<style lang="less">
</style>
