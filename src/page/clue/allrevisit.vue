<template>
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
import EmptyData from '@/page/common/emptyData'
import { DelVisit, DelComment, SaveComment, RevisitApi, ERR_OK } from '@/api/api'

export default {
  name: 'allrevisit',
  data () {
    return {
      visitId: {visit_id: '', content: ''},
      showComments: false,
      list: JSON.parse(localStorage.getItem('REVISIT_ALL'))
    }
  },
  methods: {
    delvisit (item) {
      DelVisit({visit_id: item.id}).then(res => {
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
      RevisitApi({row_id: this.$route.params.id, record_type: 'lead'}).then(res => {
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
        if (ERR_OK === res.code) {
          this.getList()
          this.showComments = false
          this.$vux.toast.show({
            text: res.msg,
            type: 'success'
          })
        } else {
          this.$vux.toast.show({ text: res.msg, width: '15em' })
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
</style>
