<template>
 <div class="nobar db">
   <group :gutter="0" title="基本信息">
     <x-input title="姓名" v-model="infos.body.username" text-align="right" :show-clear="false"></x-input>
     <x-input title="公司名称" v-model="infos.body.company" text-align="right" :show-clear="false"></x-input>
   </group>
   <group :gutter="0" title="联系信息">
     <x-input title="手机" v-model="infos.body.telphone1" text-align="right" :show-clear="false"></x-input>
     <x-input title="邮编" v-model="infos.body.code" text-align="right" :show-clear="false"></x-input>
     <x-input title="微信号" v-model="infos.body.wechat" text-align="right" :show-clear="false"></x-input>
     <x-input title="旺旺号" v-model="infos.body.weibo" text-align="right" :show-clear="false"></x-input>
     <x-input title="微博" v-model="infos.body.weibo" text-align="right" :show-clear="false"></x-input>
     <x-address title="地址" :list="addressData" v-model="address"></x-address>
   </group>
   <group :gutter="0" title="其他信息">
     <x-input title="备注" v-model="infos.body.remark" text-align="right" :show-clear="false"></x-input>
     <x-input title="部门" v-model="infos.body.pre_department_id" text-align="right" :show-clear="false"></x-input>
     <x-input title="职位" v-model="infos.body.job" text-align="right" :show-clear="false"></x-input>
     <x-input title="位置" v-model="infos.body.position" text-align="right" :show-clear="false"></x-input>
     <x-input title="邮编" v-model="infos.body.code" text-align="right" :show-clear="false"></x-input>
     <popup-picker title="跟进状态" :data="[list.status]" v-model="status"></popup-picker>
     <popup-picker title="部门" :data="[list.department]" v-model="department"></popup-picker>
     <popup-picker title="线索来源" :data="[list.source]" v-model="source"></popup-picker>
     <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
     <popup-picker title="前负责人" :data="[list.preuserid]" v-model="preuser"></popup-picker>
     <datetime title="下次跟进时间" v-model="infos.body.revisit_remind_at"></datetime>
   </group>
 </div>
</template>

<script>
import { XInput, PopupPicker, XAddress, Datetime, ChinaAddressV4Data } from 'vux'
import { AllClueAddAPi } from '@/api/api'
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
      addressData: ChinaAddressV4Data
    }
  },
  created () {
    this.getList()
    console.log(this.infos)
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
    select () {
      this.people.xm = !this.people.xm
    },
    selctpeople (value) {
      this.people.names = value.toString()
    }
  },
  components: {
    XInput,
    PopupPicker,
    XAddress,
    Datetime,
    MultiPlayer
  },
  computed: {
    address: {
      get () { return this.infos.body.address.split(',') },
      set (val) { this.infos.body.address = val.toString() }
    },
    status: {
      get () { return this.infos.body.status.split(',') },
      set (val) { this.infos.body.status = val.toString() }
    },
    department: {
      get () { return this.infos.body.want_department_id.split(',') },
      set (val) { this.infos.body.want_department_id.toString() }
    },
    preuser: {
      get () { return this.infos.body.pre_user_id.split(',') },
      set (val) { this.infos.body.pre_user_id.toString() }
    },
    source: {
      get () { return this.infos.body.source.split(',') },
      set (val) { this.infos.body.source.toString() }
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
}
</style>
