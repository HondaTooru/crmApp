<template>
<div class="nobar listdata">
  <tab v-model="index" prevent-default @on-before-index-change="switchTabItem">
  <tab-item v-for="(m, i) in listTab" :key="i" v-text="m" :selected="i === 0"></tab-item>
</tab>
  <div :style="{height: vh_}" class="_mm">
  <scroller v-if="listData.length" :height="vh_" lock-x use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
      <group :gutter="0">
        <cell v-for="item in listData" :key="item.id" is-link :link="'/CustomerInfo/' + item.cid">
          <div slot="title"><i class="fa fa-user" aria-hidden="true"></i>{{item.username}}</div>
          <div slot="after-title" class="dsc">
            <span class="vux-1px-r"><i class="fa fa-phone" aria-hidden="true"></i>{{item.telphone}}</span>
            <span><i class="fa fa-clock-o" aria-hidden="true"></i>{{item.create_time}}</span></div>
          <div>{{item.status}}</div>
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
import { Scroller, Spinner, XDialog, Tab, TabItem } from 'vux'
import EmptyData from '@/page/common/emptydata'
import { ERR_OK, CustomerCommon, AllCommon } from '@/api/api'
// PlanRecord

export default {
  name: 'common',
  data () {
    return {
      index: 0,
      listTab: [],
      params: {
        page: 1,
        my_own: 0,
        cooper: 0,
        to_be_approved: 0,
        status: '',
        source: '',
        department: '',
        uzid: '',
        ucid: '',
        provance: '',
        city: '',
        area: '',
        common_name: '',
        customer_type: '',
        keyword: '',
        field: '',
        revisit_remind_at: '',
        cooperation: '',
        industry: '',
        create_time: '',
        user_id: '',
        size: ''
      },
      listData: [],
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      }
    }
  },
  created () {
    this.getCommon()
  },
  methods: {
    list (flag) {
      CustomerCommon(this.params).then(res => {
        if (flag) {
          this.listData = []
          if (this.$refs.scroll) this.$refs.scroll.reset({ top: 0 })
        }
        if (ERR_OK === res.code) {
          this.listData = [...this.listData, ...res.data.body]
          if (res.data.body.length < 15) {
            setTimeout(() => { if (this.$refs.scroll) this.$refs.scroll.disablePullup() }, 100)
            this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
          } else if (res.data.body.length >= 15) {
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
    switchTabItem (index) {
      this.params.common_name = this.listTab[index]
      this.index = index
      this.list(true)
    },
    getCommon () {
      AllCommon().then(res => {
        res.data.forEach(item => { this.listTab.push(item.name) })
        this.params.common_name = this.listTab[0]
        this.list()
      })
    }
  },
  components: {
    Scroller,
    Spinner,
    EmptyData,
    XDialog,
    Tab,
    TabItem
  },
  computed: {
    vh_ () {
      return window.innerHeight - 90 + 'px'
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
.close{position: absolute;top:0px;right: 0px;}
</style>
