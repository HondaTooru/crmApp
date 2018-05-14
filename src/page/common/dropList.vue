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
import { Popup, Radio } from 'vux'
import { List, RouterName } from '@/page/setting/menu'

export default {
  name: 'dropList',
  data () {
    return {
      dropShow: false,
      RouterName: RouterName,
      list: List
    }
  },
  components: {
    Popup,
    Radio
  },
  methods: {
    showDrop () {
      this.dropShow = !this.dropShow
    },
    change (key, value) {
      this.list[this.n].defaultVal.value = value
      this.list[this.n].defaultVal.key = key
      this.dropShow = false
      this.$vux.bus.$emit('getTypeList', this.list[this.n].data[key].tag)
    }
  },
  destroyed () {
    this.$vux.bus.$off('getTypeList')
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
