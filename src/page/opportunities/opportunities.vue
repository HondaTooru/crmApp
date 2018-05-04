<template>
 <div class="nobar">
   <Content :tData="comData">
     <cell is-link slot="list" slot-scope="item">
       <div class="_na" slot="title">
         <div class="_nz">{{item.o.title}}</div>
       </div>
       <div slot="after-title" class="_nn">
         <div class="_ni">{{item.o.customer}}</div>
         <div class="_na">&yen;{{item.o.expected_sales_amount}}</div>
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

<style lang="less">
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
</style>
