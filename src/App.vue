<template>
  <div id="app">
    <div v-transfer-dom>
       <loading v-model="isLoading"></loading>
    </div>
    <m-sett :sett='config'></m-sett>
    <div class="home">
      <drawer
      width="200px"
      show-mode="overlay"
      placement="left"
      :show.sync="drawerVisibility"
      :drawer-style="{'background-color':'#35495e', width: '200px'}"
      >
      <div slot="drawer" class="left-panel">
        <view-box>
          <div>
            <div class="avatar">
              <img src="./assets/avatar.jpg" alt="">
            </div>
            <div class="info">
              <p class="name">
                <span>叶倾城</span><span>高级主管</span>
              </p>
              <p class="complany">天河科技</p>
            </div>
            <ul class="list">
              <router-link :to="{ name: '', params: {} }" tag="li"><i class="fa fa-bell" aria-hidden="true"></i>通知中心</router-link>
              <router-link :to="{ name: '', params: {} }" tag="li"><i class="fa fa-th-large" aria-hidden="true"></i>应用管理</router-link>
              <router-link :to="{ name: '', params: {} }" tag="li"><i class="fa fa-volume-up" aria-hidden="true"></i>公告</router-link>
              <router-link :to="{ name: '', params: {} }" tag="li"><i class="fa fa-address-book-o" aria-hidden="true"></i>公司通讯录</router-link>
              <router-link :to="{ name: '', params: {} }" tag="li"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>常见问题</router-link>
              <router-link :to="{ name: '', params: {} }" tag="li"><i class="fa fa-user-circle-o" aria-hidden="true"></i>关于我们</router-link>
              <router-link :to="{ name: '', params: {} }" tag="li"><i class="fa fa-cog" aria-hidden="true"></i>设置</router-link>
            </ul>
          </div>
        </view-box>
      </div>
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px" class="homebg" :class="{whitebg: route.path === '/'}">
        <x-header slot="header" class="header"
        :title="title"
        :transition="headerTransition"
        :left-options="{showBack: false}"
        >
          <figure slot="overwrite-left" @click="drawerVisibility = !drawerVisibility" v-if="route.path == '/' && config == false">
            <img src="./assets/avatar.jpg">
          </figure>
          <div slot="right" class="set">
            <span v-if="route.path == '/mywork' && config == false">设置</span><span v-if="config == true">设置</span>
          </div>
        </x-header>
        <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition" :css="!!direction">
        <router-view class="router-view"></router-view>
      </transition>
        <tabbar class="vux-tabbar" icon-class="vux-center" slot="bottom">
          <tabbar-item link="/">
            <img slot="icon" src="./assets/home.svg">
            <img slot="icon-active" src="./assets/home_active.svg">
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item @on-item-click="btnCon">
            <div class="circle" slot="icon">
            <img src="./assets/more.svg">
          </div>
          </tabbar-item>
          <tabbar-item badge="9" link="/mywork">
            <img slot="icon" src="./assets/work.svg">
            <img slot="icon-active" src="./assets/work_active.svg">
            <span slot="label">工作</span>
          </tabbar-item>
       </tabbar>
      </view-box>
    </drawer>
  </div>
</div>
</template>

<script>
import { TransferDom, Loading, XHeader, Drawer, ViewBox, Tabbar, TabbarItem } from 'vux'
import { mapState, mapActions } from 'vuex'
import MSett from '@/page/home/msetting'
export default {
  data () {
    return {
      drawerVisibility: false,
      config: false
    }
  },
  directive: {
    TransferDom
  },
  mounted () {
    console.log(this.name)
    this.handler = () => {
      if (this.path === '/demo') {
        this.box = document.querySelector('#demo_list_box')
        this.updateDemoPosition(this.box.scrollTop)
      }
    }
  },
  components: {
    Loading,
    XHeader,
    Drawer,
    ViewBox,
    Tabbar,
    TabbarItem,
    MSett
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.vux.isLoading,
      direction: state => state.vux.direction
    }),
    isShowBar () {
      if (/component/.test(this.path)) {
        return true
      }
      return false
    },
    leftOptions () {
      return {
        showBack: this.route.path !== '/'
      }
    },
    rightOptions () {
      return {
        showMore: true
      }
    },
    headerTransition () {
      if (!this.direction) return ''
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    componentName () {
      if (this.route.path) {
        const parts = this.route.path.split('/')
        if (parts[1]) return parts[1]
      }
    },
    isDemo () {
      return /component|demo/.test(this.route.path)
    },
    isTabbarDemo () {
      return /tabbar/.test(this.route.path)
    },
    title: {
      get () {
        if (this.route.path === '/') return '首页'
        if (this.route.path === '/mywork') return '工作'
        return this.componentName ? `Demo/${this.componentName}` : 'Demo/~~'
      },
      set (val) {
        return val
      }
    },
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    }
  },
  methods: {
    btnCon () {
      this.config = true
      this.title = '快捷功能'
    },
    onShowModeChange (val) {
  /** hide drawer before changing showMode **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showModeValue = val
      }, 400)
    },
    onPlacementChange (val) {
      /** hide drawer before changing position **/
      this.drawerVisibility = false
      setTimeout(one => {
        this.showPlacementValue = val
      }, 400)
    },
    onClickMore () {
      this.showMenu = true
    },
    ...mapActions([
      'updateDemoPosition'
    ])
  }
  // ,
  // watch: {
  //   path (path) {
  //     if (path === '/component/demo') {
  //       this.$router.replace('/demo')
  //       return
  //     }
  //     if (path === '/demo') {
  //       setTimeout(() => {
  //         this.box = document.querySelector('#demo_list_box')
  //         if (this.box) {
  //           this.box.removeEventListener('scroll', this.handler, false)
  //           this.box.addEventListener('scroll', this.handler, false)
  //         }
  //       }, 1000)
  //     } else {
  //       this.box && this.box.removeEventListener('scroll', this.handler, false)
  //     }
  //   }
  // }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@baseColor:#1cb0f1;
html,body,#app{height:100%;overflow-x:hidden;width: 100%}
body {background-color: #fbf9fe;}
.home {
  height: 100%;
  .homebg{  transition: all 500ms;
    &.whitebg{background-color:#35495e;}
  }
.header{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  z-index: 100;
  .set {
    font-size: 16px;
    color:white;
  }
}
.left-panel {
  position: absolute;
  top:46px;
  bottom: 55px;
  width: 100%;
  color:white;
  font-size: 16px;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    img {
      display: block;
      width: 100%;
    }
  }
  .info {
    text-align: center;
    padding: 15px 0;
    p.name {
      span {
        padding: 0 10px
      }
    }
    p.complany {
      color:#afafaf
    }
  }
  .list {
    list-style:  none;
    font-size: 14px;
    margin-top:30px;
    li {
    line-height: 40px;
    height: 40px;
    padding-left: 35px;
    .fa {
      margin-right: 10px
    }
    }
  }
}
figure{
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  touch-action: none;
  transform: translate(0, -8px);
  img{
    width:100%
  }
}
.vux-tabbar{
  background:#f7f7f7;
  .circle {
    width: 35px;
    height: 35px;
    padding: 10px;
    border-radius: 50%;
    background:white;
    position:relative;
    left:-15px;
    top: -10px;
  }
  }
}
.router-view {
  width: 100%;
  top: 46px;
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
