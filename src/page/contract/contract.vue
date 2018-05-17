<template>
 <div class="nobar contract">
   <Content :tData="comData">
     <cell is-link slot="list" slot-scope="item" :link="linkTo(item.o.be_approved, item.o.id)">
       <div class="_nn" slot="title">
         <div class="_nb" v-if="item.o.be_approved === 0" v-text="'待审核'"></div>
         <div class="_nb _nt" v-else-if="item.o.be_approved === 1" v-text="'已通过'"></div>
         <div class="_nb _nf" v-else-if="item.o.be_approved === 2" v-text="'已否决'"></div>
         <div class="_nb _nc" v-else v-text="'已撤销'"></div>
         <div class="_nk">{{item.o.title}}</div>
       </div>
       <div slot="after-title" class="_nn vn">
         <div class="_ni">{{item.o.customer}}</div>
         <div class="_na">&yen;{{item.o.amount_money}}</div>
       </div>
       <div class="right">{{item.o.pi_status}}</div>
     </cell>
   </Content>
 </div>
</template>

<script>
import Content from '@/page/common/content'
export default {
  name: 'listcontract',
  data () {
    return {
      comData: {
        name: 'contract',
        alias: 'Contract'
      }
    }
  },
  methods: {
    linkTo (type, ids) {
      if (type === 1) { return 'contractinfo/' + ids } else { return 'contractaudited/' + ids }
    }
  },
  components: {
    Content
  }
}
</script>

<style lang="less" scoped>
.contract {
  ._nn {
    overflow: hidden;
    font-size: 14px;
    &.vn {font-size: 12px;color:#6b6b6b}
    &>div {
      display: inline-block;float:left;
      &._nb {background:#35495e;color:white;border-radius: 10px;padding: 2px 10px;margin-right: 10px;font-size:12px}
      &._ni {padding-right: 10px;position: relative;max-width: 60%;&:after{
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
      &._na {padding-left: 10px;max-width: 30%}
      &._nf {background:#c3c3c3}
      &._nt {background:#da7f7f}
      &._ns {background:#9a9a9a}
      &._nc {background:#8c6396}
    }
  }
}

</style>
