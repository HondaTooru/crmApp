<template>
  <div class="select">
    <div v-transfer-dom>
        <popup v-model="dropShow" position="bottom" should-rerender-on-show>
          <group :gutter="0">
            <radio :options="list[n].data" v-model="list[n].defaultVal.key" @on-change="change"></radio>
          </group>
        </popup>
    </div>
    <span @click="showDrop">{{list[n].defaultVal.value}}</span>
  </div>
</template>

<script>
import { Popup, Radio, Group } from 'vux'
export default {
  name: 'dropList',
  data () {
    return {
      dropShow: false,
      RouterName: ['clue', 'contract', 'contact', 'opportunity', 'customer', 'payment'],
      list: [
        {defaultVal: {key: 0, value: '全部线索'}, data: [{ key: 0, value: '全部线索' }, { key: 1, value: '我的线索' }, { key: 2, value: '已转客户线索' }]},
        {defaultVal: {key: 0, value: '全部合同'}, data: [{ key: 0, value: '全部合同' }, { key: 1, value: '我的合同' }, { key: 2, value: '我的协作合同' }]},
        {defaultVal: {key: 0, value: '全部联系人'}, data: [{ key: 0, value: '全部联系人' }, { key: 1, value: '我的联系人' }, { key: 2, value: '我的协作联系人' }]},
        {defaultVal: {key: 0, value: '全部商机'}, data: [{ key: 0, value: '全部商机' }, { key: 1, value: '我的商机' }, { key: 2, value: '我的协作商机' }]},
        {defaultVal: {key: 0, value: '全部客户'}, data: [{ key: 0, value: '全部客户' }, { key: 1, value: '我的客户' }, { key: 2, value: '我的协作客户' }, { key: 3, value: '待审批的客户' }]},
        {defaultVal: {key: 0, value: '回款计划'}, data: [{ key: 0, value: '回款计划' }, { key: 1, value: '回款记录' }, { key: 2, value: '开票记录' }, { key: 3, value: '待审批的回款' }]}
      ]
    }
  },
  components: {
    Popup,
    Radio,
    Group
  },
  methods: {
    showDrop () {
      this.dropShow = !this.dropShow
    },
    change (key, value) {
      this.list[this.n].defaultVal.value = value
      this.dropShow = false
      this.$vux.bus.$emit('getTypeList', key)
    }
  },
  created () {
    console.log(this.$route)
  },
  computed: {
    n () {
      return this.RouterName.indexOf(this.$route.name)
    }
  }
}
</script>

<style lang="less">

</style>
