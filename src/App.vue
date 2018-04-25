<template>
 <div class="search vux-1px-b">
   <div v-transfer-dom>
  <popup v-model="show3" should-scroll-top-on-show class="val">
    <div class="pheight">
      <group>
        <x-switch title="Multi Popup (first)" v-model="show3"></x-switch>
        <x-switch title="Multi Popup (second)" v-model="show4"></x-switch>
      </group>
      this is the first popup
    </div>
  </popup>
</div>
<div v-transfer-dom>
  <popup v-model="show4" should-scroll-top-on-show heigh="400px">
    <div class="pheight">
      <group>
        <x-switch title="Multi Popup (second)" v-model="show4"></x-switch>
      </group>
      this is the second popup
    </div>
  </popup>
</div>
   <div class="content">
     <div class="left">
       <span @click="show3 = !show3">选择类型</span>
     </div>
     <div class="right">
       <input type="text" class="keyword">
     </div>
   </div>
 </div>
</template>

<script>
import { Popup, Group, XSwitch, FlexBox, FlexBoxItem } from 'vux'

export default {
  name: 'search',
  data () {
    return {
      show3: false,
      show4: false
    }
  },
  methods: {},
  components: {
    Group,
    XSwitch,
    Popup,
    FlexBox,
    FlexBoxItem
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
.pheight {
  height: 350px
}
.search {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  padding: 10px 0;
  .content {
    display: flex;
    .left {
      width: 150px;
      min-width: 150px;
      text-align: center;
      position: relative;
      font-size: 14px;
      &:after{
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-right: 1px solid #C7C7C7;
        color: #C7C7C7;
        transform-origin: 100% 0;
        transform: scaleX(0.5);
      }
      &:before {
        content: '❯';
        position: absolute;
        color:#C7C7C7;
        right: 30px;
        transform: rotate(90deg);
      }
      span {
        width: 100%;
        display: block;
      }
    }
    .right {
      flex:1;
      padding:0 15px 0 30px;
      background:url(./assets/Search.svg) no-repeat 5px center/contain;
      .keyword {
        appearance:none;
        border: 0 none;
        outline: 0 none;
        height: 100%;
        float:left;
        width: 100%
      }
    }
  }
}
</style>
