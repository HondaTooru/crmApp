<template>
 <div class="nobar">
   <Content :tData="comData">
     <cell is-link slot="list" slot-scope="item">
       <div class="_nk" slot="title"><i class="fa fa-briefcase" aria-hidden="true"></i>{{item.o.title}}
       </div>
       <div slot="after-title" class="_nn">
         <div class="_ni">已回款：&yen;{{item.o.back_money}}</div>
         <div class="_na">计划回款：{{item.o.amount_money}}</div>
       </div>
       <div class="right">{{item.o.status}}</div>
     </cell>
   </Content>
 </div>
</template>

<script>
import Content from '@/page/common/content'
export default {
  name: 'listpayment',
  data () {
    return {
      comData: {
        name: 'payment',
        alias: 'payment'
      }
    }
  },
  components: {
    Content
  }
}
</script>

<style lang="less">
._nn {
  overflow: hidden;
  font-size: 12px;
  color:#6b6b6b;
  &>div {
    display: inline-block;float:left;
    &._nb {background:#35495e;color:white;border-radius: 10px;padding: 2px 10px;margin-right: 10px;font-size:12px}
    &._ni {padding-right: 10px;margin-right: 10px;position: relative;&:after{
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
  }
}
</style>
