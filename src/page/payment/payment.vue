<template>
  <div class="nobar">
    <div class="search vux-1px-b">
      <div class="content">
        <div class="left" @click="cShow = true">
          <span>类型</span>
        </div>
        <div class="right">
          <form action="" class="input-kw-form" @submit.prevent="searchWord">
          <input class="keyword" type="search" autocomplete="off" v-model="params.keyword" placeholder="请输入关键词">
        </form>
        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="cShow" max-height="50%">
        <group :gutter="0">
          <radio :options="listItem" v-model="params.field" @on-change="change"></radio>
        </group>
      </popup>
    </div>
    <div :style="{height: vh_}" class="_mm">
    <scroller v-if="listData.length" :height="vh_" lock-x use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
        <group :gutter="0" v-if="listData.length" class="lisgroup">
          <cell v-for="item in listData" :key="item.id" :link="'/pinfos/' + item.id" is-link>
            <div slot="title"><i class="fa fa-user" aria-hidden="true"></i>{{item.customer}}</div>
            <div slot="after-title" class="after">
              <div class="_ni"><i class="fa fa-briefcase" aria-hidden="true"></i>{{item.title}}</div>
              <div class="_na">&yen;{{item.amount_money}}</div>
            </div>
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
import { ERR_OK, PaymentIndex, PlanField } from '@/api/api'
import EmptyData from '@/page/common/emptydata'
import { Scroller, Spinner, Popup, Radio } from 'vux'

export default {
  name: 'payment',
  data () {
    return {
      listData: [],
      params: {
        page: 1,
        be_approved: 0,
        keyword: '',
        field: ''
      },
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      cShow: false,
      listItem: []
    }
  },
  components: {
    Scroller,
    Spinner,
    EmptyData,
    Popup,
    Radio
  },
  created () {
    this.list()
    this.getField()
    this.$vux.bus.$on('getTypeList', msg => {
      this.list(true, msg)
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('getTypeList')
  },
  methods: {
    list (flag, value) {
      let indexApi = ''
      if (typeof value === 'undefined') value = ''
      value ? indexApi = value.name : indexApi = PaymentIndex
      if (flag) {
        this.listData = []
        if (this.$refs.scroll) this.$refs.scroll.reset({ top: 0 })
      }
      indexApi(this.params).then(res => {
        if (ERR_OK === res.code) {
          this.listData = [...this.listData, ...res.data.body]
          if (res.data.body.length < 15) {
            setTimeout(() => { if (this.$refs.scroll) this.$refs.scroll.disablePullup() }, 100)
            this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
          } else if (res.data.body.length >= 15) {
            if (this.$refs.scroll) this.$refs.scroll.enablePullup()
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
    },
    searchWord () {},
    change (value, label) {
      this.value = value
      this.cShow = false
    },
    getField () {
      PlanField().then(res => {
        res.data.forEach(item => { this.listItem.push({value: item.showname, key: item.name}) })
        this.params.field = res.data[0].name
      })
    }
  },
  computed: {
    vh_ () {
      return window.innerHeight - 86 + 'px'
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
.lisgroup {
  position: relative;
  top: -2px;
  .after{
    &>div{
      display: inline-block;float:left;font-size:12px;color:#6b6b6b;
      &._ni {padding-right: 10px;position: relative;max-width: 60%;&:after{
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 1px;
        bottom: 0;
        border-right: 1px solid #C7C7C7;
        color: #C7C7C7;
        transform-origin: 100% 0;
        transform: scale(0.5, 0.8) translateY(-50%);
      }}
      &._na {padding-left: 10px;max-width: 30%}
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
