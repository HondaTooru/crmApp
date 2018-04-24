<template>
  <div class="clue" :style="{height: vh_}">
  <scroller v-if="listData.length" :height="vh_" lock-x scrollbar-y use-pullup use-pulldown :scrollbar-x="false" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" ref="clue" v-model="status">
      <group :gutter="0">
         <cell disabled is-link v-for="m in listData" :key="m.id">
           <div class="left" slot="title">
             <div class="tel">{{m.telphone}}</div>
             <div class="name">{{m.username}}</div>
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
 </div>
</template>

<script>
import { Scroller, Group, Cell, Spinner } from 'vux'
import { ERR_OK, USER_KEY, IndexApi } from '@/api/api'
export default {
  name: 'clue',
  data () {
    return {
      params: {
        customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id,
        uid: JSON.parse(localStorage.getItem(USER_KEY)).id,
        page: 1
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
      IndexApi(this.params).then(res => {
        if (flag) { this.listData = [] }
        if (ERR_OK === res.code) {
          this.listData = [...this.listData, ...res.data.tbody]
        } else {
          this.$refs.clue.disablePullup()
          this.$vux.toast.show({text: res.msg, position: 'bottom'})
        }
      })
    },
    refresh () {
      setTimeout(() => {
        this.params.page = 1
        this.list(true)
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.clue.donePulldown()
            this.pullupEnabled && this.$refs.clue.enablePullup()
          }, 10)
        })
      }, 1000)
    },
    loadMore () {
      setTimeout(() => {
        this.params.page ++
        this.list()
        this.$refs.clue.donePullup()
      }, 1000)
    }
  },
  components: {
    Scroller,
    Group,
    Cell,
    Spinner
  },
  computed: {
    vh_ () {
      return window.innerHeight - 46 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.clue {
  .left {
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
