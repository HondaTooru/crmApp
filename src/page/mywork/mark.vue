<template>
<div class="nobar listdata">
  <div v-transfer-dom>
    <x-dialog v-model="showComments">
      <x-icon type="ios-close-outline" style="fill:#35495e;" class="close" size="32" @click.native="showComments = !showComments"></x-icon>
      <group :gutter="0" title="评论内容">
        <x-textarea ref="msg" :max="50" placeholder="评论内容" v-model="visitId.content"></x-textarea>
      </group>
      <div class="savebtn">
      <x-button type="warn" @click.native="saveComments" :disabled="isClick">提交</x-button>
      </div>
    </x-dialog>
  </div>
  <div v-transfer-dom>
    <popup v-model="oa" :popup-style="{backgroundColor: 'white'}" max-height="50%">
       <radio :options="option" @on-change="change"></radio>
    </popup>
  </div>
  <div v-transfer-dom>
    <popup v-model="ox" :popup-style="{backgroundColor: 'white'}" max-height="50%">
       <radio :options="option_" @on-change="change_" value="record"></radio>
    </popup>
  </div>
  <div :style="{height: vh_}" class="_mm">
    <div class="search vux-1px-b">
      <div class="content">
        <div class="left" @click="oa = !oa">
          <span>跟进类型</span>
        </div>
        <div class="left" @click="ox = !ox">
          <span>搜索类型</span>
        </div>
        <div class="right">
          <form action="" class="input-kw-form" @submit.prevent="searchWord">
          <input class="keyword" type="search" autocomplete="off" v-model="params.keyword" placeholder="请输入关键词">
        </form>
        </div>
      </div>
    </div>
  <scroller v-if="listData.length" :height="vh_" lock-x use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
    <group :gutter="0" class="revisitlist" v-if="list.length">
      <cell v-for="(item, i) in listData" :key="i" :border-intent="false" align-items="flex-start">
      <div slot="icon" class="avatar" :style="{backgroundImage: 'url(' + item.avatar + ')'}"></div>
      <div slot="title">
      <span class="rdate"> <i class="fa fa-clock-o" aria-hidden="true"></i>{{item.revisit_time}}
        <i class="fa fa-trash-o" aria-hidden="true" v-if="item.is_own" @click="delvisit(item)"></i></span>
        <i class="fa fa-user" aria-hidden="true"></i> {{item.username}}
        <i class="fa fa-angle-right right_arrow" aria-hidden="true"></i>{{item.revisit_way}}
      </div>
      <div slot="inline-desc" class="coments" v-if="item.comment.count">
         <div class="item" v-for="m in item.comment.data" :key="m.id">
           <span class="date"><i class="fa fa-clock-o" aria-hidden="true"></i>{{m.create_time}}</span>
           <i class="fa fa-trash-o" aria-hidden="true" v-if="m.is_own" @click="delReply(item,m)"></i>
           <span>{{m.user_info.username}}：</span>{{m.content}}</div>
      </div>
      <div slot="after-title">
        <div class="content">{{item.record}}</div>
        <div class="desc">
        <span class="message"><i class="fa fa-comments-o" aria-hidden="true" @click="reply(item)"></i></span>  <span>来自线索：</span><span class="user"><i class="fa fa-user-o" aria-hidden="true"></i>{{item.customer}}</span>
        </div>
      </div>
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
</div>
</template>

<script>
import { Scroller, Spinner, XDialog, XTextarea, XButton, Popup, Radio } from 'vux'
import EmptyData from '@/page/common/emptydata'
import { ERR_OK, RevisitApi, DelVisit, DelComment, SaveComment, AllVisitApi } from '@/api/api'
// PlanRecord

export default {
  name: 'allrevisit',
  data () {
    return {
      showComments: false,
      option: [],
      option_: [{key: 'record', value: '跟进类容'}, {key: 'username', value: '跟进人'}, {key: 'customer', value: '跟进客户'}],
      oa: false,
      ox: false,
      params: {
        page: 1,
        record_type: '',
        revisit_way: '',
        start_time: '',
        end_time: '',
        keyword: '',
        field: 'record'
      },
      visitId: {visit_id: '', content: ''},
      listData: [],
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  created () {
    this.list()
    this.getOptions()
    this.$vux.bus.$on('getTypeList', msg => {
      this.params.page = 1
      this.params.record_type = msg.name
      this.list(true)
    })
  },
  beforeDestory () {
    this.$vux.bus.$off('getTypeList')
  },
  methods: {
    list (flag, show) {
      if (typeof show === 'undefined') show = true
      RevisitApi(this.params).then(res => {
        if (flag) {
          this.listData = []
          if (this.$refs.scroll) this.$refs.scroll.reset({ top: 0 })
        }
        if (ERR_OK === res.code) {
          this.listData = [...this.listData, ...res.data]
          if (res.data.length < 15) {
            setTimeout(() => { if (this.$refs.scroll) this.$refs.scroll.disablePullup() }, 100)
            if (show) this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
          } else if (res.data.length >= 15) {
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
    refresh () {
      setTimeout(() => {
        this.params.page = 1
        this.list(true)
        if (this.$refs.scroll) this.$refs.scroll.reset({top: 0})
      }, 1000)
    },
    loadMore () {
      setTimeout(() => {
        this.params.page ++
        this.list(false)
        if (this.$refs.scroll) this.$refs.scroll.donePullup()
      }, 1000)
    },
    delvisit (item) {
      DelVisit({visit_id: item.id}).then(res => {
        this.flag = !this.flag
        this.listData.splice(this.listData.indexOf(item), 1)
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success'
          })
        } else {
          this.$vux.toast.show({
            text: res.msg
          })
        }
      })
    },
    delReply (item, m) {
      DelComment({visit_id: item.id, comment_id: m.id}).then(res => {
        item.comment.data.splice(item.comment.data.indexOf(m), 1)
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success'
          })
        } else {
          this.$vux.toast.show({
            text: res.msg
          })
        }
      })
    },
    reply (item) {
      this.showComments = !this.showComments
      this.visitId.visit_id = item.id
    },
    saveComments () {
      SaveComment(this.visitId).then(res => {
        this.showComments = false
        if (ERR_OK === res.code) {
          this.list(true, false)
          this.visitId.content = ''
          this.$vux.toast.show({
            text: res.msg,
            type: 'success'
          })
        } else {
          this.$vux.toast.show({ text: res.msg, width: '15em', position: 'bottom' })
        }
      })
    },
    getOptions () {
      AllVisitApi().then(res => {
        res.data.forEach(item => { this.option.push(item.name) })
      })
    },
    change (value) {
      this.params.revisit_way = value
      this.params.page = 1
      this.list(true)
      this.oa = !this.oa
    },
    change_ (value) {
      this.params.field = value
      this.ox = !this.ox
    },
    searchWord () {
      if (this.params.keyword) {
        this.list(true)
      } else {
        this.$vux.toast.show({text: '你想搜索什么呢~', width: '11em', position: 'bottom'})
      }
    }
  },
  components: {
    Scroller,
    Spinner,
    EmptyData,
    XDialog,
    XTextarea,
    XButton,
    Popup,
    Radio
  },
  computed: {
    vh_ () {
      return window.innerHeight - 86 + 'px'
    },
    isClick () {
      return !this.visitId.content
    }
  }
}
</script>

<style lang="less" scoped>
.listdata {
  ._mm {position: relative; top:-2px;
    .dsc {font-size: 12px;color:#666;
      span:nth-of-type(1) {padding-right: 10px;margin-right: 10px;}
    }
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
@borderColor: #65707b;
.revisitlist {
  position: relative;
  top:-2px;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 7px 5px 0 0;
    overflow: hidden;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
  }
  .right_arrow {
    padding: 0 0 0 7px;
  }
  .rdate {
    float:right;
    display: inline-block;
    .fa-trash-o{
      color:#ca3838;
      margin-left: 10px
    }
  }
  .content {
    word-break:break-all;
  }
  .desc {
    span {
      &.user { color:#10aeff }
      &.message {float:right;display: inline-block;}
    }
  }
  .subcontent {
    width: 100%
  }
  .coments {
    .item {
      background-color: @borderColor;
      color: white;
      padding: 5px 20px 5px 10px;
      font-size: 12px;
      border-radius: 5px;
      position: relative;
      margin-top: 25px;
      position: relative;
      .fa-trash-o {
        position: absolute;
        top:9px;
        right: 0;
        color:#999
      }
      .date {
        position: absolute;
        top: -22px;
        right: 0;
        color:#999;
        .fa-clock-o {

        }
      }
      &::before {
        position: absolute;
        content: '';
        width:0px;
        height:0px;
        top:-18px;
        border-top:10px solid rgba(0,0,0,0);
        border-right:8px solid  rgba(0,0,0,0);
        border-bottom:10px solid @borderColor;
        border-left:8px solid  rgba(0,0,0,0);
      }
    }
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
      min-width: 100px;
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
        right: 10px;
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
.close{position: absolute;top:0px;right: 0px;}
.savebtn {margin: 15px}
</style>
