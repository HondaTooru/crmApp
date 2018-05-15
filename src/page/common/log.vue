<template>
  <div class="nobar">
    <div :style="{height: vh_}" class="_mm">
    <scroller v-if="listData.length" :height="vh_" lock-x use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
        <group :gutter="0" v-if="listData.length">
          <!-- <div v-for="m in listData" :key="m.id" class="_oo">
            <slot :o="m" name="list"></slot>
          </div> -->
          <cell v-for="m in listData" :key="m.id">
            <div slot="title"><i class="fa fa-user" aria-hidden="true"></i>{{m.uid}}</div>
            <div slot="after-title" class="content">{{m.remark}}</div>
            <!-- <div slot="inline-desc">{{m.log_type}}</div> -->
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
import { ERR_OK, GetLog } from '@/api/api'
import EmptyData from '@/page/common/emptydata'
import { Scroller, Spinner } from 'vux'

export default {
  name: 'log',
  data () {
    return {
      listData: [],
      params: {
        row_id: this.$route.params.id,
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
  },
  methods: {
    list (flag) {
      if (flag) {
        this.listData = []
        if (this.$refs.scroll) this.$refs.scroll.reset({ top: 0 })
      }
      GetLog(this.params, this.$route.params.name).then(res => {
        if (ERR_OK === res.code) {
          this.listData = [...this.listData, ...res.data]
          console.log(res)
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
