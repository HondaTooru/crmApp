<template>
 <group :gutter="0">
   <popup-picker title="选择公海" :data="[list]" v-if="list.length" v-model="k.common_name"></popup-picker>
 </group>

</template>

<script>
import { PopupPicker } from 'vux'
import { AllCommon, RemoveCommon, ERR_OK } from '@/api/api'

export default {
  name: 'common',
  data () {
    return {
      list: [],
      k: {
        row_id: JSON.parse(localStorage.getItem('DETAIL_INFO')).detail.body.id,
        common_name: []
      }
    }
  },
  created () {
    this.getList()
    this.$vux.bus.$on('Addinfo', () => {
      this.saveData()
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
    getList () {
      AllCommon().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.list.push(item.name)
          })
        }
      })
    },
    saveData () {
      if (!this.k.common_name.length) {
        this.$vux.toast.show({ text: '请选择公海~' })
        return
      }
      let _that = this
      let g = Object.assign({}, this.k)
      g.common_name = g.common_name.toString()
      RemoveCommon(g).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            onHide () {
              _that.$router.go(-2)
            }
          })
        } else {
          this.$vux.toast.show({ text: res.msg })
        }
      })
    }
  },
  components: {
    PopupPicker
  }
}
</script>

<style lang="css">
</style>
