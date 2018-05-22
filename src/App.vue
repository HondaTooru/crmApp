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
  name: 'App',
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading,
      gobalSett: state => state.vux.gobalSett
    })
  },
  data () {
    return {
      plus: null,
      message: ''
    }
  },
  created () {
    this.plusReady()
  },
  components: {
    Loading,
    MSett
  },
  methods: {
    plusReady () {
      let _that = this
      document.addEventListener('plusready', function () {
        let webview = plus.webview.currentWebview()
        let first = null
        plus.key.addEventListener('backbutton', function () { // 监听 Android 返回键
          webview.canBack(function (e) {
            if (e.canBack && _that.$route.path !== '/') {
              webview.back()
            } else {
              if (!first) {
                first = new Date().getTime()
                plus.nativeUI.toast('再按一次退出')
                setTimeout(() => { first = null }, 1000)
              } else {
                plus.runtime.quit()
              }
            }
          })
        })
        plus.push.addEventListener('click', msg => {
          alert('you clicked' + msg.content)
          console.log(msg)
          let getMsg = JSON.parse(msg.payload)
          console.log(getMsg)
        }, false)
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
html,body,#app{height:100%;overflow-x:hidden;width: 100%}
html {-webkit-text-size-adjust:100%}
body {font-family:-apple-system-font,Helvetica Neue,sans-serif}
</style>
