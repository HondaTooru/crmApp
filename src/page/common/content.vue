<template>
<div class="listdata">
  <Search :type="tData.name" @changeList= "list_mm"></Search>
  <div :style="{height: vh_}" class="_mm">
  <scroller v-if="listData.length" :height="vh_" lock-x scrollbar-y use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="scroll" v-model="status">
      <group :gutter="0">
        <div v-for="m in listData" :key="m.id" class="_oo">
      <!-- 线索 -->
          <div v-if="$route.name === 'clue'">
            <cell is-link>
              <div class="left" slot="title">
                <div class="tel"><i class="fa fa-user" aria-hidden="true"></i>{{m.username}}</div>
                <div class="name"><i class="fa fa-phone" aria-hidden="true"></i>{{m.telphone}}</div>
              </div>
              <div class="right">{{m.status}}</div>
            </cell>
          </div>
     <!-- 合同 -->
         <div v-if="$route.name === 'contract'">
           <cell is-link>
             <div class="_nn" slot="title">
               <div class="_nb">{{list_state(m.be_approved)}}</div>
               <div class="_nk">{{m.title}}</div>
             </div>
             <div slot="after-title" class="_nn">
               <div class="_ni">&yen;{{m.amount_money}}</div>
               <div class="_na">{{m.customer}}</div>
             </div>
             <div class="right">{{m.status}}</div>
           </cell>
         </div>
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
import { ERR_OK, USER_KEY, IndexApi } from '@/api/api'
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
  },
  methods: {
    list (flag) {
      // number ? this.params.my_own = number : this.params.my_own = 0
      IndexApi(this.params, this.tData.alias).then(res => {
        if (flag) {
          this.listData = []
          if (this.$refs.scroll) this.$refs.scroll.reset({ top: 0 })
        }
        if (ERR_OK === res.code) {
          let _k = []
          res.data.tbody ? _k = res.data.tbody : _k = res.data.body
          this.listData = [...this.listData, ..._k]
          if (_k.length < 15) {
            this.$refs.scroll.disablePullup()
            this.$vux.toast.show({text: '没有更多数据~', position: 'bottom'})
          } else if (_k.length >= 15) {
            if (this.$refs.scroll) {
              this.$refs.scroll.enablePullup()
            }
          }
        } else {
          if (this.listData.length) this.$refs.scroll.disablePullup()
          this.$vux.toast.show({text: res.msg, position: 'bottom'})
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
    },
    list_state (item) {
      console.log(item)
      let str = [{key: '_ns', value: '待审核'}, {key: '_nt', value: '已通过'}, {key: '_nf', value: '已否决'}, {key: '_nc', value: '已撤销'}]
      if (item === 0) {
        return str[item]
      } else if (item === 1) {
        return str[item]
      } else if (item === 2) {
        return str[item]
      } else if (item === 3) {
        return str[item]
      }
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
  },
  mounted () {
    this.$vux.bus.$on('getTypeList', msg => {
      this.params.page = 1
      this.params.my_own = msg
      this.list(true)
    })
  },
  destroyed () {
    this.$vux.bus.$off('getTypeList')
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
  .left {
    .fa {margin-right: 5px}
    .tel {
      font-size: 16px;
      color:#35495e
    }
    .name {
      font-size: 14px;
      color:#6b6b6b
    }
  }
  .right {
    color:#e44e54
  }
  ._nn {
    overflow: hidden;
    &>div {
      display: inline-block;float:left;
      &._nb {background:#35495e;color:white;border-radius: 10px;padding: 2px 10px;margin-right: 10px;font-size:12px}
      &._ni {padding-right: 10px;position: relative;&:after{
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
      &._na {padding-left: 10px}
      &._nt {background:#a26767}
      &._ns {background:#9a9a9a}
      &._nc {background:#8c6396}
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
