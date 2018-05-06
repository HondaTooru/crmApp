<template>
 <div class="nobar">
   <Content :tData="comData">
     <cell is-link slot="list" slot-scope="item">
       <div class="_nn" slot="title">
         <div class="_nb" v-if="item.o.be_approved === 0" v-text="'待审核'"></div>
         <div class="_nb _nt" v-else-if="item.o.be_approved === 1" v-text="'已通过'"></div>
         <div class="_nb _nf" v-else-if="item.o.be_approved === 2" v-text="'已否决'"></div>
         <div class="_nb _nc" v-else v-text="'已撤销'"></div>
         <div class="_nk">{{item.o.username}}</div>
       </div>
       <div class="right">{{item.o.status}}</div>
     </cell>
   </Content>
 </div>
</template>

<script>
import Content from '@/page/common/content'
export default {
  name: 'listcustomer',
  data () {
    return {
      comData: {
        name: 'customer',
        alias: 'Customer'
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
