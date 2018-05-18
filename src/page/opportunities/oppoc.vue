<template>
  <div class="nobar">
    <group :gutter="0">
      <x-input :type="m.field_type === 'decimal' ? 'number' : 'text'" :title="m.showname" v-for="m in infos" :key="m.id" text-align="right" v-model="m.value" v-if="m.field_type !== 'date'" :placeholder="'请输入' +m.showname" required></x-input>
      <datetime :title="m.showname" format="YYYY-MM-DD HH:mm" v-for="m in infos" :key="m.id" v-if="m.field_type === 'date'" v-model="m.value" :readonly="m.name === 'create_time'" required></datetime>
    </group>
  </div>
</template>

<script>
import { BeContact, BeContactSave, ERR_OK } from '@/api/api'
import { XInput, PopupPicker, Datetime } from 'vux'

export default {
  name: 'becontact',
  data () {
    return {
      detail: JSON.parse(localStorage.getItem('DETAIL_INFO')),
      infos: []
    }
  },
  components: {
    XInput,
    PopupPicker,
    Datetime
  },
  created () {
    this.getcontact()
    this.$vux.bus.$on('Addinfo', () => {
      this.saveData()
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
    getcontact () {
      BeContact({row_id: this.$route.params.id}).then(res => {
        this.infos = res.data.header.filter(item => item.required)
        this.infos.forEach(item => {
          for (let m in this.detail.body) {
            if (item.name === m) {
              item.value = this.detail.body[m]
            }
          }
        })
      })
    },
    saveData () {
      let g = this.infos
      for (let i in g) {
        if (!g[i].value && !g[i].length) {
          this.$vux.toast.show({ text: '请把信息填完整~' })
          return
        } else {
          g[i].value = g[i].value.toString()
        }
      }
      console.log(g)
      BeContactSave({row_id: this.$route.params.id, field_data: JSON.stringify(g)}).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({ text: res.msg })
        } else {
          this.$vux.toast.show({ text: res.smg })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
