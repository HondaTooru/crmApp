<template>
  <div class="nobar hastool" :class="{blackbg: ax.flag}">
    <div class="main_o">
    <slot :detail="info" name="detail" v-if="info"></slot>
    </div>
    <slot name="toolbar"></slot>
  </div>
</template>

<script>
import { ERR_OK, DetailApi } from '@/api/api'

export default {
  name: 'detailcontent',
  props: {
    ax: Object
  },
  data () {
    return {
      info: ''
    }
  },
  created () {
    this.getDatail()
  },
  methods: {
    getDatail () {
      let _that = this
      DetailApi({row_id: this.$route.params.id}, this.ax.name).then(res => {
        if (ERR_OK === res.code) {
          this.info = res.data
          // if () this.info.detail.body.address = this.infos.detail.body.address.split(',')
          localStorage.setItem('DETAIL_INFO', JSON.stringify(res.data))
        } else {
          this.$vux.toast.show({
            text: res.msg,
            onHide () {
              _that.$router.back()
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.nobar {
  &.hastool {
   overflow: hidden;
   padding-bottom: 50px;
  &>.main_o{
    width: 100%;
    padding-top: 0;
    padding-bottom:0;
    overflow: auto;
    box-sizing: border-box;
    height: 100%;
    -webkit-overflow-scrolling: touch;
  }
  }
}
</style>
