<template>
  <div class="nobar">
    <div v-transfer-dom>
       <popup v-model="k.xn" max-height="50%">
          <checklist :options="k.user_id" @on-change="selectCharge" v-model="k.checks"></checklist>
       </popup>
    </div>
    <div class="main_o">
      <div class="dx">
        <group :gutter="0" title="基本信息">
           <div v-for="m in list" v-if="m.required === 1" class="item">
             <x-input  :show-clear="false" :placeholder="'请输入' + m.showname" v-if="m.field_type === 'text' || m.field_type === 'decimal' || m.field_type === 'textarea'" :title="m.showname" v-model='m.value' text-align="right" :type="m.name.indexOf('tel') !== -1 ? 'tel' : 'text'" required></x-input>
             <datetime  v-model="m.value" :title="m.showname" v-if="m.field_type === 'date'" format="YYYY-MM-DD HH:mm"></datetime>
             <popup-picker  v-if="m.field_type === 'drop' && n[m.name].length" :popup-title="m.showname" :data="[n[m.name]]" :title="m.showname" v-model="m.value"></popup-picker>
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
           <x-input  :show-clear="false" :is-type="m.name.indexOf('tel') !== -1 ? 'china-mobile' : ''" :placeholder="'请输入' + m.showname" :title="m.showname" v-model='m.value' v-if="m.field_type === 'text' && m.name !== 'address' || m.field_type === 'decimal' || m.field_type === 'textarea' || m.field_type === 'email'" text-align="right" :type="m.name.indexOf('tel') !== -1 ? 'tel' : 'text'"></x-input>
           <datetime  v-model="m.value" :title="m.showname" v-if="m.field_type === 'date'" format="YYYY-MM-DD HH:mm" :readonly="m.name === 'create_time'"></datetime>
           <popup-picker  v-if="m.field_type === 'drop' && n[m.name].length && m.name !== 'user_id'" :popup-title="m.showname" :data="[n[m.name]]" :title="m.showname" v-model="m.value"></popup-picker>
           <cell primary="content"  :title="m.showname" is-link @click.native="k.xn = !k.xn" v-model="m.value" v-if="m.name === 'user_id'"></cell>
         </div>
       </template>
        </group>
        <div class="savebtn">
        <x-button type="warn" @click.native="delItem" :disabled="!flag">删除</x-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ERR_OK, DetailApi, DelThis, EditSave, AllCustomer, oppoApi, AllAdminApi, AllDepartmentApi } from '@/api/api'
import { XButton, Datetime, PopupPicker, XInput, Checklist, Popup, Tab, TabItem } from 'vux'
import MultiPlayer from '@/page/common/multiplayer'
export default {
  name: 'oppoaudited',
  data () {
    return {
      flag: true,
      k: {
        name: 'opportunities',
        flag: false,
        xn: false,
        user_id: [],
        checks: []
      },
      n: {
        customer: [],
        oppo_source: [],
        oppo_type: [],
        sales_phase: [],
        user_id: [],
        user_id_2: [],
        want_department_id: [],
        per_department: [],
        per_user: []
      },
      showAddress: false,
      unless: ['provance', 'city', 'area', 'imgs'],
      showContent: false,
      list: []
    }
  },
  components: {
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
    this.CustomerList()
    this.getOppo()
    this.getAllCustomer()
    this.getDepartment()
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
      DetailApi({row_id: this.$route.params.id}, 'opportunities').then(res => {
        if (ERR_OK === res.code) {
          let o = res.data
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
          console.log(o)
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
    slideDown () {
      this.$refs.title.innerText === '点击展开' ? this.$refs.title.innerText = '点击关闭' : this.$refs.title.innerText = '点击展开'
    },
    selctpeople (ids, value) {
      this.people.names = value.toString().trim()
      this.k.person = value
      this.params.notice_uids = ids
    },
    editSave () {
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
      EditSave(g, 'opportunities').then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            onHide () {
              _that.flag = true
              _that.$router.back()
            }
          })
        } else {
          this.$vux.toast.show({
            text: res.msg,
            width: '50%',
            onHide () { _that.flag = true }
          })
        }
      })
    },
    delItem () {
      let _that = this
      if (!this.flag) return
      this.flag = false
      this.$vux.confirm.show({
        title: '删除后不可恢复',
        onConfirm () {
          DelThis({row_id: _that.$route.params.id}, 'opportunities').then(res => {
            if (ERR_OK === res.code) {
              _that.$vux.toast.show({
                text: res.msg,
                type: 'success',
                onHide () {
                  _that.$router.go(-2)
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
    CustomerList () {
      AllCustomer().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.customer.push(item.username)
          })
        }
      })
    },
    getOppo () {
      oppoApi().then(res => {
        res[0].data.forEach(item => { this.n.oppo_source.push(item.showname) })
        res[1].data.forEach(item => { this.n.sales_phase.push(item.showname) })
        res[2].data.forEach(item => { this.n.oppo_type.push(item.showname) })
      })
    },
    getAllCustomer () {
      AllAdminApi().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.user_id.push(item.username)
          })
        }
        this.n.user_id_2 = this.n.per_user = this.k.user_id = this.n.user_id
      })
    },
    getDepartment () {
      AllDepartmentApi().then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.n.want_department_id.push(item.name)
          })
        }
        this.n.per_department = this.n.want_department_id
      })
    }
  },
  computed: {
    isClick () {
      return this.params.reason && this.people.names
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
