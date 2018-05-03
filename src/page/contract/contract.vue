<template>
 <div class="nobar">
   <Content :tData="comData"></Content>
 </div>
</template>

<script>
import Content from '@/page/common/content'
export default {
  name: 'listclue',
  data () {
    return {
      comData: {
        name: 'contract',
        alias: 'Contract'
      }
    }
  },
  components: {
    Content
  }
}
</script>

<style lang="less">
</style>
