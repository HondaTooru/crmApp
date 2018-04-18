<template>
  <div class="home">
    <x-header>
      <span>首页</span>
      <figure slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
        <img src="../assets/avatar.jpg">
      </figure>
    </x-header>
    <x-drawer
    width="200px"
    show-mode="push"
    placement="left"
    :show.sync="drawerVisibility"
    :drawer-style="{'background-color':'#35495e', width: '200px'}"
    ></x-drawer>
  </div>
</template>

<script>
import { XHeader, Drawer } from 'vux'
export default {
  data () {
    return {
      drawerVisibility: false
    }
  },
  components: {
    'x-header': XHeader,
    'x-drawer': Drawer
  }
}
</script>

<style lang="less">
.home{
  height:100%;
  figure{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
    transform: translate(0, -8px);
    img{
      width:100%
    }
  }
}
</style>
