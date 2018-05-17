<template>
  <div class="nobar">
    <div :style="{height: vh_}" class="_mm">
    <scroller v-if="listData.length" :height="vh_" lock-x use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
        <group :gutter="0" v-if="listData.length">
          <cell v-for="m in listData" :key="m.id" @click.native="isRead(m)">
            <div slot="title"><i class="fa" :class="{'fa-envelope': !m.is_read, 'fa-envelope-o': m.is_read}" aria-hidden="true"></i>[{{m.showname}}]{{m.msg}}</div>
            <div slot="after-title" class="content">{{m.remark}}</div>
            <div slot="inline-desc" class="date"><i class="fa fa-clock-o" aria-hidden="true"></i>{{m.create_time}}</div>
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
import { ERR_OK, Notifications, DelAllNotifications, NotificationsRead } from '@/api/api'
import EmptyData from '@/page/common/emptydata'
import { Scroller, Spinner } from 'vux'

export default {
  name: 'notifications',
  data () {
    return {
      listData: [],
      params: {
        page: 1
      },
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  components: {
    Scroller,
    Spinner,
    EmptyData
  },
  created () {
    this.list()
    this.$vux.bus.$on('DelInfo', () => {
      this.delAll()
    })
  },
  beforeDestroy () { this.$vux.bus.$off('DelInfo') },
  methods: {
    list (flag) {
      if (flag) {
        this.listData = []
        if (this.$refs.scroll) this.$refs.scroll.reset({ top: 0 })
      }
      Notifications(this.params, this.$route.params.name).then(res => {
        if (ERR_OK === res.code) {
          this.listData = [...this.listData, ...res.data]
          if (res.data.length < 15) {
            setTimeout(() => { if (this.$refs.scroll) this.$refs.scroll.disablePullup() }, 100)
            this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
          } else if (res.data.length >= 15) {
            if (this.$refs.scroll) {
              this.$refs.scroll.enablePullup()
            }
          }
        } else {
          if (this.$refs.scroll) this.$refs.scroll.disablePullup()
          this.$vux.toast.show({ text: res.msg })
        }
      })
    },
    isRead (item) {
      NotificationsRead({row_id: item.id}).then(res => {
        if (item.msg_type === 'customer') {
          if (item.row_data.be_approved === 1) { this.$router.push('/CustomerInfo/' + item.row_id) } else {
            this.$router.push('customeraudited/' + item.row_id)
          }
        }
        if (item.msg_type === 'clue') { this.$router.push('clueinfo/' + item.row_id) }
        if (item.msg_type === 'contract') {
          if (item.row_data.be_approved === 1) { this.$router.push('/contractinfo/' + item.row_id) } else {
            this.$router.push('contractaudited/' + item.row_id)
          }
        }
        if (item.msg_type === 'opportunity') { this.$router.push('/opportunitiesedit/' + item.row_id) }
      })
    },
    delAll () {
      let _that = this
      if (!this.listData.length) {
        this.$vux.alert.show({
          content: '您还没有通知消息~'
        })
        setTimeout(() => { this.$vux.alert.hide() }, 2000)
        return
      }
      this.$vux.confirm.show({
        content: '您确认删除所有通知消息吗~',
        onConfirm () {
          DelAllNotifications().then(res => {
            if (ERR_OK === res.code) {
              _that.listData = []
              _that.$vux.toast.show({ text: res.msg })
            } else { _that.$vux.toast.show({ text: res.msg }) }
          })
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
    }
  },
  computed: {
    vh_ () {
      return window.innerHeight - 46 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
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
.content, .date {font-size: 12px;color:#666}
</style>
