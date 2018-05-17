<template>
<div class="nobar" id="box">
  <!-- <sticky scroll-box="box" :check-sticky-support="false" :offset="46"> -->
    <tab v-model="index" :line-width="1">
      <tab-item selected>基本信息</tab-item>
      <tab-item>附件</tab-item>
</tab>
<!-- </sticky> -->
<swiper v-model="index" :height="_vh" :show-dots="false">
    <swiper-item>
      <div class="content">
        <group :gutter="0" v-if="list.length" class="list">
          <cell v-for="item in list" :key="item.id" :title="item.showname" :value="item.value"></cell>
        </group>
      </div>
    </swiper-item>
    <swiper-item>
      <empty-data></empty-data>
    </swiper-item>
  </swiper>
</div>
</template>

<script>
import { ListDetail } from '@/api/api'
import EmptyData from '@/page/common/emptydata'
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
//  Sticky
export default {
  name: 'listinfo',
  data () {
    return {
      index: 0,
      list: []
    }
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    // Sticky,
    EmptyData
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      ListDetail({contract_list_id: this.$route.params.id}).then(res => {
        this.list = res.data.header
        this.list.forEach(item => {
          for (let i in res.data.body) {
            if (item.name === i) {
              item.value = res.data.body[i]
            }
          }
        })
      })
    }
  },
  computed: {
    _vh () {
      return window.innerHeight - 90 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  .list{
    position: relative;
    top:-2px
  }
}
</style>
