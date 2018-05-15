<template>
  <div class="nobar listdata">
    <div class="search vux-1px-b">
    <div class="content">
      <div class="left" @click="check = !check">
        <span ref="type">{{searchname}}</span>
      </div>
      <div class="right">
        <form action="" class="input-kw-form"  @submit.prevent="searchList">
        <input class="keyword" type="search" autocomplete="off" placeholder="请输入关键词" v-model="params.keyword">
      </form>
      </div>
    </div>
  </div>
  <div class="tips vux-1px-b">
    查重字段：{{tips}}
  </div>
  <div :style="{height: vh_}" class="_mm">
  <scroller v-if="listData.length" :height="vh_" lock-x use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
      <group :gutter="0">
         <cell v-for="m in listData" :key="m.id" v-if="params.tab_type === 'contact'">
           <div slot="title"><i class="fa fa-user" aria-hidden="true"></i>{{m.username}}</div>
         </cell>
         <cell is-link v-for="m in listData" :key="m.id" v-if="params.tab_type === 'lead'" @click.native="showDetail(m)">
           <div slot="title"><i class="fa fa-user" aria-hidden="true"></i>{{m.username}}</div>
           <div slot="after-title" class="tel"><i class="fa fa-phone" aria-hidden="true"></i>{{m.telphone1}}</div>
           <div>{{m.company}}</div>
         </cell>
         <cell is-link v-for="m in listData" :key="m.id" v-if="params.tab_type === 'customer'" @click.native="showDetail(m)">
           <div slot="title"><i class="fa fa-user" aria-hidden="true"></i>{{m.username}}</div>
           <div slot="after-title" class="tel"><i class="fa fa-phone" aria-hidden="true"></i>{{m.telphone1}}</div>
           <div>{{m.company}}</div>
         </cell>
     </group>
     <!--pullup slot-->
     <div slot="pullup" class="pullup">
       <span v-show="status.pullupStatus === 'default'"></span>
       <span class="pullup-arrow" v-show="status.pullupStatus === 'default' || status.pullupStatus === 'up' || status.pullupStatus === 'down'" :class="{'rotate': status.pullupStatus === 'down'}">↑</span>
       <span v-show="status.pullupStatus === 'loading'"><spinner type="bubbles" size="30px"></spinner></span>
     </div>
     <!--pulldown slot-->
     <div slot="pulldown" class="pulldown">
        <span v-show="status.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="status.pulldownStatus === 'down' || status.pulldownStatus === 'up'" :class="{'rotate': status.pulldownStatus === 'up'}">↓</span>
        <span v-show="status.pulldownStatus === 'loading'"><spinner type="lines"></spinner></span>
     </div>
   </scroller>
   <empty-data v-if="!listData.length"></empty-data>
 </div>
  <div v-transfer-dom>
    <popup v-model="check">
      <group :gutter="0">
        <radio :options="menus" :value="$route.params.type" @on-change="Checked"></radio>
      </group>
    </popup>
  </div>
  <div v-transfer-dom>
    <x-dialog v-model="detail" hide-on-blur>
      <x-icon type="ios-close-outline" style="fill:#35495e;" class="close" size="32" @click.native="detail = !detail"></x-icon>
      <group :gutter="0" label-align="justify" label-width="4em" title="其他信息">
        <x-input title="手机" :value="iteminfos.telphone" disabled text-align="right"></x-input>
        <x-input title="邮箱" :value="iteminfos.email" disabled text-align="right"></x-input>
        <x-input title="微信号" :value="iteminfos.wechat" disabled text-align="right"></x-input>
        <x-input title="QQ号" :value="iteminfos.qq" disabled text-align="right"></x-input>
        <x-input v-if="params.tab_type === 'lead'" title="微博" :value="iteminfos.weibo" disabled text-align="right"></x-input>
        <x-input title="网址" :value="iteminfos.site_url" disabled text-align="right"></x-input>
      </group>
    </x-dialog>
  </div>
  </div>
</template>
<script>
import { Popup, Radio, Scroller, Spinner, XDialog, XInput } from 'vux'
import EmptyData from '@/page/common/emptydata'
import { AllSearchField, ChecksApi, ERR_OK } from '@/api/api'

export default {
  name: 'checks',
  data () {
    return {
      detail: false,
      check: false,
      iteminfos: [],
      menus: [ {key: 'lead', value: '线索'}, {key: 'customer', value: '客户'}, {key: 'contact', value: '联系人'} ],
      pullupEnabled: true,
      listData: [],
      tips: '',
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      params: {
        keyword: '',
        page: 1,
        tab_type: this.$route.params.type
      }
    }
  },
  created () {
    this.getField()
  },
  components: {
    Popup,
    Radio,
    Scroller,
    Spinner,
    EmptyData,
    XDialog,
    XInput
  },
  methods: {
    getField (name) {
      let type = !name ? this.$route.params.type : name
      AllSearchField({tab_type: type}).then(res => {
        let msg = []
        res.data.forEach(item => { msg.push(item.name) })
        this.tips = msg.toString()
      })
    },
    Checked (value, label) {
      this.$refs.type.innerText = label
      this.listData = []
      this.getField(value)
      this.params.tab_type = value
      this.check = !this.check
    },
    list (flag) {
      ChecksApi(this.params).then(res => {
        if (flag) {
          this.listData = []
          if (this.$refs.scroll) this.$refs.scroll.reset({ top: 0 })
        }
        if (ERR_OK === res.code) {
          this.listData = [...this.listData, ...res.data.tbody]
          if (res.data.tbody.length < 15) {
            setTimeout(() => { if (this.$refs.scroll) this.$refs.scroll.disablePullup() }, 100)
            this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
          } else if (res.data.tbody.length >= 15) {
            if (this.$refs.scroll) {
              this.$refs.scroll.enablePullup()
            }
          }
        } else {
          if (this.$refs.scroll) this.$refs.scroll.disablePullup()
          this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
        }
      })
    },
    loadMore () {
      setTimeout(() => {
        this.params.page ++
        this.list(false)
        if (this.$refs.scroll) this.$refs.scroll.donePullup()
      }, 1000)
    },
    refresh () {
      setTimeout(() => {
        this.params.page = 1
        this.list(true)
        if (this.$refs.scroll) this.$refs.scroll.reset({top: 0})
      }, 1000)
    },
    searchList () {
      if (this.params.keyword) {
        this.params.page = 1
        this.list(true)
      } else {
        this.$vux.toast.show({
          text: '你确定不是在开完笑>_<~',
          width: '13em'
        })
      }
    },
    showDetail (item) {
      console.log(item)
      this.detail = !this.detail
      this.iteminfos = item
    }
  },
  computed: {
    vh_ () {
      return window.innerHeight - 116 + 'px'
    },
    searchname () {
      let name = this.$route.params.type
      if (name === 'lead') return '线索'
      if (name === 'contact') return '联系人'
      if (name === 'customer') return '客户'
    }
  }
}
</script>

<style lang="less" scoped>
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
.tips {
  height: 20px;
  color:#9a9a9a;
  line-height: 20px;
  padding: 5px 15px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  z-index: 999;
  background-color:white;
}
.listdata {
  ._mm {position: relative; top:-2px;
    ._oo{position: relative;
   }
 }
 .tel {
   font-size: 12px;
   color:#666
 }
}
.rotate {
transform: rotate(180deg);
-webkit-transform: rotate(180deg);
}
.pullup-arrow {
display: block;
transition: all linear 0.2s;
-webkit-transition: all linear 0.2s;
color: #666;
font-size: 20px;
}
.pullup {
   position: absolute;
   width: 100%;
   height: 40px;
   bottom: -46px;
   text-align: center;
   padding-top: 15px
}
.pulldown {
  position: absolute;
  width: 100%;
  height: 60px;
  line-height: 60px;
  top: -60px;
  text-align: center;
}
.close{position: absolute;top:0px;right: 0px;}
</style>
