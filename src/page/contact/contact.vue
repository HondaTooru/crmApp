<template>
 <div class="nobar contact">
   <Content :tData="comData">
     <cell is-link slot="list" slot-scope="item" :link="'/contactinfo/' + item.o.id">
       <div class="_no" slot="title"><i class="fa fa-user" aria-hidden="true"></i>{{item.o.username}}</div>
       <div slot="after-title" class="_nq">
         <div class="_ni"><i class="fa fa-phone" aria-hidden="true"></i>{{item.o.telphone}}</div>
       </div>
       <div>
         {{item.o.customer}}
       </div>
     </cell>
   </Content>
 </div>
</template>

<script>
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
    Content
  }
}
</script>

<style lang="less">
.contact {
  ._ni {font-size: 12px;color:#6b6b6b}
}
</style>
