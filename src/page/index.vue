<template>
  <div class="home">
    <drawer
    width="200px"
    show-mode="push"
    placement="left"
    :show.sync="drawerVisibility"
    :drawer-style="{'background-color':'#35495e', width: '200px'}"
    >
    <div slot="drawer">
     fsaff
    </div>
    <view-box>
      <x-header slot="header" class="header">
        <span>首页</span>
        <figure slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
          <img src="../assets/avatar.jpg">
        </figure>
      </x-header>
      <div>

      </div>
      <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
        <tabbar-item>
          <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon" style="position:relative;top: -2px;">&#xe637;</span>
          <span slot="label">Home</span>
        </tabbar-item>
        <tabbar-item badge="9">
          <span class="demo-icon-22" slot="icon">&#xe633;</span>
          <span slot="label"><span class="vux-demo-tabbar-component"></span></span>
        </tabbar-item>
        <tabbar-item badge="9">
          <span class="demo-icon-22" slot="icon">&#xe633;</span>
          <span slot="label"><span class="vux-demo-tabbar-component"></span></span>
        </tabbar-item>
     </tabbar>
    </view-box>
  </drawer>
  </div>
</template>

<script>
import { XHeader, Drawer, ViewBox, Tabbar, TabbarItem } from 'vux'
export default {
  data () {
    return {
      drawerVisibility: false
    }
  },
  components: {
    XHeader,
    Drawer,
    ViewBox,
    Tabbar,
    TabbarItem
  }
}
</script>

<style lang="less">
.home{
  height:100%;
  .header{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    z-index: 100
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
}
</style>
