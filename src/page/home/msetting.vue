<template>
  <popup v-model="sett" position="bottom" should-scroll-top-on-show :show-mask="false" class="config">
      <div class="container">
        <div class="content">
          <swiper height="100%" dots-position="center" class="list-item">
            <swiper-item v-for="(m, i) in list" :key="i">
              <div class="box" :class="'box-'+ i">
                <div class="item" v-for="(n, a) in m" :key="a" :class="'item-'+ a">
                  <div class="item-wrap" v-for="(x, k) in n" :key="k">
                    <router-link :to="x.link" tag="div" class="wrap" @click.native="$store.commit('updateGobalSett', {gobalSett: false})">
                    <div class="icon"><i class="fa" :class="x.icon" aria-hidden="true"></i></div>
                    <div class="text">{{x.value}}</div>
                    </router-link>
                   </div>
                </div>
              </div>
            </swiper-item>
          </swiper>
        </div>
        <div class="btm">
          <div class="close" @click="$store.commit('updateGobalSett', {gobalSett: false})">
            <img src="../../assets/close.svg">
          </div>
        </div>
      </div>
  </popup>
</template>

<script>
import { Popup, Swiper, SwiperItem, ViewBox } from 'vux'
export default {
  name: 'msetting',
  props: {
    sett: Boolean
  },
  data () {
    return {
      setter: false,
      list: [
        [
          [{icon: 'fa-user', value: '新增客户', link: 'customerAdd'}, {icon: 'fa-crosshairs', value: '新增线索', link: 'clueAdd'}],
          [{icon: 'fa-address-book-o', link: 'contactAdd', value: '新增联系人'}, {icon: 'fa-usd', value: '新增商机', link: 'opportunityAdd'}],
          [{icon: 'fa-briefcase', value: '新增产品', link: 'productAdd'}, {icon: 'fa-search', value: '查重', link: '/checks/customer'}]
        ]
      ]
    }
  },
  mounted () {
  },
  components: {
    Popup,
    Swiper,
    SwiperItem,
    ViewBox
  }
}
</script>

<style lang="less" scoped>
.config {top: 44px;
background:#35495e !important;
}
.container{
  position: absolute;
  top:0;
  bottom: 0;
  background:transparent;
  width: 100%;
  display: flex;
  flex-direction: column;
  .list-item{
    height: 100%;
    .box {
      display: flex;
      flex-direction: column;
      height: 100%;
      .item {
        flex: 1;
        .item-wrap{
          width: 50%;
          float:left;
          height: 100%;
          position: relative;
          .wrap {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .icon,.text{text-align: center;color:white;}
            .text {font-size: 14px;padding-top: 5px;}
            .icon {
              font-size:35px;
              width:70px;
              height:70px;
              margin:0 auto;
              border-radius: 50%;
              line-height: 70px;
              padding: 5px;
              &.icon-1{background:orange;}
            }
          }
        }
      }
      &.box-0 {
        .item-0 {
          .item-wrap {
            .icon {background:#b77600}
            &:nth-of-type(2) { .icon {background:#659cad} }
          }
        }
        .item-1 {
          .item-wrap {
            .icon {background:#25a297}
            &:nth-of-type(2) { .icon {background:#934cab} }
          }
        }
        .item-2 {
          .item-wrap {
            .icon {background:#00a56f}
            &:nth-of-type(2) { .icon {background:linear-gradient(-45deg, #54b5e6, #9054a5)} }
          }
        }
      }
    }
  }
  .content {
    flex: 1;
  }
  .btm {
    height: 40px;
    background:transparent;
    width: 100%;
    color:white;
    position:relative;
    .close {
      position: absolute;
      left: 50%;
      top: 50%;
      transform:translate(-45%,-70%);
      width: 40px;
      height: 40px;
      img{width: 100%}
    }
  }
}
</style>
