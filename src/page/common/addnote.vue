<template>
 <div class="mark nobar" id="box">
   <group :gutter="0" title="必填信息">
      <div v-for="m in note" v-if="m.required === 1" class="item">
        <x-input :title="m.showname" v-model='m.value'></x-input>
      </div>
   </group>
   <group :gutter="0" title="选填信息">
     <cell
  is-link
  :border-intent="false"
  :arrow-direction="showContent001 ? 'up' : 'down'"
  @click.native="showContent001 = !showContent001">
  <div slot="title" class="more" @click="slideDown"><i class="fa fa-list" aria-hidden="true"></i><span ref="title">点击展开</span></div>
</cell>
  <template v-if="showContent001">
    <div v-for="m in note" v-if="m.required === 0" class="item">
      <x-input :title="m.showname" v-model='m.value' v-if="m.field_type !== 'drop'"></x-input>
      <popup-picker v-if="m.field_type === 'drop'" :popup-title="m.showname" :data="[k[m.name]]" :title="m.showname" v-model="m.value"></popup-picker>
    </div>
  </template>
   </group>
 </div>
</template>

<script>
import { ERR_OK, AddApi, USERID } from '@/api/api'
import { XInput, Cell, CellBox, PopupPicker } from 'vux'

export default {
  name: 'addnote',
  data () {
    return {
      parmas: USERID,
      showContent001: false,
      note: []
    }
  },
  props: {
    k: Object
  },
  created () {
    this.list()
    console.log(this.k.status)
  },
  methods: {
    list () {
      AddApi(this.parmas, this.k.name).then(res => {
        if (ERR_OK === res.code) {
          this.note = res.data.thead
        }
      })
    },
    slideDown () {
      this.$refs.title.innerText === '点击展开' ? this.$refs.title.innerText = '点击关闭' : this.$refs.title.innerText = '点击展开'
    }
  },
  components: {
    XInput,
    Cell,
    CellBox,
    PopupPicker
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
