<template>
 <div class="nobar">
   <Content :tData="comData">
     <cell is-link slot="list" slot-scope="item">
       <div class="_no" slot="title"><i class="fa fa-user" aria-hidden="true"></i>{{item.o.username}}</div>
       <div slot="after-title" class="_nq">
         <div class="_ni">{{item.o.customer}}</div>
       </div>
       <div class="right">
       </div>
     </cell>
   </Content>
 </div>
</template>

<script>
import { Cell } from 'vux'
import Content from '@/page/common/content'
export default {
  name: 'listproduct',
  data () {
    return {
      comData: {
        name: 'contact',
        alias: 'Contact'
      }
    }
  },
  components: {
    Content,
    Cell
  }
}
</script>

<style lang="less">

</style>
