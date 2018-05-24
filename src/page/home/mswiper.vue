<template>
  <swiper height="235px" dots-position="center" class="mswiper">
    <div v-transfer-dom>
      <popup v-model="depart" :popup-style="{background: 'white'}" max-height="50%">
        <radio :options="deList" @on-change="select"></radio>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="deUser" :popup-style="{background: 'white'}" max-height="50%">
        <radio :options="deUlist" @on-change="selectu"></radio>
      </popup>
    </div>
    <swiper-item>
      <div class="title vux-1px-b">
        <span class="select"><popup-picker :data="list" v-model="value" @on-change="getTagList"></popup-picker></span><span>业绩目标</span><span class="select mn"><popup-picker :data="list_" v-model="value_" @on-change="selectList" :columns="1" show-name></popup-picker></span></div>
      <div class="main aim">
        <div class="content">
            <div>
              <div class="circle" v-if="slideDate">
                <x-circle :percent="Number(Math.min(100,percent))" :stroke-width="6" :trail-width="6" :stroke-color="['#36D1DC', '#5B86E5']" trail-color="#ececec">
                  <span :style="{color: strokeColor}">{{percent}}%</span>
                </x-circle>
              </div>
            </div>
            <div>
              <dl class="dsc" v-if="slideDate">
                <dt>目标</dt>
                <dd><span>&yen;</span>{{slideDate.tag || 0}}</dd>
                <dt>已完成</dt>
                <dd><span>&yen;</span>{{slideDate.finish || 0}}</dd>
              </dl>
            </div>
        </div>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="title vux-1px-b">
        <span class="select"><popup-picker :data="list2" v-model="value2" @on-change="om"></popup-picker></span><span class="isme" @click="lookme"><i class="fa" :class="{'fa-check-square-o': check, 'fa-check-square': !check}" aria-hidden="true"></i>只看自己</span>销售简报</div>
        <div class="main list" v-if="infos">
           <flexbox orient="vertical" :gutter="15">
             <flexbox-item>
               <flexbox>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-handshake-o" aria-hidden="true"></i></div>
                     <div><p class="text">合同数</p><p class="dollar"><span></span>{{infos.contract.count}}</p></div>
                   </div>
                 </flexbox-item>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-usd dollar" aria-hidden="true"></i></div>
                     <div><p class="text">合同总金额</p><p class="dollar"><span>&yen;</span>{{infos.contract.amount}}</p></div>
                   </div>
                 </flexbox-item>
               </flexbox>
             </flexbox-item>
             <flexbox-item>
               <flexbox>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-usd dollar" aria-hidden="true"></i></div>
                     <div><p class="text">已回款金额</p><p class="dollar"><span>&yen;</span>{{infos.contract.back_money}}</p></div>
                   </div>
                 </flexbox-item>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-crosshairs clue" aria-hidden="true"></i></div>
                     <div><p class="text">线索数</p><p class="dollar">{{infos.newadd.clue_count}}</p></div>
                   </div>
                 </flexbox-item>
               </flexbox>
             </flexbox-item>
             <flexbox-item>
               <flexbox>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-users backage" aria-hidden="true"></i></div>
                     <div><p class="text">客户数</p><p class="dollar">{{infos.newadd.customer_count}}</p></div>
                   </div>
                 </flexbox-item>
                 <flexbox-item>
                   <div class="list-block">
                     <div><i class="fa fa-briefcase backage" aria-hidden="true"></i></div>
                     <div><p class="text">商机数</p><p class="dollar">{{infos.newadd.oppo_count}}</p></div>
                   </div>
                 </flexbox-item>
               </flexbox>
             </flexbox-item>
           </flexbox>
        </div>
    </swiper-item>
    <swiper-item>
      <div class="title vux-1px-b">
      <span class="select"><popup-picker :data="list2" v-model="value2"></popup-picker></span><span class="isme" @click="lookme"><i class="fa" :class="{'fa-check-square-o': check, 'fa-check-square': !check}" aria-hidden="true"></i>只看自己</span>销售简报</div>
      <div class="main list" v-if="infos">
         <flexbox orient="vertical" :gutter="15">
           <flexbox-item>
             <flexbox>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-pencil pencil" aria-hidden="true"></i></div>
                   <div><p class="text">预测签单数</p><p class="dollar">{{infos.yuce.sign_count}}</p></div>
                 </div>
               </flexbox-item>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-usd dollar" aria-hidden="true"></i></div>
                   <div><p class="text">预计签单金额</p><p class="dollar"><span>&yen;</span>{{infos.yuce.sign_amount}}</p></div>
                 </div>
               </flexbox-item>
             </flexbox>
           </flexbox-item>
           <flexbox-item>
             <flexbox>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-usd dollar" aria-hidden="true"></i></div>
                   <div><p class="text">计划回款金额</p><p class="dollar"><span>&yen;</span>{{infos.yuce.plan_back_money}}</p></div>
                 </div>
               </flexbox-item>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-pencil-square-o user usermd" aria-hidden="true"></i></div>
                   <div><p class="text">写跟进次数</p><p class="dollar">{{infos.visit.visit_count}}</p></div>
                 </div>
               </flexbox-item>
             </flexbox>
           </flexbox-item>
           <flexbox-item>
             <flexbox>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-comments-o mon" aria-hidden="true"></i></div>
                   <div><p class="text">拜访面谈次数</p><p class="dollar">{{infos.visit.bai_count}}</p></div>
                 </div>
               </flexbox-item>
               <flexbox-item>
                 <div class="list-block">
                   <div><i class="fa fa-phone backage handshake" aria-hidden="true"></i></div>
                   <div><p class="text">电话跟进次数</p><p class="dollar">{{infos.visit.phone_count}}</p></div>
                 </div>
               </flexbox-item>
             </flexbox>
           </flexbox-item>
         </flexbox>
      </div>
    </swiper-item>
    <swiper-item>
      <div class="title vux-1px-b">
        <div class="content">
        <div class="left" @click="chooseType">
          <span>部门</span>
        </div>
        <div class="left" @click="getAdmin">
          <span>负责人</span>
        </div>
      </div>
        销售漏斗</div>
      <div class="main shaped">
        <funnel-list :options="opt" ref="funnel"></funnel-list>
      </div>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem, PopupPicker, XCircle, Flexbox, FlexboxItem, Popup, Radio } from 'vux'
import { AllDepartmentApi, DepUser, AllAdminApi, SlideApi, SaleReport, ERR_OK } from '@/api/api'
import FunnelList from '@/page/mywork/funnel'

export default {
  name: 'mswiper',
  components: {
    Swiper,
    SwiperItem,
    PopupPicker,
    XCircle,
    Flexbox,
    FlexboxItem,
    FunnelList,
    Popup,
    Radio
  },
  data () {
    return {
      opt: {
        title: false,
        type: 'all',
        man_dep: '',
        revisit_man: '',
        height: '190px'
      },
      depart: false,
      deList: [],
      deUser: false,
      deUlist: [],
      value: ['本月'],
      value2: ['本月'],
      value_: ['1'],
      list_: [{value: '1', name: '赢单商机金额'}, {value: '2', name: '合同数'}],
      list: [['本月', '上个月', '本季', '上季', '今年', '去年']],
      list2: [['本月', '上个月', '本季', '上季', '今年', '去年']],
      transformText: ['month', 'last month', 'three month', 'last three month', 'year', 'last year'],
      slideDate: null,
      strokeColor: '#3FC7FA',
      data: {
        is_own: 0,
        module: 1,
        time_str: ''
      },
      params: {
        is_own: 0,
        time_str: 'month'
      },
      infos: null,
      check: true
    }
  },
  created () {
    this.getTagList()
    this.om()
  },
  mounted () {
  },
  methods: {
    chooseType () {
      if (!this.deList.length) {
        AllDepartmentApi().then(res => {
          res.data.forEach(item => { this.deList.push({key: item.id, value: item.name}) })
          this.deList.unshift({key: 0, value: '全部'})
          this.depart = !this.depart
        })
      } else { this.depart = !this.depart }
    },
    select (value, label) {
      let g = value ? label : ''
      this.opt.man_dep = g
      this.$refs.funnel.getSaleFunnel()
      this.depart = !this.depart
      this.deUlist = []
      value ? DepUser({revisit_man_dep: value}).then(res => { res.data.forEach(item => { this.deUlist.push({key: item.id, value: item.username}) }) }) : this.getAdmin(false)
      this.deUlist.unshift({key: 0, value: '全部'})
    },
    selectu (value, label) {
      let g = value ? label : ''
      this.opt.revisit_man = g
      this.$refs.funnel.getSaleFunnel()
      this.deUser = !this.deUser
    },
    getAdmin (flag) {
      flag = typeof flag === 'undefined' ? true : flag
      if (!this.deUlist.length) {
        AllAdminApi().then(res => {
          res.data.forEach(item => { this.deUlist.push({key: item.id, value: item.username}) })
          if (flag) {
            this.deUser = !this.deUser
            this.deUlist.unshift({key: 0, value: '全部'})
          }
        })
      } else { this.deUser = !this.deUser }
    },
    getTagList () {
      this.data.time_str = this.cuurentDate
      SlideApi(this.data).then(res => {
        if (res.code === ERR_OK) {
          this.slideDate = res.data
        } else {
          this.$vux.toast.show({
            text: res.msg
          })
        }
      })
    },
    selectList (value, label) {
      this.data.module = value.toString()
      this.getTagList()
    },
    om () {
      let n = this.transformText[this.list2[0].indexOf(this.value2[0])]
      this.params.time_str = n
      SaleReport(this.params).then(res => {
        this.infos = res.data
      })
    },
    lookme () {
      this.params.is_own === 0 ? this.params.is_own = 1 : this.params.is_own = 0
      this.check = !this.check
      this.om()
    }
  },
  computed: {
    cuurentDate () {
      return this.transformText[this.list[0].indexOf(this.value[0])]
    },
    percent () {
      return (((this.slideDate.finish || 0) / (this.slideDate.tag || 0)).toFixed(1))
    }
  }
}
</script>

<style lang="less" scoped>
.mswiper{
  .title{
    padding-left: 15px;
    font-size: 14px;
    height: 35px;
    line-height: 40px;
    span{
      &.select{
          display: block;
          width: auto;
          float: right;
          height: 100%;
          position: relative;
          line-height: 1.2;
          &::before {
            content: '';
            position: absolute;
            bottom: 1px;
            left:0;
            width:100%;
            border-bottom:2px solid #1cb0f1
          }
          &.mn {
            margin-right: 15px
          }
       }
      &.isme {
        margin:0 15px;
        float:right;
        display: block;
        height: 100%;
        color:#35495e;
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
          position:relative;
          .circle{
            width: 75%;
            max-width: 160px;
            top:50%;
            left: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
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
  }
  .content {
    display: flex;
    float:right;
    height: 100%;
    .left {
      min-width: 90px;
      text-align: center;
      position: relative;
      font-size: 14px;
      &:nth-of-type(2) {
        margin-left: 15px
      }
      &:after{
        content: '';
        position: absolute;
        bottom: 1px;
        left: 0;
        width: 100%;
        border-bottom: 2px solid #1cb0f1;
      }
      &:before {
        content: '❯';
        position: absolute;
        color:#C7C7C7;
        right: 15px;
      }
      span {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
