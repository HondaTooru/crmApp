<template>
 <div class="nobar clue">
   <Content :tData="comData">
       <cell is-link slot="list" slot-scope="item">
         <div class="cl" slot="title">
           <div class="tel"><i class="fa fa-user" aria-hidden="true"></i>{{item.o.username}}</div>
           <div class="name"><i class="fa fa-phone" aria-hidden="true"></i>{{item.o.telphone}}</div>
         </div>
         <div>{{item.o.status}}</div>
       </cell>
   </Content>
 </div>
</template>

<script>
import Content from '@/page/common/content'
import { Cell } from 'vux'
export default {
  name: 'listclue',
  data () {
    return {
      comData: {
        name: 'clue',
        alias: 'clue'
      }
    }
  },
  components: {
    Content,
    Cell
  }
}
</script>

<style lang="less" scoped>

  .cl {
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

</style>
