<!-- <template>
<div class="nobar">
  <group :gutter="0" class="revisitlist" v-if="list.length">
    <cell v-for="item in list" :key="item.id" :border-intent="false" align-items="flex-start">
    <img slot="icon" class="avatar" :src="item.avatar">
    <div slot="title">
    <span class="rdate"> <i class="fa fa-clock-o" aria-hidden="true"></i>{{item.revisit_time}}<i class="fa fa-trash-o" aria-hidden="true" v-if="item.is_own" @click="delvisit(item)"></i></span>  <i class="fa fa-user" aria-hidden="true"></i> {{item.username}} <i class="fa fa-angle-right right_arrow" aria-hidden="true"></i> {{item.revisit_way}}
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
  <empty-data v-if="!list.length"></empty-data>
  <div v-transfer-dom>
    <x-dialog v-model="showComments">
      <x-icon type="ios-close-outline" style="fill:#35495e;" class="close" size="32" @click.native="showComments = !showComments"></x-icon>
      <group :gutter="0" title="评论内容">
        <x-textarea ref="msg" :max="50" placeholder="评论内容" v-model="visitId.content" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
      </group>
      <div class="savebtn">
      <x-button type="warn" @click.native="saveComments" :disabled="isClick">提交</x-button>
      </div>
    </x-dialog>
  </div>
</div>
</template>

<script>
import { XDialog, XTextarea, XButton } from 'vux'
import EmptyData from '@/page/common/emptydata'
import { DelVisit, DelComment, SaveComment, RevisitApi, ERR_OK } from '@/api/api'

export default {
  name: 'allrevisit',
  data () {
    return {
      visitId: {visit_id: '', content: ''},
      showComments: false,
      list: JSON.parse(localStorage.getItem('REVISIT_ALL')) || []
    }
  },
  methods: {
    delvisit (item) {
      DelVisit({visit_id: item.id}).then(res => {
        this.flag = !this.flag
        this.list.splice(this.list.indexOf(item), 1)
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
    onEvent (event) {
      console.log('on', event)
    },
    getList () {
      RevisitApi({row_id: this.$route.params.id, record_type: this.$route.params.type}).then(res => {
        if (ERR_OK === res.code) {
          this.list = res.data
          localStorage.setItem('REVISIT_ALL', JSON.stringify(res.data))
        } else {
          this.$vux.toast.show({ text: res.msg })
        }
      })
    },
    saveComments () {
      SaveComment(this.visitId).then(res => {
        this.showComments = false
        if (ERR_OK === res.code) {
          this.getList()
          this.$vux.toast.show({
            text: res.msg,
            type: 'success'
          })
        } else {
          this.$vux.toast.show({ text: res.msg, width: '15em', position: 'bottom' })
        }
      })
    }
  },
  components: {
    XDialog,
    XTextarea,
    XButton,
    EmptyData
  },
  computed: {
    isClick () {
      return !this.visitId.content
    }
  }
}
</script>

<style lang="less" scoped>
@borderColor: #65707b;
.revisitlist {
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 7px 5px 0 0;
    overflow: hidden;
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
.savebtn {margin: 15px}
.close{position: absolute;top:0px;right: 0px;}
</style> -->
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
  <div :style="{height: vh_}" class="_mm">
  <scroller v-if="listData.length" :height="vh_" lock-x use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
    <group :gutter="0" class="revisitlist" v-if="list.length">
      <cell v-for="item in listData" :key="item.id" :border-intent="false" align-items="flex-start">
      <img slot="icon" class="avatar" :src="item.avatar">
      <div slot="title">
      <span class="rdate"> <i class="fa fa-clock-o" aria-hidden="true"></i>{{item.revisit_time}}<i class="fa fa-trash-o" aria-hidden="true" v-if="item.is_own" @click="delvisit(item)"></i></span>  <i class="fa fa-user" aria-hidden="true"></i> {{item.username}} <i class="fa fa-angle-right right_arrow" aria-hidden="true"></i> {{item.revisit_way}}
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
import { Scroller, Spinner, XDialog, XTextarea, XButton } from 'vux'
import EmptyData from '@/page/common/emptydata'
import { ERR_OK, RevisitApi, DelVisit, DelComment, SaveComment } from '@/api/api'
// PlanRecord

export default {
  name: 'allrevisit',
  data () {
    return {
      showComments: false,
      params: {
        row_id: this.$route.params.id,
        record_type: this.$route.params.type
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
        this.list.splice(this.list.indexOf(item), 1)
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
    }
  },
  components: {
    Scroller,
    Spinner,
    EmptyData,
    XDialog,
    XTextarea,
    XButton
  },
  computed: {
    vh_ () {
      return window.innerHeight - 46 + 'px'
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
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 7px 5px 0 0;
    overflow: hidden;
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
.close{position: absolute;top:0px;right: 0px;}
.savebtn {margin: 15px}
</style>
