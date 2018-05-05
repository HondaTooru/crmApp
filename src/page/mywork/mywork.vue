<template>
  <div>
    <group :gutter="0">
      <h3 slot="title" class="main_">销售管理</h3>
      <flexbox :gutter="0" wrap="wrap" class="wlist">
         <flexbox-item :span="1/4" v-for="(item, i) in menuList" :key="item.id">
           <router-link :to="{ name: item.name }" tag="div">
           <div class="icon" :class="'icon-'+[i]"><i class="fa" :class="getIcon(item.name)" aria-hidden="true"></i></div>
           <div class="text">{{item.showname}}</div>
           </router-link>
         </flexbox-item>
      </flexbox>
    </group>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'
import { MenuApi, ERR_OK, USERID } from '@/api/api'
export default {
  name: 'mywork',
  data () {
    return {
      menuList: [],
      mlist: {active: 'text', error: 'al'},
      listIcon: [
        { icon: 'fa-crosshairs', name: 'clue' },
        { icon: 'fa-user', name: 'customer' },
        { icon: 'fa-address-book-o', name: 'contact' },
        { icon: 'fa-usd', name: 'opportunity' },
        { icon: 'fa-handshake-o', name: 'contract' },
        { icon: 'fa-briefcase', name: 'product' },
        { icon: 'fa-credit-card-alt', name: 'payment' },
        { icon: 'fa-list-alt', name: 'contract_list' }
      ],
      params: USERID
    }
  },
  components: {
    Flexbox,
    FlexboxItem
  },
  methods: {
    getMenu () {
      MenuApi(this.params).then(res => {
        if (ERR_OK === res.code) {
          this.menuList = res.data
          localStorage.setItem('MENU_KEY', JSON.stringify(this.menuList))
        } else {
          this.$vux.toast.show({
            text: res.msg
          })
        }
      })
    },
    getIcon (el) {
      let NewArr = this.listIcon.filter(item => item.name === el)
      return [NewArr[0].icon]
    }
  },
  created () {
    this.getMenu()
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
.main_ {
  padding: 5px 0 5px 15px;
  color:#333;
  font-size: 14px;
  font-weight: normal;
  background-color:#f5f5f5;
}
.wlist {
    padding: 15px 0 0;
    .icon {
      width: 50px;
      height: 50px;
      font-size: 26px;
      line-height: 50px;
      margin: 0 auto;
      background:#659cad;
      color:white;
      border-radius: 10px;
      &.icon-1{
        background-color:#b77600;
      }
      &.icon-2{
        background-color:#25a297;
      }
      &.icon-3{
        background-color:#934cab;
      }
      &.icon-4{
        background-color:#325ebf;
      }
      &.icon-5{
        background-color:#00a56f;
      }
      &.icon-6{
        background-color:#5d5850;
      }
      &.icon-7{
        background-color:#ea4a85;
      }
    }
    .icon,.text {
    text-align: center;
  }
  .text {
    font-size: 12px;
    padding: 10px 0 15px;
  }
}

</style>
