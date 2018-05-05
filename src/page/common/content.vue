<template>
<div class="listdata">
  <Search :type="tData.name" @changeList= "list_mm"></Search>
  <div :style="{height: vh_}" class="_mm">
  <scroller v-if="listData.length" :height="vh_" lock-x scrollbar-y use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
      <group :gutter="0">
        <div v-for="m in listData" :key="m.id" class="_oo">
          <slot :o="m" name="list"></slot>
        </div>
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
 </div>
</div>
</template>

<script>
import { Scroller, Group, Cell, Spinner } from 'vux'
import Search from '@/page/common/search'
import { ERR_OK, USER_KEY, IndexApi, ContractListApi } from '@/api/api'
export default {
  name: 'listdata',
  props: {
    tData: Object
  },
  data () {
    return {
      params: {
        customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id,
        uid: JSON.parse(localStorage.getItem(USER_KEY)).id,
        page: 1,
        my_own: 0
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
    this.$vux.bus.$on('getTypeList', msg => {
      this.params.page = 1
      this.params.my_own = msg
      this.list(true)
    })
  },
  methods: {
    list (flag) {
      let RequestName = IndexApi
      if (this.$route.name === 'contract_list') RequestName = ContractListApi
      RequestName(this.params, this.tData.alias).then(res => {
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
          if (this.listData.length) this.$refs.scroll.disablePullup()
          this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
        }
      })
    },
    refresh () {
      setTimeout(() => {
        this.params.page = 1
        this.list(true, this.setown)
        if (this.listData.length) this.$refs.scroll.reset({top: 0})
      }, 1000)
    },
    loadMore () {
      setTimeout(() => {
        this.params.page ++
        this.list(false, this.setown)
        this.$refs.scroll.donePullup()
      }, 1000)
    },
    list_mm (o) {
      this.params.page = 1
      this.params = Object.assign(this.params, o)
      this.list(true)
    }
  },
  components: {
    Scroller,
    Group,
    Cell,
    Spinner,
    Search
  },
  computed: {
    vh_ () {
      return window.innerHeight - 84 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.listdata {
  ._mm {position: relative; top:-2px;
    ._oo{position: relative;
      &::after {
        content: " ";
    position: absolute;
    left: 15px;
    top: 0;
    right: 0;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
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
