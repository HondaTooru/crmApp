<template>
 <div class="mwork">
   <div class="title">
     <router-link to="/noticemore" class="more">更多</router-link>
     公告栏</div>
     <group :gutter="0">
       <cell v-for="(item, i) in List" :key="i" primary="content" value-align="left" v-if="List.length" is-link :link="'/noticeshow/' + item.id">
         <p slot="title"><i class="fa fa-volume-up" aria-hidden="true"></i>{{item.title}}</p>
         <p class="list-title" slot="after-title"><i class="fa fa-clock-o" aria-hidden="true"></i>{{item.create_time}}</p>
       </cell>
     </group>
 </div>
</template>

<script>
import { Badge } from 'vux'
import { Notice } from '@/api/api'

export default {
  name: 'mschedule',
  data () {
    return {
      List: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      Notice({page: 1, limit: 10}).then(res => {
        this.List = res.data.filter(item => item.is_top === 1)
      })
    }
  },
  components: {
    Badge
  }
}
</script>

<style lang="less" scoped>
.mwork {
  .fa {margin-right: 5px}
  .title {
    padding:0 15px;
    font-size: 16px;
    height: 35px;
    line-height: 40px;
    color: #1cb0f1;
    position: relative;
    .more {
      position: absolute;
      text-align: right;
      right:10px;
      color:#111
    }
  }
  .list-title {
    font-size: 12px;
    color:#666;
  }
  .list-dsc {
    span {
      padding-right: 5px
    }
  }
}
</style>
