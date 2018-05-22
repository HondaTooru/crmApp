<template>
  <div class="setting">
    <group :gutter="0">
      <h2 slot="title">功能设置</h2>
      <x-switch v-for="(item, i) in managers" :key="i" :title="item.label" v-model="item.status"></x-switch>
    </group>
  </div>
</template>

<script>
import { XSwitch } from 'vux'
export default {
  name: 'settingList',
  data () {
    return {
      managers: [
        {label: '新增线索', value: 'client', status: true},
        {label: '新增客户', value: 'client', status: true},
        {label: '新增商机', value: 'client', status: true},
        {label: '新增联系人', value: 'xiansuo', status: true},
        {label: '查重', value: 'compact', status: false},
        {label: '公海', value: 'xiansuo', status: true}
      ]
    }
  },
  components: {
    XSwitch
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
