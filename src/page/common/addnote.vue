<template>
 <div class="mark nobar" id="box">
   <group :gutter="0" title="必填信息">
      <div v-for="m in note" v-if="m.required === 1" class="item">
        <x-input v-if="m.field_type === 'text' || m.field_type === 'decimal'" :title="m.showname" v-model='m.value' :is-type="m.name.indexOf('tel') !== -1 ? 'china-mobile' : ''" text-align="right" :type="m.name.indexOf('tel') !== -1 ? 'tel' : 'text'" required></x-input>
        <datetime v-model="m.value" :title="m.showname" v-if="m.field_type === 'date'" format="YYYY-MM-DD HH:mm"></datetime>
        <checklist :title="m.showname" :options="sexList" v-model="m.value" :max="1" v-if="m.field_type === 'radio'"></checklist>
        <popup-picker v-if="m.field_type === 'drop'" :popup-title="m.showname" :data="[k[m.name]]" :title="m.showname" v-model="m.value"></popup-picker>
      </div>
   </group>
   <group :gutter="0" title="选填信息">
     <cell
  is-link
  :border-intent="false"
  :arrow-direction="showContent ? 'up' : 'down'"
  @click.native="showContent = !showContent">
  <div slot="title" class="more" @click="slideDown"><i class="fa fa-list" aria-hidden="true"></i><span ref="title">点击展开</span></div>
</cell>
  <template v-if="showContent">
    <div v-for="m in note" v-if="m.required === 0 && unless.indexOf(m.name) === -1" class="item">
      <x-input :is-type="m.name.indexOf('tel') !== -1 ? 'china-mobile' : ''" :placeholder="'请输入' + m.showname" :title="m.showname" v-model='m.value' v-if="m.field_type === 'text' && m.name !== 'address' || m.field_type === 'decimal'" text-align="right" :type="m.name.indexOf('tel') !== -1 ? 'tel' : 'text'"></x-input>
      <datetime v-model="m.value" :title="m.showname" v-if="m.field_type === 'date'" format="YYYY-MM-DD HH:mm"></datetime>
      <x-address  @on-shadow-change="onShadowChange" :title="m.showname" v-model="m.value" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"  v-if="m.name === 'address'"></x-address>
      <popup-picker v-if="m.field_type === 'drop'" :popup-title="m.showname" :data="[k[m.name]]" :title="m.showname" v-model="m.value"></popup-picker>
    </div>
  </template>
   </group>
 </div>
</template>

<script>
import { ERR_OK, AddApi, SaveAddApi } from '@/api/api'
import { XInput, CellBox, PopupPicker, Datetime, XAddress, ChinaAddressV4Data, Checklist } from 'vux'

export default {
  name: 'addnote',
  data () {
    return {
      showContent: false,
      unless: ['provance', 'city', 'area', 'imgs'],
      unlessId: ['pre_user_id', 'pre_department_id', 'parent_customer', 'customer', 'user_id_2', 'per_department', 'per_user'],
      note: [],
      saveList: [],
      addressData: ChinaAddressV4Data,
      showAddress: false,
      sexList: ['男', '女']
    }
  },
  props: {
    k: Object
  },
  activated () {
    this.$vux.bus.$on('Addinfo', () => {
      this.SaveData()
    })
  },
  deactivated () {
    this.$vux.bus.$off('Addinfo')
    this.showContent = false
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      AddApi(this.k.name).then(res => {
        if (ERR_OK === res.code) {
          let data = res.data.thead
          if (!res.data.thead) data = res.data.header
          data.forEach(item => {
            if (this.unlessId.indexOf(item.name) !== -1) item.field_type = 'drop'
          })
          this.note = data
        }
      })
    },
    slideDown () {
      this.$refs.title.innerText === '点击展开' ? this.$refs.title.innerText = '点击关闭' : this.$refs.title.innerText = '点击展开'
    },
    onShadowChange (ids, names) {
      this.note.forEach(item => {
        if (item.name === 'provance') item.value = names[0]
        if (item.name === 'city') item.value = names[1]
        if (item.name === 'area') item.value = names[2]
      })
    },
    SaveData () {
      this.saveList = []
      this.note.forEach(item => {
        this.saveList.push({name: item.name, value: !item.value ? '' : item.value.toString()})
      })
      let t = { field_data: JSON.stringify(this.saveList) }
      let s = 'save_add'
      if (this.k.name === 'customer' || this.k.name === 'opportunities') s = 'add_save'
      console.log(t)
      SaveAddApi(t, this.k.name, s).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            position: 'center',
            onHide: () => {
              this.$router.back()
            }
          })
        } else {
          this.$vux.toast.show({ text: '必填信息不能为空~', position: 'bottom', width: '10em' })
        }
      })
    }
  },
  components: {
    XInput,
    CellBox,
    PopupPicker,
    Datetime,
    XAddress,
    Checklist
  }
}
</script>

<style lang="less" scoped>
.mark {
  .item {
    position: relative;
    &:last-of-type {
      &:after{
        display: none;
      }
    }
    &:after{
    content: " ";
    position: absolute;
    left: 15px;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
    }
  }
  .more {
    color: #c1094c;
    position: relative;
    .fa {margin-right: 5px}
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      bottom: -11px;
      right: -30px;
      height: 1px;
      border-bottom: 1px solid #D9D9D9;
      color: #D9D9D9;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
    }
  }
}

</style>
