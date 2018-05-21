<template>
  <div class="nobar" :class="{hastool: is_edit !== 1}">
    <div class="main_o">
      <div v-transfer-dom>
      <x-dialog v-model="xk" :mask-z-index="498" :dialog-style="{ zIndex: 499 }">
        <x-icon type="ios-close-outline" style="fill:#35495e;" class="close" size="32" @click.native="xk = !xk"></x-icon>
          <group :gutter="0" title="审批意见">
          <x-textarea :max="200" placeholder="请输入内容" v-model="params.reason"></x-textarea>
          <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
          </group>
          <div class="savebtn">
          <x-button type="warn" @click.native="saveData" :disabled="!isClick">保存</x-button>
          </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
       <popup v-model="k.xn" max-height="50%">
          <checklist :options="k.user_id" @on-change="selectCharge" v-model="k.checks"></checklist>
       </popup>
    </div>
      <div class="dx">
        <group :gutter="0" title="基本信息">
           <div v-for="m in list" v-if="m.required === 1" class="item">
             <x-input :disabled="Edit" :show-clear="false" :placeholder="'请输入' + m.showname" v-if="m.field_type === 'text' || m.field_type === 'decimal' || m.field_type === 'textarea'" :title="m.showname" v-model='m.value' text-align="right" :type="m.name.indexOf('tel') !== -1 ? 'tel' : 'text'" required></x-input>
             <datetime :readonly="Edit" v-model="m.value" :title="m.showname" v-if="m.field_type === 'date'" format="YYYY-MM-DD HH:mm"></datetime>
             <popup-picker :disabled="Edit" v-if="m.field_type === 'drop' && n[m.name].length" :popup-title="m.showname" :data="[n[m.name]]" :title="m.showname" v-model="m.value"></popup-picker>
           </div>
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
         <div v-for="m in list" v-if="m.required === 0 && unless.indexOf(m.name) === -1" class="item">
           <x-input :disabled="Edit" :show-clear="false" :is-type="m.name.indexOf('tel') !== -1 ? 'china-mobile' : ''" :placeholder="'请输入' + m.showname" :title="m.showname" v-model='m.value' v-if="m.field_type === 'text' && m.name !== 'address' || m.field_type === 'decimal' || m.field_type === 'textarea' || m.field_type === 'email'" text-align="right" :type="m.name.indexOf('tel') !== -1 ? 'tel' : 'text'"></x-input>
           <datetime :disabled="Edit" v-model="m.value" :title="m.showname" v-if="m.field_type === 'date'" format="YYYY-MM-DD HH:mm" :readonly="m.name === 'create_time'"></datetime>
           <x-address :disabled="Edit"  @on-shadow-change="onShadowChange" :title="m.showname" v-model="m.value" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"  v-if="m.name === 'address'"></x-address>
           <popup-picker :disabled="Edit" v-if="m.field_type === 'drop' && n[m.name].length && m.name !== 'user_id'" :popup-title="m.showname" :data="[n[m.name]]" :title="m.showname" v-model="m.value"></popup-picker>
           <cell primary="content" :disabled="Edit" :title="m.showname" is-link @click.native="om" v-model="m.value" v-if="m.name === 'user_id'"></cell>
         </div>
       </template>
        </group>
        <div class="savebtn">
        <x-button type="warn" @click.native="delItem" :disabled="!flag">删除</x-button>
        </div>
      </div>
    </div>
    <div class="caidan" v-if="is_edit !== 1">
    <div class="tools" v-if="Edit">
      <span class="icon" @click="show(2)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
      <span class="text">审批否决</span>
    </div>
    <div class="tools" @click="show(3)" v-if="Edit">
      <span class="icon"><i class="fa fa-ban" aria-hidden="true"></i></span>
      <span class="text">审批撤销</span>
    </div>
    <div class="tools" v-if="Edit">
      <span class="icon" @click="show(1)"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>
      <span class="text">审批通过</span>
    </div>
    <div class="tools" v-if="is_edit !== 0">
      <span class="icon" @click="show(0)"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>
      <span class="text">提交审批</span>
    </div>
    </div>
  </div>
</template>

<script>
import { ApprovalLog, Approval, ERR_OK, DetailApi, DelThis, EditSave, CListApi } from '@/api/api'
import { XAddress, ChinaAddressV4Data, XDialog, XTextarea, XButton, Datetime, PopupPicker, XInput, Checklist, Popup, Tab, TabItem } from 'vux'
import MultiPlayer from '@/page/common/multiplayer'
export default {
  name: 'audited',
  data () {
    return {
      flag: true,
      is_edit: 0,
      k: {
        name: 'contract',
        flag: false,
        xn: false,
        user_id: [],
        checks: []
      },
      n: {
        opporttunity: [],
        pi_status: [],
        con_type: [],
        pay_way: [],
        user_id: [],
        user_id_2: [],
        customer: []
      },
      params: {
        status: 0,
        row_id: this.$route.params.id,
        reason: '',
        notice_uids: [],
        w_type: 'contract'
      },
      people: {
        xm: false,
        names: '',
        title: '参与人员',
        list: [],
        checks: []
      },
      xk: false,
      addressData: ChinaAddressV4Data,
      showAddress: false,
      unless: ['provance', 'city', 'area', 'imgs'],
      showContent: false,
      list: []
    }
  },
  components: {
    XAddress,
    XDialog,
    XTextarea,
    MultiPlayer,
    XButton,
    Datetime,
    PopupPicker,
    XInput,
    Checklist,
    Popup,
    Tab,
    TabItem
  },
  created () {
    this.getInfos()
    this.getList()
    this.$vux.bus.$on('Addinfo', () => {
      this.editSave()
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
    getInfos () {
      let _that = this
      DetailApi({row_id: this.$route.params.id}, 'Contract').then(res => {
        if (ERR_OK === res.code) {
          let o = res.data.detail
          this.is_edit = o.body.be_approved
          o.header.forEach(item => {
            if (item.name === 'customer') item.field_type = 'drop'
            for (let m in o.body) {
              if (item.name === m) {
                if (o.body[m]) {
                  if (item.field_type === 'drop' && item.name !== 'user_id') {
                    item.value = [o.body[m]]
                  } else {
                    if (item.name === 'address') {
                      o.body[m] ? item.value = o.body[m].split(',') : item.value = []
                    } else { item.value = o.body[m] }
                  }
                }
              }
            }
            this.list.push(item)
          })
          if (o.body['user_id']) this.k.checks = o.body['user_id'].split(',')
        } else {
          this.$vux.toast.show({
            text: res.msg,
            onHide () {
              _that.$router.back()
            }
          })
        }
      })
    },
    select () {
      this.people.xm = !this.people.xm
    },
    om () {
      if (!this.Edit) {
        this.k.xn = !this.k.xn
      }
    },
    slideDown () {
      this.$refs.title.innerText === '点击展开' ? this.$refs.title.innerText = '点击关闭' : this.$refs.title.innerText = '点击展开'
    },
    selctpeople (ids, value) {
      this.people.names = value.toString().trim()
      this.k.person = value
      this.params.notice_uids = ids
    },
    editSave () {
      if (this.is_edit) {
        if (!this.flag) return
        let _that = this
        let data = []
        let g = []
        this.list.forEach(item => { data.push({name: item.name, value: item.value}) })
        data.forEach(item => {
          if (!item.value) item.value = ''
          if (typeof item.value === 'object') item.value = item.value.toString()
        })
        g.field_data = JSON.stringify(data)
        g.row_id = this.$route.params.id
        this.flag = false
        EditSave(g, 'contract').then(res => {
          if (ERR_OK === res.code) {
            this.$vux.toast.show({
              text: res.msg,
              type: 'success',
              onHide () { _that.flag = true }
            })
          } else {
            this.$vux.toast.show({
              text: res.msg,
              width: '50%',
              onHide () { _that.flag = true }
            })
          }
        })
      } else {
        this.$vux.toast.show({ text: '审核状态下无法修改内容', width: '50%' })
      }
    },
    show (status) {
      if (!this.flag) return
      this.xk = !this.xk
      this.params.status = status
    },
    onShadowChange (ids, names) {
      this.list.forEach(item => {
        if (item.name === 'provance') item.value = names[0]
        if (item.name === 'city') item.value = names[1]
        if (item.name === 'area') item.value = names[2]
      })
    },
    delItem () {
      let _that = this
      if (!this.flag) return
      this.flag = false
      this.$vux.confirm.show({
        title: '删除后不可恢复~',
        onConfirm () {
          DelThis({row_id: _that.$route.params.id}, 'Contract').then(res => {
            if (ERR_OK === res.code) {
              _that.$vux.toast.show({
                text: res.msg,
                type: 'success',
                onHide () {
                  _that.$router.replace('/contract')
                } })
            } else {
              _that.flag = true
              _that.$vux.toast.show({ text: res.msg })
            }
          })
        },
        onCancel () {
          _that.flag = true
        }
      })
    },
    selectCharge (value) {
      this.list.forEach(item => {
        if (item.name === 'user_id') {
          item.value = value.toString()
        }
      })
    },
    saveData () {
      let _that = this
      this.flag = false
      ApprovalLog(this.params).then(res => {
        this.params.reason = ''
        if (ERR_OK === res.code) {
          Approval({status: this.params.status, row_id: this.$route.params.id}, this.k.name).then(res => {
            if (ERR_OK === res.code) {
              this.xk = !this.xk
              this.$vux.toast.show({ text: res.msg, type: 'success', onHide () { _that.$router.back() } })
            } else {
              this.flag = true
              this.$vux.toast.show({ text: res.msg })
            }
          })
        } else {
          this.flag = true
          this.$vux.toast.show({ text: res.msg })
        }
      })
    },
    getList () {
      CListApi().then(res => {
        res[0].data.forEach(item => { this.n.pay_way.push(item.showname) })
        res[1].data.forEach(item => { this.n.con_type.push(item.showname) })
        res[2].data.forEach(item => { this.n.pi_status.push(item.showname) })
        res[3].data.forEach(item => { this.n.customer.push(item.username) })
        res[4].data.forEach(item => {
          this.n.user_id.push(item.username)
          this.people.list.push({key: item.id, value: item.username})
        })
        this.k.user_id = this.n.user_id
      })
    }
  },
  computed: {
    isClick () {
      return this.params.reason && this.people.names
    },
    Edit () {
      return this.is_edit === 0
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
.caidan {
  width: 52px;
  height: 52px;
  bottom: 0;
  width: 100%;
  left: 0;
  opacity: 1;
  position: absolute;
  z-index: 99;
  overflow: hidden;
  display: flex;
  box-shadow: 1px 1px 20px 0px #35495e;
  border-top: 1px solid #6b6b6b;
  background:#35495e;
  .tools {
    flex:1;
    color:white;
    text-align: center;
    a {color:#10aeff}
    span {
      display: block;
      &.icon{padding: 5px 0 0 0; .fa {font-size: 27px;margin:0}}
      &.text{ font-size: 10px}
    }
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
.nobar {
  &.hastool {
   overflow: hidden;
   padding-bottom: 50px;
  &>.main_o{
    width: 100%;
    padding-top: 0;
    padding-bottom:0;
    overflow: auto;
    box-sizing: border-box;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
  }
}
.savebtn {margin: 15px}
.close{position: absolute;top:0px;right: 0px;}
</style>
