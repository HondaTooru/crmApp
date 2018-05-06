<template>
  <div class="settingview">
   <group :gutter='0'>
     <cell v-for="item in list" :title="item.name" :key="item.id" is_link link="/viewlist"></cell>
   </group>
  </div>
</template>

<script>

export default {
  name: 'seettingview',
  data () {
    return {
      list: [
        {id: 0, name: '功能配置'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.settingview {
  bottom: 0
}
</style>
