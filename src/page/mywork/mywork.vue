<template>
  <div>
    <group :gutter="0">
      <h3 slot="title" class="main_">销售管理</h3>
      <!-- <flexbox class="wlist" :guuter="0">
        <flexbox-item>
          <div class="icon icon-1"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
          <div class="text">线索123</div>
        </flexbox-item>
        <flexbox-item>
        <div class="icon icon-2"><i class="fa fa-user" aria-hidden="true"></i></div>
        <div class="text">客户</div>
        </flexbox-item>
        <flexbox-item>
          <div class="icon icon-3"><i class="fa fa-usd" aria-hidden="true"></i></div>
          <div class="text">商机</div>
        </flexbox-item>
        <flexbox-item>
          <div class="icon icon-4"><i class="fa fa-handshake-o" aria-hidden="true"></i></div>
          <div class="text">合同</div>
        </flexbox-item>
      </flexbox> -->
      <flexbox :gutter="0" wrap="wrap" class="wlist">
         <flexbox-item :span="1/4" v-for="item in menuList" :key="item.id">
           <router-link :to="{ name: 'clue', params: {} }" tag="div">
           <div class="icon icon-1"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
           <div class="text">{{item.showname}}</div>
           </router-link>
         </flexbox-item>
      </flexbox>
    </group>
  </div>
</template>

<script>
import { Group, Flexbox, FlexboxItem } from 'vux'
import { MenuApi, ERR_OK, USER_KEY } from '@/api/api'
export default {
  name: 'mywork',
  data () {
    return {
      menuList: [],
      params: {
        customer_id: JSON.parse(localStorage.getItem(USER_KEY)).customer_id
      }
    }
  },
  components: {
    Group,
    Flexbox,
    FlexboxItem
  },
  methods: {
    getMenu () {
      MenuApi(this.params).then(res => {
        if (ERR_OK === res.code) {
          this.menuList = res.data
        } else {
          this.$vux.toast.show({
            text: res.msg
          })
        }
      })
    }
  },
  created () {
    this.getMenu()
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
      background:red;
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
        background-color:#b77600;
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
