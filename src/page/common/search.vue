<template>
 <div class="search vux-1px-b">
 <div v-transfer-dom>
  <popup v-model="grouplist" should-scroll-top-on-show class="val">
    <div class="pheight">
      <group :gutter="0">
        <div class="item-list" v-for="item in list" :key="item.id">
         <!-- <Calendar :popup-header-title="item.showname" :title="item.showname" v-if="item.type ==='date' && item.is_selected > 0" v-model="item.value" @on-change="select" class="nobr"></Calendar> -->
         <datetime :popup-header-title="item.showname" format="YYYY-MM-DD HH:mm" :title="item.showname" v-if="item.type ==='date' && item.is_selected > 0" v-model="item.value" class="nobr"></datetime>
         <popup-picker :popup-title="item.showname" :title="item.showname" :data="item.data" v-if="item.type !=='date' && item.is_selected > 0 && item.data[0].length" v-model='item.value'></popup-picker>
        </div>
      </group>
 <flexbox class="btngroup">
  <flexbox-item>
    <x-button type="default" mini  @click.native="setting = !setting">
      <span><i class="fa fa-wrench" aria-hidden="true"></i>设置</span>
    </x-button>
  </flexbox-item>
  <flexbox-item>
    <x-button type="primary" mini @click.native="emptyData">
      <span><i class="fa fa-trash" aria-hidden="true"></i>清空</span>
    </x-button>
  </flexbox-item>
  <flexbox-item>
    <x-button type="warn" mini @click.native="fix">
      <span><i class="fa fa-check-circle-o" aria-hidden="true"></i>确定</span>
    </x-button>
  </flexbox-item>
</flexbox>
    </div>
  </popup>
</div>
<div v-transfer-dom>
  <popup v-model="setting" should-scroll-top-on-show>
    <div class="pheight">
      <group  :gutter="0">
        <x-switch v-for="item in list" :key="item.id" :title="item.showname" prevent-default @on-click="defaultSetting(item)" :value="item.is_selected" :value-map="[item.id, item.checked]"></x-switch>
      </group>
      <flexbox class="btngroup">
       <flexbox-item>
         <x-button type="default" mini  @click.native="setting = !setting">
           <span><i class="fa fa-ban" aria-hidden="true"></i>取消</span>
         </x-button>
       </flexbox-item>
       <flexbox-item>
       </flexbox-item>
       <flexbox-item>
       </flexbox-item>
     </flexbox>
    </div>
  </popup>
</div>
<div v-transfer-dom>
  <popup v-model="cShow" max-height="50%">
    <group :gutter="0">
      <radio :options="cList" @on-change="cRaio" v-model="defaultRaio"></radio>
    </group>
  </popup>
</div>
   <div class="content">
     <div class="left" @click="chooseType">
       <span>筛选</span>
     </div>
     <div class="left" @click="cShow = true">
       <span>类型</span>
     </div>
     <div class="right">
       <form action="" class="input-kw-form" @submit.prevent="searchWord">
       <input class="keyword" type="search" autocomplete="off" v-model="keyword">
     </form>
     </div>
   </div>
 </div>
</template>

<script>
import { Popup, Group, XSwitch, PopupPicker, Flexbox, FlexboxItem, XButton, Calendar, Radio, Datetime } from 'vux'
import { SearchApi, ERR_OK, USER_KEY, ChooseListApi, SavesearchAPi } from '@/api/api'
let obj = {}
let ids = []
export default {
  name: 'search',
  props: {
    type: String
  },
  data () {
    return {
      stringValue: '100',
      grouplist: false,
      setting: false,
      cShow: false,
      cList: [],
      value: '',
      list: [],
      defaultRaio: '',
      keyword: '',
      newParmas: {},
      params: {
        customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id,
        uid: JSON.parse(localStorage.getItem(USER_KEY)).id
      }
    }
  },
  components: {
    Popup,
    Group,
    XSwitch,
    Calendar,
    PopupPicker,
    Flexbox,
    FlexboxItem,
    XButton,
    Radio,
    Datetime
  },
  created () {
    this.showList()
  },
  methods: {
    defaultSetting (item) {
      if (item.is_selected === -1) {
        ids.push(item.id)
      } else {
        ids.splice(ids.indexOf(item.id), 1)
      }
      SavesearchAPi(this.newParmas).then(res => {
        if (ERR_OK === res.code) {
          item.is_selected === -1 ? item.is_selected = 1 : item.is_selected = -1
        }
      })
    },
    searchWord () {
      obj['keyword'] = this.keyword
      this.fix(false)
      obj['keyword'] = ''
    },
    fix (k) {
      this.list.forEach(item => {
        // if (item.type !== 'date' || !item.value.length) {
        //   obj[item.name] = item.value.toString()
        // } else if (item.value.length === 2) {
        //   obj[item.name] = item.value[0] + ' ' + item.value[1]
        // } else {
        //   obj[item.name] = item.value[0]
        // }
        if (typeof item.value === 'string') {
          obj[item.name] = item.value ? item.value : ''
        } else {
          obj[item.name] = item.value[0] ? item.value[0] : ''
        }
      })
      this.$emit('changeList', obj)
      if (k) this.grouplist = !this.grouplist
    },
    emptyData () {
      this.list.forEach(item => {
        item.type === 'date' ? item.value = '' : item.value = []
      })
    },
    chooseType () {
      obj = {}
      if (!this.list.length) {
        this.params.w_type = this.type
        SearchApi(this.params).then(res => {
          if (ERR_OK === res.code) {
            this.grouplist = !this.grouplist
            res.data.filter(item => {
              if (item.field_type === 'date') {
                this.list.push({id: item.id, name: item.name, showname: item.showname, is_selected: item.is_selected, type: item.field_type, value: '', checked: 1})
              } else {
                let sbulist = []
                let mlist = item.data
                mlist ? mlist = item.data : mlist = []
                mlist.forEach(res => {
                  if (res.name) {
                    if (escape(res.name).indexOf('%u') !== -1) {
                      sbulist.push(res.name)
                    } else {
                      sbulist.push(res.showname)
                    }
                  } else {
                    sbulist.push(res.username)
                  }
                })
                this.list.push({id: item.id, name: item.name, showname: item.showname, is_selected: item.is_selected, type: item.field_type, data: [sbulist], value: [], checked: 1})
              }
            })
            this.newParmas = this.params
            this.list.forEach(item => {
              if (item.is_selected === 1) ids.push(item.id)
            })
            this.newParmas.ids = ids
          } else {
            this.$vux.toast.show({
              text: res.msg
            })
          }
        })
      } else {
        this.grouplist = !this.grouplist
      }
    },
    showList () {
      let params = { 'customer_id': this.params.customer_id, uid: this.params.uid }
      ChooseListApi(params, this.$route.name).then(res => {
        if (ERR_OK === res.code) {
          res.data.forEach(item => {
            this.cList.push({key: item.name, value: item.showname})
            this.defaultRaio = this.cList[0].key
          })
        } else {
          this.$vux.toast.show({ text: res.msg })
        }
      })
    },
    cRaio (val) {
      obj['field'] = val
      this.cShow = false
    },
    select (val) {
      this.list.forEach(item => {
        if (item.type === 'date') {
          if (item.value.length > 2) {
            item.value = []
            this.$vux.toast.show({ text: '请选择两个时间点的范围~', width: '14em' })
          } else {
            item.value.sort()
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
.nobr.vux-calendar:before{display: none;}
.pheight {
  background:#f3f3f3;
  .fa {margin-right: 5px}
  .item-list {
    position: relative;
    &:nth-last-of-type {
      &:after {
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
  .btngroup {
    text-align: center;
    padding: 10px 0
  }
}
.search {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  padding: 10px 0;
  position: relative;
  z-index: 999;
  background-color:white;
  .content {
    display: flex;
    .left {
      min-width: 90px;
      text-align: center;
      position: relative;
      font-size: 14px;
      &:after{
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-right: 1px solid #C7C7C7;
        color: #C7C7C7;
        transform-origin: 100% 0;
        transform: scaleX(0.5);
      }
      &:before {
        content: '❯';
        position: absolute;
        color:#C7C7C7;
        right: 15px;
        transform: rotate(90deg);
      }
      span {
        width: 100%;
        display: block;
      }
    }
    .right {
      flex:1;
      padding:0 15px 0 30px;
      background:url(../../assets/Search.svg) no-repeat 5px center/contain;
      .input-kw-form {
        overflow: hidden;
        float:left;
        height: 100%;
        width: 100%;
        .keyword {
          appearance:none;
          border: 0 none;
          outline: 0 none;
          height: 100%;
          float:left;
          width: 100%
        }
      }
    }
  }
}
</style>
