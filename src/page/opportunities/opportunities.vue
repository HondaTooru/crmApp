<template>
 <div class="nobar oppes">
   <Content :tData="comData">
     <cell is-link slot="list" slot-scope="item">
       <div class="_nz" slot="title">{{item.o.title}}</div>
       <div slot="after-title" class="_nn">
         <div class="_ni">{{item.o.customer}}</div>
         <div class="_nx">&yen;{{item.o.expected_sales_amount}}</div>
       </div>
       <div class="right">{{item.o.status}}</div>
     </cell>
   </Content>
 </div>
</template>

<script>
import { Cell } from 'vux'
import Content from '@/page/common/content'
export default {
  name: 'listopportunity',
  data () {
    return {
      comData: {
        name: 'opportunity',
        alias: 'Opportunities'
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
.oppes {
  ._nz {font-size: 14px;color:#35495e}
  ._nn {font-size: 12px;color:#6b6b6b;
    &>div{
      display: inline-block;float:left;
      &._ni {
        position:relative;padding-right: 10px;margin-right: 10px;
        &:after{
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
        }
      }
    }

  }

}

</style>
