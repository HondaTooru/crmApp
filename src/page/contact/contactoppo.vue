<template>
<div class="listdata nobar">
  <div :style="{height: vh_}" class="_mm">
  <scroller v-if="listData.length" :height="vh_" lock-x use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
      <group :gutter="0">
        <cell v-for="m in listData" :key="m.id" :link="'/opportunitiesinfo/'+ m.id">
          <div class="_nz" slot="title"><i class="fa fa-briefcase" aria-hidden="true"></i>{{m.title}}</div>
          <div slot="after-title" class="_nn">
            <div class="_ni">{{m.customer}}</div>
            <div class="_nx">&yen;{{m.expected_sales_amount}}</div>
          </div>
          <div class="right">{{m.status}}</div>
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
import { Scroller, Spinner, CellFormPreview } from 'vux'
import Search from '@/page/common/search'
import EmptyData from '@/page/common/emptydata'
import { ERR_OK, ContactOppo } from '@/api/api'
// PlanRecord

export default {
  name: 'contactabout',
  data () {
    return {
      params: {
        page: 1,
        row_id: this.$route.params.id
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
    this.list()
  },
  beforeDestroy () {
  },
  methods: {
    list (flag) {
      ContactOppo(this.params).then(res => {
        if (flag) {
          this.listData = []
          if (this.$refs.scroll) this.$refs.scroll.reset({ top: 0 })
        }
        if (ERR_OK === res.code) {
          this.listData = [...this.listData, ...res.data.body]
          if (res.data.body.length <= 15) {
            setTimeout(() => { if (this.$refs.scroll) this.$refs.scroll.disablePullup() }, 100)
            this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
          }
          // else if (res.data.body.length >= 15) {
          //   if (this.$refs.scroll) {
          //     this.$refs.scroll.enablePullup()
          //   }
          // }
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
        this.list()
        if (this.$refs.scroll) this.$refs.scroll.donePullup()
      }, 1000)
    }
  },
  components: {
    Scroller,
    Spinner,
    Search,
    EmptyData,
    CellFormPreview
  },
  computed: {
    vh_ () {
      return window.innerHeight - 46 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.listdata {
  ._mm {position: relative; top:-2px;
      ._nz {font-size: 14px;color:#35495e}
      ._nn {font-size: 12px;color:#6b6b6b;
        &>div{
          display: inline-block;float:left;
          &._ni {
            position:relative;padding-right: 10px;margin-right: 10px;
            &:after{
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
            }
          }
      }
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
</style>
