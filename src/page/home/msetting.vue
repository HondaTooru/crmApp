<template>
  <div v-transfer-dom>
  <popup v-model="sett" position="bottom" should-scroll-top-on-show :show-mask="false" class="config">
    <group>

    </group>
  </popup>
</div>
</template>

<script>
import { Popup, Group, Cell, XButton } from 'vux'
export default {
  name: 'msetting',
  props: {
    sett: Boolean
  },
  data () {
    return {
      setter: true
    }
  },
  mounted () {
  },
  components: {
    Popup,
    Group,
    Cell,
    XButton
  }
}
</script>

<style lang="less">
.config {top: 46px;
background:#35495e !important;
}
</style>
