<template>
  <div class="setting">
    <group :gutter="0">
      <h2 slot="title">销售管理</h2>
      <x-switch v-for="(item, i) in managers" :key="i" :title="item.showname"></x-switch>
    </group>
  </div>
</template>

<script>
import { XSwitch, Group } from 'vux'
export default {
  name: 'settingList',
  data () {
    return {
      managers: JSON.parse(localStorage.getItem('MENU_KEY'))
    }
  },
  components: {
    XSwitch,
    Group
  }
}
</script>

<style lang="css" scoped>
.setting {
  bottom: 0;
}
h2{
  padding: 5px 0 5px 15px;
  color: #333;
  font-size: 14px;
  font-weight: normal;
  background-color: #f5f5f5;
}
</style>
