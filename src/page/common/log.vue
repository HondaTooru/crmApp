<template>
  <div>
    <div class="content" v-if="list.length"></div>
  <empty-data v-if="!list.length"></empty-data>
  </div>

</template>

<script>
import { ERR_OK, GetLog } from '@/api/api'
import EmptyData from '@/page/common/emptydata'
export default {
  name: 'log',
  props: {
    type: Object
  },
  data () {
    return {
      list: []
    }
  },
  components: {
    EmptyData
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      GetLog({ row_id: this.type.id, page: 1 }, this.type.api).then(res => {
        if (ERR_OK === res.code) {
          this.list = res.data
          console.log(res)
        } else {
          this.$vux.toast.show({ text: res.msg })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
