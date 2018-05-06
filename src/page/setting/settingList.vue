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
        {label: '写跟进', value: 'opportunities', status: true},
        {label: '新增线索', value: 'client', status: true},
        {label: '新增客户', value: 'client', status: true},
        {label: '新增商机', value: 'client', status: true},
        {label: '新增联系人', value: 'xiansuo', status: true},
        {label: '新增任务', value: 'compact', status: true},
        {label: '写日报', value: 'opportunities', status: true},
        {label: '写周报', value: 'opportunities', status: true},
        {label: '写月报', value: 'opportunities', status: true},
        {label: '拜访签到', value: 'xiansuo', status: false},
        {label: '查重', value: 'compact', status: false},
        {label: '附近客户', value: 'xiansuo', status: false},
        {label: '名片扫描', value: 'client', status: false},
        {label: '数据上报', value: 'compact', status: false},
        {label: '公海客户', value: 'xiansuo', status: true}
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
