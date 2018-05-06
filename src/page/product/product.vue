<template>
 <div class="nobar">
   <Content :tData="comData">
     <cell is-link slot="list" slot-scope="item">
       <div class="_np" slot="title">{{item.o.title}}</div>
       <div slot="after-title" class="_nd">
         <div class="_ni">{{item.o.cate_id}}</div>
       </div>
       <div class="right">
         <div>价格：&yen;{{item.o.unit_price}}</div>
         <div>编号：{{item.o.product_code || '0000'}}</div>
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
        name: 'product',
        alias: 'Product'
      }
    }
  },
  components: {
    Content
  }
}
</script>

<style lang="less" scoped>
._np {color:#35495e;}
._nd {color:#6b6b6b;font-size: 12px}
.right {font-size: 12px}
</style>
