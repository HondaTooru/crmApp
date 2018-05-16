<template>
  <div class="nobar">
    <group :gutter="0">
      <x-input title="原始密码" type="password" text-align="right" placeholder="请输入原始密码" v-model="params.old_pwd" required></x-input>
      <x-input title="新密码" type="password" :min="8" text-align="right" placeholder="新密码长度不能少于8位" v-model="params.new_pwd" required></x-input>
      <x-input title="确认新密码" type="password" :min="8" text-align="right" placeholder="请重复输入新密码" v-model="params.cfm_pwd" required></x-input>
    </group>
  </div>

</template>

<script>
import { XInput } from 'vux'
import { UpdataPass, ERR_OK } from '@/api/api'

export default {
  name: 'updatepass',
  data () {
    return {
      flag: true,
      params: {
        old_pwd: '',
        new_pwd: '',
        cfm_pwd: ''
      }
    }
  },
  created () {
    this.$vux.bus.$on('Addinfo', () => {
      this.saveData()
    })
  },
  beforeDestroy () { this.$vux.bus.$off('Addinfo') },
  methods: {
    saveData () {
      if (!this.flag) return
      let _that = this
      for (let i in this.params) {
        if (!this.params[i]) {
          this.$vux.toast.show({ text: '请把信息填完整~' })
          return
        }
      }
      this.flag = false
      UpdataPass(this.params).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            onHide () {
              _that.$router.back()
            }
          })
        } else {
          this.flag = true
          this.$vux.toast.show({ text: res.msg, width: '11em' })
        }
      })
    }
  },
  components: {
    XInput
  }
}
</script>

<style lang="less">
</style>
