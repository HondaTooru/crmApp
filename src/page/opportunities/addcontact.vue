<template>
  <div class="nobar">
    <div v-transfer-dom>
      <x-dialog v-model="show">
        <x-icon type="ios-close-outline" style="fill:#35495e;" class="close" size="32" @click.native="show = !show"></x-icon>
        <group :gutter="0" title="添加联系人">
          <x-input title="姓名" text-align="right" v-model="params.name" placeholder="请输入姓名"></x-input>
          <x-input title="对应顾客" text-align="right" v-model="params.customer" placeholder="请输入对应顾客" disabled></x-input>
          <x-input title="手机" is-type="china-mobile" v-model="params.telphone" text-align="right" placeholder="请输入手机号码"></x-input>
        </group>
        <checklist title="性别" :max="1" :options="sexlist" v-model="params.sex" style="text-align:left"></checklist>
        <div class="savebtn">
          <x-button type="warn" @click.native="saveBtn">提交</x-button>
        </div>
      </x-dialog>
    </div>
   <group :gutter="0">
     <popup-picker title="联系人" v-model="people.contacter" :data="list" :disabled="!list.length"></popup-picker>
     <x-input title="  " disabled>
       <x-button slot="right" type="warn" mini @click.native="show = !show">新增</x-button>
     </x-input>
     <popup-picker title="联系人角色" v-model="people.contacter_role" :data="[role]" :disabled="!role.length" v-if="role.length"></popup-picker>
   </group>
  </div>
</template>

<script>
import { AllChooseContact, allContactRole, SaveContact, ERR_OK } from '@/api/api'
import { XInput, XButton, PopupPicker, XDialog, Checklist } from 'vux'

export default {
  name: 'choosecontact',
  data () {
    return {
      list: [],
      role: [],
      show: false,
      sexlist: ['男', '女'],
      params: {
        name: '',
        customer: JSON.parse(localStorage.getItem('DETAIL_INFO')).body.customer,
        telphone: '',
        sex: []
      },
      people: {
        row_id: this.$route.params.id,
        contacter_role: [],
        contacter: []
      }
    }
  },
  components: {
    XInput,
    XButton,
    PopupPicker,
    XDialog,
    Checklist
  },
  created () {
    this.getChoose()
    this.getRole()
    this.$vux.bus.$on('Addinfo', () => {
      this.saveData()
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
    getChoose () {
      AllChooseContact({row_id: this.$route.params.id}).then(res => {
        if (res.code) {
        } else {
          this.$vux.toast.show({ text: res.msg, position: 'bottom' })
        }
      })
    },
    getRole () {
      allContactRole({row_id: this.$route.params.id}).then(res => {
        res.data.forEach(item => { this.role.push(item.showname) })
      })
    },
    saveBtn () {
      let g = Object.assign({}, this.params)
      g.sex = g.sex.toString()
      for (let i in g) {
        if (!g[i]) {
          this.$vux.toast.show({ text: '请把信息填完整~', position: 'top' })
        } else {}
      }
    },
    saveData () {
      let g = Object.assign({}, this.people)
      for (let i in g) { if (typeof g[i] === 'object') { g[i] = g[i].toString() } }
      SaveContact(g).then(res => {
        if (ERR_OK === res.code) {
        } else {
          this.$vux.toast.show({ text: res.msg })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.savebtn {margin: 15px}
.close{position: absolute;top:0px;right: 0px;}
</style>
