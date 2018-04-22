<template>
  <swiper height="235px" dots-position="center" class="mswiper">
    <swiper-item>
      <div class="title vux-1px-b">
        <span class="select"><popup-picker :data="list" v-model="value"></popup-picker></span>业绩目标</div>
      <div class="main aim">
        <h2>赢单商业金额</h2>
        <div class="content">
            <div>
              <div class="circle">
                <x-circle :percent="80" :stroke-width="6" :trail-width="6" :stroke-color="['#36D1DC', '#5B86E5']" trail-color="#ececec">
                  <span :style="{color: strokeColor}">{{percent}}%</span>
                </x-circle>
              </div>
            </div>
            <div>
              <dl class="dsc">
                <dt>目标</dt>
                <dd><span>&yen;</span>0</dd>
                <dt>已完成</dt>
                <dd><span>&yen;</span>0</dd>
              </dl>
            </div>
        </div>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="title vux-1px-b">
        <span class="select"><popup-picker :data="list" v-model="value"></popup-picker></span>销售业绩</div>
        <div class="main list">
           <flexbox orient="vertical" :gutter="15">
             <flexbox-item>
               <flexbox>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-usd dollar" aria-hidden="true"></i></div>
                     <div><p class="text">赢单商机总金额</p><p class="dollar"><span>&yen;</span>0</p></div>
                   </div>
                 </flexbox-item>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-usd dollar" aria-hidden="true"></i></div>
                     <div><p class="text">赢单商机总单数</p><p class="dollar">0</p></div>
                   </div>
                 </flexbox-item>
               </flexbox>
             </flexbox-item>
             <flexbox-item>
               <flexbox>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-usd dollar" aria-hidden="true"></i></div>
                     <div><p class="text">赢单商机单价</p><p class="dollar"><span>&yen;</span>0</p></div>
                   </div>
                 </flexbox-item>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-briefcase backage" aria-hidden="true"></i></div>
                     <div><p class="text">合同总金额</p><p class="dollar"><span>&yen;</span>0</p></div>
                   </div>
                 </flexbox-item>
               </flexbox>
             </flexbox-item>
             <flexbox-item>
               <flexbox>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-briefcase backage" aria-hidden="true"></i></div>
                     <div><p class="text">计划回款</p><p class="dollar"><span>&yen;</span>0</p></div>
                   </div>
                 </flexbox-item>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-briefcase backage" aria-hidden="true"></i></div>
                     <div><p class="text">实际回款</p><p class="dollar"><span>&yen;</span>0</p></div>
                   </div>
                 </flexbox-item>
               </flexbox>
             </flexbox-item>
           </flexbox>
        </div>
    </swiper-item>
    <swiper-item>
      <div class="title vux-1px-b">
      <span class="select"><popup-picker :data="list" v-model="value"></popup-picker></span>销售执行力</div>
      <div class="main list">
         <flexbox orient="vertical" :gutter="15">
           <flexbox-item>
             <flexbox>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-pencil pencil" aria-hidden="true"></i></div>
                   <div><p class="text">总跟进数</p><p class="dollar">74</p></div>
                 </div>
               </flexbox-item>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-map-marker marker" aria-hidden="true"></i></div>
                   <div><p class="text">拜访签到数</p><p class="dollar">14</p></div>
                 </div>
               </flexbox-item>
             </flexbox>
           </flexbox-item>
           <flexbox-item>
             <flexbox>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-life-saver dollar" aria-hidden="true"></i></div>
                   <div><p class="text">新增线索数</p><p class="dollar"><span>&yen;</span>10</p></div>
                 </div>
               </flexbox-item>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-user-md user usermd" aria-hidden="true"></i></div>
                   <div><p class="text">新增客户数</p><p class="dollar"><span>&yen;</span>27</p></div>
                 </div>
               </flexbox-item>
             </flexbox>
           </flexbox-item>
           <flexbox-item>
             <flexbox>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-dollar mon" aria-hidden="true"></i></div>
                   <div><p class="text">新增商机数</p><p class="dollar"><span>&yen;</span>17</p></div>
                 </div>
               </flexbox-item>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-handshake-o backage handshake" aria-hidden="true"></i></div>
                   <div><p class="text">新增合同数</p><p class="dollar"><span>&yen;</span>11</p></div>
                 </div>
               </flexbox-item>
             </flexbox>
           </flexbox-item>
         </flexbox>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="title vux-1px-b">
        <span class="select"><popup-picker :data="list" v-model="value"></popup-picker></span>销售形势预测</div>
      <div class="main shaped">
        <flexbox>
          <flexbox-item :span="8">
            <div class="sha-content">
            <div class="sha sha0"><span>电话沟通</span></div>
            <div class="sha sha1"><span>邀约到园</span></div>
            <div class="sha sha2"><span>卖体验卡</span></div>
            <div class="sha sha3"><span>试听一</span></div>
            <div class="sha sha4"><span>试听二</span></div>
            <div class="sha sha5"><span>试听三</span></div>
            <div class="sha sha6"><span>...</span></div>
          </div>
          </flexbox-item>
          <flexbox-item :span="4">
            <ul class="sha-list">
              <li><span>4单</span><span>&yen;</span>50000</li>
              <li><span>11单</span><span>&yen;</span>50000</li>
              <li><span>0单</span><span>&yen;</span>50000</li>
              <li><span>0单</span><span>&yen;</span>50000</li>
              <li><span>0单</span><span>&yen;</span>50000</li>
              <li><span>0单</span><span>&yen;</span>50000</li>
              <li>...</li>
            </ul>
          </flexbox-item>
        </flexbox>
      </div>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem, PopupPicker, XCircle, Flexbox, FlexboxItem } from 'vux'
export default {
  name: 'mswiper',
  components: {
    Swiper,
    SwiperItem,
    PopupPicker,
    XCircle,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      value: ['本月'],
      list: [['本月', '上个月', '本季', '上季', '今年', '去年']],
      percent: 30,
      strokeColor: '#3FC7FA'
    }
  }
}
</script>

<style lang="less" scoped>
@sha0: #7f91e8;
@sha1: #87a987;
@sha2: #84d2c7;
@sha3: #f16b0b;
@sha4: #eab69e;
@sha5: #38779c;
@sha6: #5f6362;
.mswiper{
  .title{
    padding-left: 15px;
    font-size: 14px;
    height: 35px;
    line-height: 40px;
    span.select{
      display: block;
      width: auto;
      float: right;
      height: 100%;
      position: relative;
      line-height: 1.2;
      &::before {
        content: '';
        position: absolute;
        bottom:1px;
        left:0;
        width:100%;
        border-bottom:2px solid #1cb0f1
      }
    }
  }
  .main {
    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    bottom: 28px;
    &.aim {
      display: flex;
      flex-direction:column;
      box-orient:vertical;
      h2{
      font-size: 16px;
      text-align: center;
      font-weight: 400;
      padding: 8px 0;
      }
      .content{
        width: 100%;
        height: 100%;
        display: flex;
        &>div{
          flex: 1;
          .circle{
            width: 75%;
            padding-left: 12%
          }
          .dsc{
            padding:15px 0 0 20px;
            dd{
              span {
                padding-right: 5px
              }
              &:nth-of-type(2) {
                color:#1cb0f1;
              }
            }
            dt,dd {
              height: 25px;
              line-height: 25px;
              font-size: 16px;
            }
            dt{
              font-size: 12px;
              color:#7c7c7c
            }
          }
        }
      }
    }
    &.list {
      padding: 15px;
      .list-block{
        display: flex;
        &>div{
          &:nth-of-type(1){
            width: 30px;
            display: flex;
            align-items:center;
            .fa {
              font-size:18px;
              &.dollar, &.backage{
              width:20px;
              height:20px;
              background:none;
              text-align: center;
              line-height: 20px;
              font-size: 18px;
              color:#1cb0f1
              }
              &.dollar {
              border-radius: 50%;
              font-size:12px;
              color:#dc67d7;
              border:1px solid #dc67d7;
              }
              &.pencil {
                color:#60b74b;
              }
              &.marker {
                color:#1f9cda
              }
              &.usermd {
                color:#d67106;
              }
              &.mon {
                color: #7c7c7c;
                font-size: 16px
              }
              &.handshake {
                color: #b75050;
                font-size: 16px
              }
            }
          }
          &:nth-of-type(2) {
            flex: 1;
            p.text {color:#7c7c7c;font-size:12px}
            p.dollar {font-size:14px; span{padding-right: 5px}}
          }
        }
      }
    }
    &.shaped {
      .sha-content{
        display: flex;
        flex-direction: column;
        padding:10px 0 0 15px;
      .sha {
            width:180px;
            height:0;
            border-top: 20px solid @sha0;
            border-right: 10px solid transparent;
            border-left:10px solid transparent;
            position: relative;
            text-align: center;
            margin-bottom: 5px;
            span {
              position: relative;
              top:-24px;
              font-size: 12px;
              color:white;
            }
            &.sha0 {
              border-top-color:@sha0
            }
            &.sha1 {
              width: 160px;
              left: 10px;
              border-top-color:@sha1;
            }
            &.sha2 {
              width: 140px;
              left: 20px;
              border-top-color:@sha2;
            }
            &.sha3 {
              width: 120px;
              left: 30px;
              border-top-color:@sha3;
            }
            &.sha4 {
              width: 100px;
              left: 40px;
              border-top-color:@sha4;
            }
            &.sha5 {
              width: 80px;
              left: 50px;
              border-top-color:@sha5;
            }
            &.sha6 {
              width: 60px;
              left: 60px;
              border-top-color:@sha6;
            }
        }
      }
      .sha-list {
        list-style: none;
        font-size: 12px;
        color:#7c7c7c;
        padding-left: 15px;
        padding-top: 8px;
        li{
          height: 20px;
          line-height: 20px;
          margin-bottom: 5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          position: relative;
          padding-left: 20px;
          &:nth-of-type(2) {
            &::before {
              background:@sha1;
            }
          }
          &:nth-of-type(3) {
            &::before {
              background:@sha2;
            }
          }
          &:nth-of-type(4) {
            &::before {
              background:@sha3;
            }
          }
          &:nth-of-type(5) {
            &::before {
              background:@sha4;
            }
          }
          &:nth-of-type(6) {
            &::before {
              background:@sha5;
            }
          }
          &:nth-of-type(7) {
            &::before {
              background:@sha6;
            }
          }
          &::before{
            content: '';
            position: absolute;
            left:0;
            top:2px;
            width:15px;
            height: 15px;
            background:@sha0;
          }
          span:nth-of-type(1) {
            display:inline-block;
            padding-right: 5px;
          }
        }
      }
    }
  }
}
</style>
