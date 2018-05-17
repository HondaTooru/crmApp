<template>
<div class="nobar listdata">
  <div v-transfer-dom>
    <x-dialog v-model="show" hide-on-blur>
      <x-icon type="ios-close-outline" style="fill:#35495e;" class="close" size="32" @click.native="show = !show"></x-icon>
      <group :gutter="0" title="其他信息" style="text-align:left" label-width="7em">
        <cell title="回款期次" :value="item.qishu"></cell>
        <cell title="计划回款金额" :value="item.plan_back_money"></cell>
        <cell title="已回款金额" :value="item.back_money"></cell>
        <cell title="未回款金额" :value="item.not_back_money"></cell>
        <cell title="逾期天数" :value="item.overdue"></cell>
        <cell title="合同负责人" :value="item.user_id"></cell>
        <cell title="计划回款占比" :value="item.plan_back_rate"></cell>
        <cell title="逾期备注" :value="item.remark"></cell>
      </group>
    </x-dialog>
  </div>
  <div :style="{height: vh_}" class="_mm">
  <scroller v-if="listData.length" :height="vh_" lock-x use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
      <group :gutter="0">
        <cell v-for="item in listData" :key="item.id" @click.native="showMore(item)" is-link>
          <div slot="title"><i class="fa fa-user" aria-hidden="true"></i>{{item.customer}}</div>
          <div slot="after-title" class="dsc">
            <span class="vux-1px-r">&yen;{{item.amount_money}}</span>
            <span><i class="fa fa-clock-o" aria-hidden="true"></i>{{item.plan_back_date}}</span></div>
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
import { Scroller, Spinner, XDialog } from 'vux'
import EmptyData from '@/page/common/emptydata'
import { ERR_OK, PaymentIndex } from '@/api/api'
// PlanRecord

export default {
  name: 'listpayment',
  data () {
    return {
      params: {
        page: 1,
        field: 'title',
        keyword: JSON.parse(localStorage.getItem('DETAIL_INFO')).detail.body.title
      },
      listData: [],
      pullupEnabled: true,
      status: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      show: false,
      item: {}
    }
  },
  created () {
    this.list()
  },
  methods: {
    list (flag) {
      PaymentIndex(this.params).then(res => {
        if (flag) {
          this.listData = []
          if (this.$refs.scroll) this.$refs.scroll.reset({ top: 0 })
        }
        if (ERR_OK === res.code) {
          let _k = []
          res.data.tbody ? _k = res.data.tbody : _k = res.data.body
          this.listData = [...this.listData, ..._k]
          if (_k.length < 15) {
            setTimeout(() => { if (this.$refs.scroll) this.$refs.scroll.disablePullup() }, 100)
            this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
          } else if (_k.length >= 15) {
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
        this.list(true, this.setown)
        if (this.$refs.scroll) this.$refs.scroll.reset({top: 0})
      }, 1000)
    },
    loadMore () {
      setTimeout(() => {
        this.params.page ++
        this.list(false, this.setown)
        if (this.$refs.scroll) this.$refs.scroll.donePullup()
      }, 1000)
    },
    showMore (item) {
      this.show = !this.show
      this.item = item
    }
  },
  components: {
    Scroller,
    Spinner,
    EmptyData,
    XDialog
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
