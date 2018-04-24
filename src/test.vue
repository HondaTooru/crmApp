<template>
   <div id="app">
     <div v-transfer-dom>
        <loading v-model="isLoading"></loading>
     </div>
     <div v-transfer-dom>
     <m-sett :sett="gobalSett"></m-sett>
   </div>
     <router-view></router-view>
   </div>
</template>

<script>
import { Loading } from 'vux'
import MSett from '@/page/home/msetting'
import { mapState } from 'vuex'
export default {
  name: 'login',
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading,
      gobalSett: state => state.vux.gobalSett
    })
  },
  components: {
    Loading,
    MSett
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@baseColor:#1cb0f1;
html,body,#app{height:100%;overflow-x:hidden;width: 100%}
html {-webkit-text-size-adjust:100%}
body {font-family:-apple-system-font,Helvetica Neue,sans-serif}
</style>
