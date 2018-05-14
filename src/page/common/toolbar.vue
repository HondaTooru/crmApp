<template>
  <div class="caidan">
  <router-link :to="'/writeclue/' + $route.params.id" tag="div" class="item">
    <span class="icon"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
    <span class="text">写跟进</span>
  </router-link>
  <div class="item">
    <a href="tel:15192715214">
    <span class="icon"><i class="fa fa-phone-square" aria-hidden="true"></i></span>
    <span class="text">电话</span>
    </a>
  </div>
  </div>
</template>

<script>
export default {
  name: 'toolbar',
  props: {
    item: Object
  }
}
</script>

<style lang="less" scoped>
.caidan {
  width: 52px;
  height: 52px;
  bottom: 0;
  width: 100%;
  left: 0;
  opacity: 1;
  position: absolute;
  z-index: 99;
  overflow: hidden;
  display: flex;
  box-shadow: 1px 1px 20px 0px #35495e;
  border-top: 1px solid #6b6b6b;
  .item {
    background:#35495e;
    flex:1;
    text-align: center;
    a {color:#10aeff}
    span {
      display: block;
      &.icon{padding: 5px 0 0 0; .fa {font-size: 27px;margin:0}}
      &.text{ font-size: 10px}
    }
  }
}
</style>
