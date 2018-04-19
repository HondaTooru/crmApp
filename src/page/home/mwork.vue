<template>
 <div class="mwork">
   <div class="title">今天的工作</div>
   <group :gutter="0">
   <cell v-for="(item, i) in workList" :key="i" :title="item.title">
     <badge :text="item.tag" v-if="item.tag"></badge>
   </cell>
 </group>
 </div>
</template>

<script>
import { Cell, Group, Badge } from 'vux'
export default {
  name: 'mwork',
  data () {
    return {
      workList: [
        { title: '销售助手', tag: 6 },
        { title: '销售圈消息', tag: 0 },
        { title: '未读通知', tag: 0 },
        { title: '待审批的事项', tag: 1 }
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
    padding-left: 15px;
    font-size: 14px;
    height: 35px;
    line-height: 40px;
    color: #1cb0f1
  }
  .list {
    font-size: 12px
  }
}
</style>
