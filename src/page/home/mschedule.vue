<template>
 <div class="mwork">
   <div class="title">
     <router-link :to="{ name: '', params: {} }" class="more">更多</router-link>
     日程</div>
     <group label-width="5em" :gutter="0">
       <cell v-for="(item, i) in List" :key="i" primary="content" :title="item.date" value-align="left">
         <p class="list-title">{{item.title}}</p>
         <p class="list-dsc"><span>[{{item.tag}}]</span>{{item.dsc}}</p>
       </cell>
     </group>
 </div>
</template>

<script>
import { Cell, Group, Badge } from 'vux'
export default {
  name: 'mschedule',
  data () {
    return {
      List: [
        { date: '20:00', title: '今天有回款计划', dsc: '红尘的名字叫寂寥', tag: '合同' },
        { date: '19:10', title: '今天有回款计划', dsc: '红尘的名字叫寂寥', tag: '合同' },
        { date: '18:10', title: '今天有回款计划', dsc: '红尘的名字叫寂寥', tag: '合同' },
        { date: '17:10', title: '今天有回款计划', dsc: '红尘的名字叫寂寥', tag: '合同' }
      ]
    }
  },
  components: {
    Cell,
    Group,
    Badge
  }
}
</script>

<style lang="less" scoped>
.mwork {
  .title {
    padding:0 15px;
    font-size: 14px;
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
    font-size: 16px;
    color:#111
  }
  .list-dsc {
    span {
      padding-right: 5px
    }
  }
}
</style>
