<template>
 <div class="nobar db">
   <group :gutter="0" title="基本信息">
     <x-input title="姓名" v-model="infos.body.username" text-align="right" :show-clear="false"></x-input>
     <x-input title="公司名称" v-model="infos.body.company" text-align="right" :show-clear="false"></x-input>
   </group>
   <group :gutter="0" title="联系信息">
     <x-input title="手机" v-model="infos.body.telphone1" is-type="china-mobile" text-align="right" :show-clear="false"></x-input>
     <x-input title="邮箱" v-model="infos.body.email" is-type="email" text-align="right" :show-clear="false"></x-input>
     <x-input title="微信号" v-model="infos.body.wechat" text-align="right" :show-clear="false"></x-input>
     <x-input title="旺旺号" v-model="infos.body.alinum" text-align="right" :show-clear="false"></x-input>
     <x-input title="微博" v-model="infos.body.weibo" text-align="right" :show-clear="false"></x-input>
     <x-address title="地址" :list="addressData" v-model="address"></x-address>
   </group>
   <group :gutter="0" title="其他信息">
     <x-input title="备注" v-model="infos.body.remark" text-align="right" :show-clear="false"></x-input>
     <x-input title="部门" v-model="infos.body.pre_department_id" text-align="right" :show-clear="false"></x-input>
     <x-input title="职位" v-model="infos.body.job" text-align="right" :show-clear="false"></x-input>
     <x-input title="位置" v-model="infos.body.position" text-align="right" :show-clear="false"></x-input>
     <x-input title="邮编" v-model="infos.body.code" text-align="right" :show-clear="false"></x-input>
     <popup-picker title="跟进状态" :data="[list.status]" v-model="k.status" v-if="list.status.length"></popup-picker>
     <popup-picker title="部门" :data="[list.department]" v-model="k.want_department_id" v-if="list.department.length"></popup-picker>
     <popup-picker title="线索来源" :data="[list.source]" v-model="k.source" v-if="list.source.length"></popup-picker>
     <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
     <popup-picker title="前负责人" :data="[list.preuserid]" v-model="k.pre_user_id" v-if="list.preuserid.length"></popup-picker>
     <datetime title="下次跟进时间" v-model="infos.body.revisit_remind_at" format="YYYY-MM-DD HH:mm"></datetime>
   </group>
   <div class="delbtn">
   <x-button type="warn" @click.native="del" :disabled="enableBtn">删除</x-button>
   </div>
 </div>
</template>

<script>
import { XInput, PopupPicker, XAddress, Datetime, ChinaAddressV4Data, XButton } from 'vux'
import { AllClueAddAPi, EditSave, DelThis, ERR_OK } from '@/api/api'
import MultiPlayer from '@/page/common/multiplayer'

export default {
  name: 'cluedit',
  data () {
    return {
      list: {
        status: [],
        department: [],
        preuserid: [],
        source: []
      },
      people: {
        xm: false,
        names: '',
        title: '负责人',
        list: [],
        checks: []
      },
      infos: JSON.parse(localStorage.getItem('DETAIL_INFO')) || '',
      addressData: ChinaAddressV4Data,
      itemList: [],
      enableBtn: false,
      k: {
        status: [],
        want_department_id: [],
        source: [],
        pre_user_id: []
      }
    }
  },
  created () {
    let data = JSON.parse(localStorage.getItem('DETAIL_INFO')) || ''
    for (let i in data.body) { if (this.k[i] && data.body[i]) this.k[i].push(data.body[i]) }
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
      AllClueAddAPi().then(res => {
        res[0].data.forEach(item => { this.list.status.push(item.name) })
        res[1].data.forEach(item => { this.list.source.push(item.name) })
        res[2].data.forEach(item => { this.list.preuserid.push(item.username) })
        res[3].data.forEach(item => { this.list.department.push(item.name) })
        this.people.list = this.list.preuserid
        this.people.checks = this.infos.body.user_id.split(',')
        this.people.names = this.infos.body.user_id
      })
    },
    del () {
      let _that = this
      this.enableBtn = true
      DelThis({row_id: this.$route.params.id}).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            onHide () {
              _that.$router.replace('/clue')
            }
          })
        } else {
          this.enableBtn = false
          this.$vux.toast.show({ text: res.msg })
        }
      })
    },
    select () {
      this.people.xm = !this.people.xm
    },
    selctpeople (value) {
      this.people.names = value.toString()
    },
    saveData () {
      this.infos.body.user_id = this.people.names
      for (let i in this.infos.body) {
        if (this.k[i]) this.infos.body[i] = this.k[i].toString()
        this.itemList.push({name: i, value: this.infos.body[i]})
      }
      let g = []
      let _that = this
      g.field_data = JSON.stringify(this.itemList)
      g.row_id = this.$route.params.id
      EditSave(g).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            onHide () {
              _that.$router.back()
            }
          })
        } else {
          this.$vux.toast.show({text: res.msg})
        }
      })
    }
  },
  components: {
    XInput,
    PopupPicker,
    XAddress,
    Datetime,
    MultiPlayer,
    XButton
  },
  computed: {
    address: {
      get () { return this.infos.body.address.split(',') },
      set (val) { this.infos.body.address = val.toString() }
    }
  }
}
</script>

<style lang="less">
.db {
  .weui-cell:before, .vux-cell-box:not(:first-child):before{
    border-width: 2px;
    transform: scaleY(.4);
    border-color:#ececec
  }
  .delbtn {
    margin: 15px
  }
}
</style>
