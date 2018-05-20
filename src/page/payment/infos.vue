<template>
  <div class="nobar">
    <group :gutter="0" label-width="7em" v-if="infos">
      <cell title="合同标题" :value="infos.title" is-link :link="infos.be_approved === 1 ? '/contractinfo/' : '/contractaudited/' +infos.contract_id"></cell>
      <cell title="计划回款日期" :value="infos.plan_back_date"></cell>
      <cell title="合同总回款金额" :value="infos.amount_money"></cell>
      <cell title="计划回款金额" :value="infos.plan_back_money"></cell>
      <cell title="回款金额" :value="infos.back_money"></cell>
      <cell title="未回款金额" :value="infos.not_back_money"></cell>
      <cell title="回款期次" :value="infos.qishu"></cell>
      <cell title="对应客户" :value="infos.customer"></cell>
      <cell title="回款状态" :value="infos.status"></cell>
      <cell title="负责人" :value="infos.user_id"></cell>
      <cell title="备注" :value="infos.remark"></cell>
    </group>
      <div class="delbtn">
        <x-button @click.native="del" type="warn" :disabled="flag">删除</x-button>
      </div>
</div>
</template>
<script>
import { Pdetail, DelPayment, ERR_OK } from '@/api/api'
import { XButton } from 'vux'

export default {
  name: 'paymentinfo',
  data () {
    return {
      params: {
        row_id: this.$route.params.id
      },
      infos: null,
      flag: false
    }
  },
  components: {
    XButton
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      Pdetail(this.params).then(res => { this.infos = res.data })
    },
    del () {
      let _that = this
      this.flag = true
      this.$vux.confirm.show({
        content: '删除后不可恢复~',
        onCancel () { _that.flag = false },
        onConfirm () {
          DelPayment({row_id: _that.$route.params.id}).then(res => {
            if (ERR_OK === res.code) {
              _that.$vux.toast.show({ text: res.msg, type: 'success', onHide () { _that.$router.replace('/payment') } })
            } else {
              _that.flag = false
              _that.$vux.toast.show({ text: res.msg })
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.delbtn {
  margin: 15px;
}
</style>
