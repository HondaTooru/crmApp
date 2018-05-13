<template>
  <div class="nobar dx" v-if="list.length">
    <group :gutter="0" title="基本信息">
      <x-input required title="客户名称" v-model="infos.username" text-align="right"></x-input>
      <datetime required title="下次跟进时间" format="YYYY-MM-DD HH:mm" v-model='infos.revisit_remind_at'></datetime>
      <x-input required title="公众号名字" v-model="infos.weibo" text-align="right"></x-input>
      <x-input required title="手机" v-model="infos.telphone" text-align="right"></x-input>
    </group>
    <group :gutter="0" title="其他信息">
      <cell
   is-link
   :border-intent="false"
   :arrow-direction="showContent ? 'up' : 'down'"
   @click.native="showContent = !showContent">
   <div slot="title" class="more" @click="slideDown"><i class="fa fa-list" aria-hidden="true"></i><span ref="title">点击展开</span></div>
 </cell>
   <template v-if="showContent">
     <x-input placeholder="请输入网址" title="网址" v-model="infos.site_url" text-align="right"></x-input>
     <x-input placeholder="线索编号" title="线索编号" v-model="infos.lead_id" text-align="right"></x-input>
     <popup-picker title="跟进状态" :data="[k.status]" v-if="k.status.length" v-model="infos.status"></popup-picker>
     <popup-picker title="客户来源" :data="[k.source]" v-if="k.source.length" v-model="infos.source"></popup-picker>
     <popup-picker title="上级客户" :data="[k.parent_customer]" v-if="k.parent_customer.length" v-model="infos.parent_customer"></popup-picker>
     <popup-picker title="客户类型" :data="[k.customer_type]" v-if="k.customer_type.length" v-model="infos.customer_type"></popup-picker>
     <popup-picker title="所属行业" :data="[k.industry]" v-if="k.industry.length" v-model="infos.industry"></popup-picker>
     <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
     <x-input title="电话" v-model="infos.telphone1" text-align="right"></x-input>
     <x-input title="邮箱" v-model="infos.email" text-align="right"></x-input>
     <x-input title="备注" v-model="infos.remark" text-align="right"></x-input>
     <x-input title="微信号" v-model="infos.wechat" text-align="right"></x-input>
     <x-input title="位置" v-model="infos.position" text-align="right"></x-input>
     <x-input title="邮编" v-model="infos.code" text-align="right"></x-input>
     <datetime title="创建时间" readonly v-model="infos.create_time"></datetime>
     <x-address :list="addressData" title="地址" v-model="infos.address" @on-shadow-change="changeCity"></x-address>

   </template>
    </group>
  </div>
</template>

<script>
import { BeCustomer, ERR_OK, AllClueAddAPi, AllCustomer, CustomerApi } from '@/api/api'
import { XInput, Datetime, ChinaAddressV4Data, XAddress, PopupPicker, dateFormat } from 'vux'
import MultiPlayer from '@/page/common/multiplayer'

export default {
  name: 'transformc',
  data () {
    return {
      list: [],
      flag: true,
      addressData: ChinaAddressV4Data,
      unless: ['provance', 'city', 'area', 'imgs'],
      showContent: false,
      infos: null,
      showAddress: false,
      people: {
        flag: false,
        xm: false,
        names: '',
        title: '负责人',
        list: [],
        checks: []
      },
      k: {
        status: [],
        source: [],
        parent_customer: [],
        customer_type: [],
        industry: []
      }
    }
  },
  components: {
    XInput,
    Datetime,
    XAddress,
    MultiPlayer,
    PopupPicker
  },
  created () {
    this.getStatus()
    this.getCustomer()
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
      BeCustomer({row_id: JSON.parse(localStorage.getItem('DETAIL_INFO')).id}, '').then(res => {
        if (ERR_OK === res.code) {
          this.list = res.data.header
          this.infos = res.data.body
          this.infos.address = this.infos.address.split(',')
          this.infos.status = this.infos.status ? this.infos.status.split(',') : []
          this.infos.source = this.infos.source ? this.infos.source.split(',') : []
          this.infos.industry = this.infos.industry ? this.infos.industry.split(',') : []
          this.infos.parent_customer = this.infos.parent_customer ? this.infos.parent_customer.split(',') : []
          this.infos.customer_type = this.infos.customer_type ? this.infos.customer_type.split(',') : []
          this.people.checks = this.infos.user_id.split(',')
          this.people.names = this.infos.user_id
        } else {
          this.$vux.toast.show({ text: '未知错误~' })
        }
      })
      CustomerApi().then(res => {
        res[2].data.forEach(item => { this.k.industry.push(item.showname) })
        res[3].data.forEach(item => { this.k.customer_type.push(item.showname) })
      })
    },
    getStatus () {
      AllClueAddAPi().then(res => {
        console.log(res)
        res[0].data.forEach(item => { this.k.status.push(item.name) })
        res[1].data.forEach(item => { this.k.source.push(item.name) })
        res[2].data.forEach(item => { this.people.list.push(item.username) })
      })
    },
    getCustomer () {
      AllCustomer().then(res => {
        res.data.forEach(item => { this.k.parent_customer.push(item.username) })
      })
    },
    slideDown () {
      this.$refs.title.innerText === '点击展开' ? this.$refs.title.innerText = '点击关闭' : this.$refs.title.innerText = '点击展开'
    },
    select () {
      this.people.xm = !this.people.xm
    },
    changeCity (ids, names) {
      this.infos.provance = names[0]
      this.infos.city = names[1]
      this.infos.area = names[2]
    },
    selctpeople (value, label) {
      this.people.names = this.infos.user_id = label.toString().trim()
    },
    saveData () {
      if (!this.flag) return
      let g = Object.assign({}, this.infos)
      let _that = this
      let data = []
      let time = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
      for (let i in g) {
        if (typeof g[i] === 'object') { g[i] = g[i].toString() }
        data.push({name: i, value: g[i]})
      }
      if (!this.infos.username && !this.infos.revisit_remind_at && !this.infos.weibo && !this.infos.telphone) {
        this.$vux.toast.show({ text: '请填写信息~' })
      } else if (this.infos.revisit_remind_at < time) {
        this.$vux.toast.show({ text: '下次跟进时间必须大于当前时间~', width: '80%' })
      } else {
        this.flag = false
        BeCustomer({row_id: JSON.parse(localStorage.getItem('DETAIL_INFO')).id, field_data: JSON.stringify(data)}, '_save').then(res => {
          if (ERR_OK === res.code) {
            this.$vux.toast.show({
              text: res.msg,
              type: 'success',
              onHide () {
                _that.$router.replace('/clue')
              }
            })
          } else {
            this.flag = true
            this.$vux.toast.show({
              text: res.msg,
              width: '11em'
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  position: relative;
  &:last-of-type {
    &:after{
      display: none;
    }
  }
  &:after{
  content: " ";
  position: absolute;
  left: 15px;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #D9D9D9;
  color: #D9D9D9;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
  }
}
.more {
  color: #c1094c;
  position: relative;
  .fa {margin-right: 5px}
  &:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: -11px;
    right: -30px;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
}
.dx {
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
