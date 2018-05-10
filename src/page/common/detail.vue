<template>
  <div class="nobar blackbg">
    <slot :detail="info" name="detail" v-if="info"></slot>
  </div>
</template>

<script>
import { ERR_OK, DetailApi } from '@/api/api'

export default {
  name: 'detailcontent',
  props: {
    ax: String
  },
  data () {
    return {
      info: ''
    }
  },
  created () {
    this.getDatail()
    console.log(this.info)
    console.log(this.$route)
  },
  methods: {
    getDatail () {
      DetailApi({row_id: this.$route.params.id}, this.ax).then(res => {
        if (ERR_OK === res.code) {
          this.info = res.data
        } else {
          this.$vux.toast.show({
            text: res.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
</style>
