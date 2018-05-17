<template>
  <div class="nobar">
  <group :gutter="0">
    <x-input title="产品名称" v-model="infos.title" text-align="right"></x-input>
    <x-input title="产品单价" is-type="number" v-model.number="infos.unit_price" text-align="right"></x-input>
    <x-input title="产品单位" v-model="infos.unit_sales" text-align="right"></x-input>
    <x-input title="产品分类" v-model="infos.cate_id" text-align="right"></x-input>
    <x-input title="产品主图" v-model="infos.image" text-align="right"></x-input>
    <datetime title="创建时间" v-model="infos.create_time" text-align="right" format="YYYY-MM-DD HH:mm"></datetime>
    <datetime title="更新时间" v-model="infos.update_time" text-align="right" format="YYYY-MM-DD HH:mm"></datetime>
    <x-input title="产品编号" v-model="infos.product_code" text-align="right"></x-input>
    <x-input title="产品成本" v-model="infos.unit_cost" text-align="right"></x-input>
    <x-input title="毛利率" v-model="infos.rate" text-align="right"></x-input>
    <x-textarea title="产品介绍" placeholder="请输入内容" v-model="infos.content" :max="200"></x-textarea>
  </group>
  <div class="delbtn">
    <x-button type="warn" @click.native="delProduct">删除产品</x-button>
  </div>
</div>
</template>

<script>
import { XInput, Datetime, XTextarea, XButton } from 'vux'
import { DetailApi, EditSave, ERR_OK, DelProduct } from '@/api/api'

export default {
  name: 'productinfo',
  data () {
    return {
      infos: {},
      params: {}
    }
  },
  created () {
    this.getInfo()
    this.$vux.bus.$on('Addinfo', () => {
      this.saveData()
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
    delProduct () {
      let _that = this
      this.$vux.confirm.show({
        content: '删除后不可恢复~',
        onConfirm () {
          DelProduct({row_id: _that.$route.params.id}).then(res => {
            if (ERR_OK === res.code) {
              _that.$vux.toast.show({
                text: res.msg,
                type: 'success',
                onHide () {
                  _that.$router.back()
                }
              })
            } else {
              _that.$vux.toast.show({
                text: res.msg
              })
            }
          })
        }
      })
    },
    getInfo () {
      DetailApi({ row_id: this.$route.params.id }, 'product').then(res => {
        this.infos = res.data.body
      })
    },
    saveData () {
      EditSave(this.params, 'Product').then(res => {
        if (ERR_OK === res.code) {
        } else {}
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    XInput,
    Datetime,
    XTextarea,
    XButton
  }
}
</script>

<style lang="css" scoped>
.delbtn {
  margin: 15px
}
</style>
