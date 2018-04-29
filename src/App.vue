<template>
 <div class="search vux-1px-b">
   <div v-transfer-dom>
  <popup v-model="grouplist" should-scroll-top-on-show class="val">
    <div class="pheight">
      <group :gutter="0">
        <div class="item-list" v-for="item in list" :key="item.id">
         <Calendar :title="item.showname" v-if="item.type ==='date' && item.is_selected > 0" v-model="item.value" @on-change="select"></Calendar>
         <popup-picker :title="item.showname" :data="item.data" v-if="item.type !=='date' && item.is_selected > 0" v-model='item.value' @on-change="changeData"></popup-picker>
        </div>
      </group>
 <flexbox class="btngroup">
  <flexbox-item>
    <x-button type="default" mini  @click.native="setting = !setting">
      <span><i class="fa fa-wrench" aria-hidden="true"></i>设置</span>
    </x-button>
  </flexbox-item>
  <flexbox-item>
    <x-button type="primary" mini>
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
        <x-switch v-for="item in checkedlist" :key="item.id" :title="item.showname" @on-change="defaultSetting" :value="item.checked"></x-switch>
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
         <x-button type="warn" mini>
           <span><i class="fa fa-check-circle-o" aria-hidden="true"></i>确定</span>
         </x-button>
       </flexbox-item>
     </flexbox>
    </div>
  </popup>
</div>
   <div class="content">
     <div class="left">
       <span @click="grouplist = !grouplist">选择类型</span>
     </div>
     <div class="right">
       <form action="" class="input-kw-form">
       <input class="keyword" type="search" autocomplete="off" v-model="msg">
     </form>
     </div>
   </div>
 </div>
</template>

<script>
import { Popup, Group, XSwitch, PopupPicker, Flexbox, FlexboxItem, XButton, Calendar } from 'vux'
import { SearchApi, ERR_OK, USER_KEY } from '@/api/api'

export default {
  name: 'search',
  data () {
    return {
      stringValue: '100',
      grouplist: false,
      setting: false,
      value: '',
      list: [],
      msg: '111',
      checkedlist: [],
      lism: {name: 'ss', value: ['fsdf', 'fsdfaf']},
      params: {
        customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id,
        uid: JSON.parse(localStorage.getItem(USER_KEY)).id,
        w_type: 'clue'
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
    XButton
  },
  created () {
    this.getFiled()
  },
  methods: {
    getFiled () {
      SearchApi(this.params).then(res => {
        if (ERR_OK === res.code) {
          res.data.filter(item => {
            if (item.field_type === 'date') {
              this.list.push({id: item.id, showname: item.showname, is_selected: item.is_selected, type: item.field_type, value: []})
            } else {
              let sbulist = []
              let mlist = item.data
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
              this.list.push({id: item.id, showname: item.showname, is_selected: item.is_selected, type: item.field_type, data: [sbulist]})
            }
          })
          this.list.filter(item => {
            if (item.is_selected < 0) {
              this.checkedlist.push({id: item.id, checked: false, showname: item.showname})
            } else {
              this.checkedlist.push({id: item.id, checked: true, showname: item.showname})
            }
          })
        } else {
          this.$vux.toast.show({
            text: res.msg
          })
        }
      })
    },
    changeData (val) {
      this.$vux.bus.$emit('changeList', val)
    },
    defaultSetting (val) {
      console.log(val)
    },
    fix () {
      console.log(this.list)
    },
    select (val) {
      console.log(val)
      this.list.forEach(item => {
        if (item.type === 'type' && item.value && item.value.length > 2) {
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@baseColor:#1cb0f1;
html,body,#app{height:100%;overflow-x:hidden;width: 100%}
html {-webkit-text-size-adjust:100%}
body {font-family:-apple-system-font,Helvetica Neue,sans-serif}
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
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #C7C7C7;
    color: #C7C7C7;
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
  .content {
    display: flex;
    .left {
      width: 150px;
      min-width: 150px;
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
        right: 30px;
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
      background:url(./assets/Search.svg) no-repeat 5px center/contain;
      .input-kw-form {
        overflow: hidden;
        float:left;
        height: 100%;
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
