<template>
 <div class="nobar clue">
   <Content :tData="comData">
       <cell is-link slot="list" slot-scope="item" :link="'listinfo/' + item.o.id">
         <div class="cl" slot="title">
           <div class="tel"><i class="fa fa-shopping-bag" aria-hidden="true"></i>{{item.o.contract}}</div>
           <div class="name"><i class="fa fa-user" aria-hidden="true"></i>{{item.o.saler}}</div>
         </div>
         <div>{{item.o.create_time}}</div>
       </cell>
   </Content>
 </div>
</template>

<script>
import Content from '@/page/common/content'
export default {
  name: 'ListContractlist',
  data () {
    return {
      comData: {
        name: 'contractList',
        alias: 'ContractList'
      }
    }
  },
  components: {
    Content
  }
}
</script>

<style lang="less" scoped>

  .cl {
    .fa {margin-right: 5px}
    .tel {
      font-size: 14px;
      color:#35495e
    }
    .name {
      font-size: 12px;
      color:#6b6b6b
    }
  }

</style>
