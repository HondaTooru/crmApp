<template>
  <div>
    <group :gutter="0">
      <h3 slot="title" class="main_">销售管理</h3>
      <flexbox class="wlist">
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
      </flexbox>
    </group>
    <group :gutter="0">
      <h3 slot="title" class="main_">销售支持</h3>
      <flexbox class="wlist">
        <flexbox-item>
          <div class="icon icon-1"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
          <div class="text">线索123</div>
        </flexbox-item>
        <flexbox-item>
        <div class="icon icon-2"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
        <div class="text">客户</div>
        </flexbox-item>
        <flexbox-item>
          <div class="icon icon-3"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
          <div class="text">商机</div>
        </flexbox-item>
        <flexbox-item>
          <div class="icon icon-4"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
          <div class="text">合同</div>
        </flexbox-item>
      </flexbox>
    </group>
    <group :gutter="0">
      <h3 slot="title" class="main_">技术团队</h3>
      <flexbox class="wlist">
        <flexbox-item>
          <div class="icon icon-1"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
          <div class="text">线索123</div>
        </flexbox-item>
        <flexbox-item>
        <div class="icon icon-2"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
        <div class="text">客户</div>
        </flexbox-item>
        <flexbox-item>
          <div class="icon icon-3"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
          <div class="text">商机</div>
        </flexbox-item>
        <flexbox-item>
          <div class="icon icon-4"><i class="fa fa-crosshairs" aria-hidden="true"></i></div>
          <div class="text">合同</div>
        </flexbox-item>
      </flexbox>
    </group>
  </div>
</template>

<script>
import { Group, Flexbox, FlexboxItem } from 'vux'
export default {
  name: 'mywork',
  data () {
    return {
    }
  },
  components: {
    Group,
    Flexbox,
    FlexboxItem
  },
  methods: {
  },
  created () {
    this.$http.post(this.HOST + '/crm/api/menu', {customer_id: '810'}).then(data => {
      console.log(data)
    })
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
    padding: 15px 0;
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
    padding-top: 3px;
  }
}

</style>
