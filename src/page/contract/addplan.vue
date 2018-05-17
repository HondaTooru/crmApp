<template>
  <div class="nobar">
    <x-input title="对应客户" disabled></x-input>
    <x-input title="合同标题" disabled></x-input>
    <x-input title="合同总金额" disabled></x-input>
    <x-input title="签约日期" disabled></x-input>    
  </div>
</template>

<script>
import { XInput } from 'vux'

export default {
  name: 'addplan',
  data () {
    return {}
  },
  components: {
    XInput
  }
}
</script>

<style lang="css">

</style>
