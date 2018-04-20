<template>
  <div id="app">
    <!-- <div v-transfer-dom>
       <loading v-model="isLoading"></loading>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { TransferDom, Loading } from 'vux'
import { mapState } from 'vuex'
export default {
  directive: {
    TransferDom
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@baseColor:#1cb0f1;
html,body,#app{height:100%;overflow-x:hidden;width: 100%}
body {background-color: #fbf9fe;}
</style>
