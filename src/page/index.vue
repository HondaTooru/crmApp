<template>
  <div id="app">
    <div v-transfer-dom>
    <actionsheet v-model="Addmore" :menus="menus[ActionMenu.indexOf($route.name) || 0]" show-cancel @on-click-menu="AddPage"></actionsheet>
    </div>
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
              <img :src="userInfos.avatar" alt="">
            </div>
            <div class="info">
              <p class="name">
                <span>{{userInfos.username}}</span><span>{{userInfos._role}}</span>
              </p>
              <p class="complany">{{userInfos._group}}</p>
            </div>
            <ul class="list">
              <router-link to="/notifications" tag="li" @click.native="drawerVisibility = false"><i class="fa fa-bell" aria-hidden="true"></i>通知中心</router-link>
              <router-link to="center" tag="li" @click.native="drawerVisibility = false"><i class="fa fa-cog" aria-hidden="true"></i>设置</router-link>
              <router-link to="updatepass" tag="li" @click.native="drawerVisibility = false"><i class="fa fa-unlock-alt" aria-hidden="true"></i>修改密码</router-link>
              <router-link :to="{ name: '', params: {} }" tag="li" @click.native="signOut"><i class="fa fa-sign-out" aria-hidden="true"></i>退出登录</router-link>
            </ul>
          </div>
        </view-box>
      </div>
       <div class="mainBox">
        <x-header class="header"
        :transition="headerTransition"
        :left-options="{showBack: !(route.path === '/' || route.path === '/mywork')}"
        :right-options="{showMore: this.ActionMenu.indexOf(route.name) !== -1}"
        @on-click-more="Addmore = !Addmore"
        >
         <div slot="overwrite-title" class="com-title" v-if="this.dropTitle.indexOf(route.path) === -1">{{ gobalSett ? title : $route.meta.title }}</div>
         <drop-list slot="overwrite-title" class="com-title" v-if="this.dropTitle.indexOf(route.path) !== -1"></drop-list>
          <figure slot="overwrite-left" @click="drawerVisibility = !drawerVisibility" v-if="(route.path == '/' || route.path == '/mywork') && !gobalSett">
            <img :src="userInfos.avatar">
          </figure>
          <div slot="right" class="set">
            <span v-if="route.path == '/mywork' && !gobalSett" @click="gosettingView">设置</span>
            <span v-if="gobalSett" @click="goSetting">设置</span>
            <span v-if="addData.indexOf($route.name) !== -1" class="save" @click="saveAdd"><i aria-hidden="true" class="fa fa-check-circle-o"></i>保存</span>
            <span v-if="delBtns.indexOf($route.name) !== -1" class="save" @click="delthisbtn"><i class="fa fa-trash-o" aria-hidden="true"></i>清除</span>
            <span v-if="addBtn.indexOf($route.name) !== -1" class="save" @click="addBtns"><i class="fa fa-plus-circle" aria-hidden="true"></i>新增</span>
          </div>
        </x-header>
        <transition
        @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
        :name="viewTransition" :css="!!direction">
        <keep-alive :include="include">
        <router-view class="router-view"></router-view>
        </keep-alive>
      </transition>
        <tabbar class="vux-tabbar" icon-class="vux-center" v-if="route.path ==='/' || route.path ==='/mywork'">
            <tabbar-item link="/" :selected="route.path == '/' && gobalSett == false">
              <img slot="icon" src="../assets/home.svg">
              <img slot="icon-active" src="../assets/home_active.svg">
              <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item @on-item-click="$store.commit('updateGobalSett', {gobalSett: true})">
              <div class="circle" slot="icon">
              <img src="../assets/more.svg">
            </div>
            </tabbar-item>
            <tabbar-item badge="9" link="/mywork" :selected="route.path == '/mywork' && gobalSett == false">
              <img slot="icon" src="../assets/work.svg">
              <img slot="icon-active" src="../assets/work_active.svg">
              <span slot="label">工作</span>
            </tabbar-item>
       </tabbar>
     </div>
    </drawer>
  </div>
</div>
</template>

<script>
import { XHeader, Drawer, ViewBox, Tabbar, TabbarItem, Popup, Radio, Actionsheet } from 'vux'
import DropList from '@/page/common/dropList'
import { mapState, mapActions } from 'vuex'
import { MemberInfo } from '@/api/api'
import { ActionMenu, AddData, Menus, DropTitle, addBtn, delBtns, Include } from '@/page/setting/menu'

export default {
  name: 'index',
  data () {
    return {
      drawerVisibility: false,
      Addmore: false,
      ActionMenu: ActionMenu,
      addData: AddData,
      addBtn: addBtn,
      menus: Menus,
      delBtns: delBtns,
      dropTitle: DropTitle,
      include: Include,
      userInfos: {}
    }
  },
  mounted () {
    this.handler = () => {
      if (this.path === '/demo') {
        this.box = document.querySelector('#demo_list_box')
        this.updateDemoPosition(this.box.scrollTop)
      }
    }
  },
  components: {
    XHeader,
    Drawer,
    ViewBox,
    Tabbar,
    Popup,
    TabbarItem,
    Radio,
    DropList,
    Actionsheet
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      direction: state => state.vux.direction,
      gobalSett: state => state.vux.gobalSett
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
        if ((this.route.path === '/' || this.route.path === '/mywork') && this.gobalSett === true) return '快捷功能'
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
  created () { this.getInfos() },
  methods: {
    getInfos () {
      MemberInfo().then(res => { this.userInfos = res.data })
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
    goSetting () {
      this.$store.commit('updateGobalSett', {gobalSett: false})
      this.$router.push('/settinglist')
    },
    gosettingView () {
      this.$store.commit('updateGobalSett', {gobalSett: false})
      this.$router.push('/settingview')
    },
    saveAdd () {
      this.$vux.bus.$emit('Addinfo')
    },
    delthisbtn () {
      this.$vux.bus.$emit('DelInfo')
    },
    addBtns () {
      this.$vux.bus.$emit('AddBtn')
    },
    signOut () {
      let _that = this
      this.$vux.confirm.show({
        content: '确认退出吗？',
        onConfirm () {
          localStorage.setItem('crm_user_data', '')
          _that.$router.replace('login')
        }
      })
    },
    AddPage (n, i) {
      if (n) return
      let id = this.$route.params.id
      if (typeof i.link === 'object') {
        this.$vux.bus.$emit('saveData')
        return
      } else { id = '' }
      this.$router.push('/' + i.link + id)
    },
    ...mapActions([
      'updateDemoPosition'
    ])
  }
}
</script>

<style lang="less">
@baseColor:#1cb0f1;
.home {
  height: 100%;
  overflow: hidden;
.header{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  z-index: 100;
  .set {
    font-size: 16px;
    color:white;
    .save {
      font-size: 14px;
      .fa {margin-right: 5px}
    }
  }
  .com-title{
    height: 100%;
    line-height: 40px;
    text-align: center;
    color:white;
    span {
      position: relative;
      &:after {
        content: '❯';
        font-size: 12px;
        color:white;
        transform: rotate(90deg);
        position: absolute;
        right: -14px;
      }
    }
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
    font-size: 16px;
    li {
    line-height: 48px;
    height: 48px;
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
  padding-top: 46px;
  padding-bottom: 50px;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar{display: none;}
  &.nobar{padding-bottom: 0;
  .fa {margin-right: 5px}
  }
  &.blackbg {background-color:#35495e;color:white;}

}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 0;
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
.mainBox {
  height: 100%;
  overflow: hidden;
}
</style>
