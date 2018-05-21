<template>
  <popup v-model="sett" position="bottom" should-scroll-top-on-show :show-mask="false" class="config">
      <div class="container">
        <div class="content">
          <swiper height="100%" dots-position="center" class="list-item">
            <swiper-item v-for="m in 2" :key="m">
              <div class="box">
                <div class="item" v-for="i in 3" :key="i">
                  <div class="item-wrap" v-for="x in 2" :key="x">
                    <div class="wrap">
                      <div class="icon icon-1"><i class="fa fa-calendar-minus-o" aria-hidden="true"></i></div>
                      <div class="text">写周报</div>
                     </div>
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
      setter: false
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
