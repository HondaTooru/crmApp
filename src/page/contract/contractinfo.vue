<template>
  <detail-content :ax="m">
    <div slot="detail" slot-scope="item" class="content">
      <div v-transfer-dom>
        <popup v-model="k" max-height="50%">
          <group :gutter="0">
            <radio :options="status" @on-change="select"></radio>
          </group>
        </popup>
      </div>
      <router-link :to="'/contractaudited/' + $route.params.id" tag="div" class="title">
        <div class="mm">
          <p class="user"><i class="fa fa-handshake-o" aria-hidden="true"></i>{{item.detail.detail.body.title}}</p>
          <p class="dsc"><span class="vux-1px-r" style="padding-right:10px;margin-right:10px;">&yen;{{item.detail.detail.body.amount_money}}</span>
                         <span>{{item.detail.detail.body.sign_date}}</span>
          </p>
        </div>
        <div class="tag">
          <x-icon type="ios-arrow-forward" size="20" fill="white"></x-icon>
        </div>
      </router-link>
      <router-link :to="{ name: '', params: {} }" tag="div" class="customer vux-1px-b">
        <i class="fa fa-user" aria-hidden="true"></i>
        {{item.detail.detail.body.customer}}
      </router-link>
      <div class="opt">
        <div class="list" @click="getStatus">
          <div class="name" ref="status">{{item.detail.detail.body.pi_status}}</div>
          <div class="tag"><x-icon type="ios-arrow-forward" size="16" fill="white"></x-icon></div>
        </div>
        <router-link :to="'/task/' + $route.params.id + '/contract'" tag="div" class="list">
          <div class="name">任务</div>
          <div class="tag"><x-icon type="ios-arrow-forward" size="16" fill="white"></x-icon></div>
        </router-link>
      </div>
      <div class="section">
        <router-link :to="'/allrevisit/' + $route.params.id + '/contract'" tag="h2">
          <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>跟进记录({{len}})
        </router-link>
        <group :gutter="0">
          <cell v-if="rList">
            <img slot="icon" class="avatar" :src="rList.avatar">
            <div slot="title">{{rList.username}} <x-icon type="ios-arrow-right" size="16" fill="#35495e" style="position:relative;top:4px"></x-icon> {{rList.revisit_way}}</div>
          </cell>
          <div class="nodata" v-if="!rList">
            暂无跟进记录
          </div>
        </group>
      </div>
      <div class="section top">
        <router-link to="/plan" tag="h2">
          <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>回款计划(0)
        </router-link>
        <group :gutter="0">
          <div class="payment">
            <div class="jk">
              <div class="icon"><span class="img"><i class="fa fa-usd" aria-hidden="true"></i></span></div>
              <div class="data">
                <p class="text">本月计划回款</p>
                <p class="now_mo">&yen;0.00</p>
              </div>
            </div>
            <div class="jk">
              <div class="icon"><span class="img"><i class="fa fa-usd" aria-hidden="true"></i></span></div>
              <div class="data">
                <p class="text">本月回款</p>
                <p class="now_mo">&yen;0.00</p>
              </div>
            </div>
            <div class="jk">
              <div class="icon"><span class="img"><i class="fa fa-usd" aria-hidden="true"></i></span></div>
              <div class="data">
                <p class="text">总已回款</p>
                <p class="now_mo">&yen;0.00</p>
              </div>
            </div>
            <div class="jk">
              <div class="icon"><span class="img"><i class="fa fa-usd" aria-hidden="true"></i></span></div>
              <div class="data">
                <p class="text">总未回款</p>
                <p class="now_mo">&yen;0.00</p>
              </div>
            </div>
          </div>
        </group>
      </div>
      <div class="section top">
        <router-link :to="{}" tag="h2">
          <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>合同
        </router-link>
        <group :gutter="0">
          <div class="nodata">
            暂无合同记录
          </div>
        </group>
      </div>
      <div class="section top">
        <router-link :to="{}" tag="h2">
          <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>联系人
        </router-link>
        <group :gutter="0">
          <div class="nodata">
            暂无联系人记录
          </div>
        </group>
      </div>
      <div class="section top">
        <h2>其他信息</h2>
        <group :gutter="0">
        <div class="other">
          <router-link :to="'/clueattchment/'+ $route.params.id" tag="div" class="om vux-1px-r">
            <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
            <p class="text">附件</p>
            <p class="len">0个</p>
          </router-link>
          <router-link :to="'/log/customer/'+ $route.params.id" tag="div" class="om">
            <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
            <p class="text">操作日志</p>
            <p class="len">0条</p>
          </router-link>
        </div>
        </group>
      </div>
    </div>
    <div class="caidan" slot="toolbar" slot-scope="item" v-if="item.detail">
      <router-link :to="'/writecontract/' + $route.params.id" tag="div" class="item">
        <span class="icon"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
        <span class="text">写跟进</span>
      </router-link>
    </div>
  </detail-content>
</template>

<script>
import DetailContent from '@/page/common/detail'
import { ContractStatusApi, SingleEditSave, RevisitApi, PaymentIndex, ERR_OK } from '@/api/api'
import { Popup, Radio } from 'vux'
// RevisitApi
export default {
  name: 'contractinfo',
  data () {
    return {
      k: false,
      m: {
        name: 'contract',
        flag: true
      },
      listPayment: [],
      params: {
        field: 'title',
        keyword: ''
      },
      rList: null,
      len: 0,
      status: [],
      money: {
        plan_back_money: 0,
        back_money: 0
      }
    }
  },
  created () {
    this.getList()
    // this.getPayment()
  },
  methods: {
    getList () {
      RevisitApi({row_id: this.$route.params.id, record_type: this.m.name}).then(res => {
        this.rList = res.data[0]
        this.len = res.data.length
        localStorage.setItem('REVISIT_ALL', JSON.stringify(res.data))
      })
    },
    getStatus () {
      if (!this.status.length) {
        ContractStatusApi().then(res => {
          if (ERR_OK === res.code) {
            this.k = !this.k
            res.data.forEach(item => {
              this.status.push({key: item.id, value: item.showname})
            })
          }
        })
      } else {
        this.k = !this.k
      }
    },
    getPayment () {
      PaymentIndex(this.params).then(res => {
        console.log(res)
      })
    },
    select (n, m) {
      this.$refs.status.innerText = m
      this.k = !this.k
      SingleEditSave({row_id: this.$route.params.id, field_data: JSON.stringify([{name: 'status', value: m}])}).then(res => {
        console.log(res)
      })
    }
  },
  components: {
    DetailContent,
    Popup,
    Radio
  }
}
</script>

<style lang="less" scoped>
.content {
  font-size: 16px;
  position:relative;
  padding-bottom: 10px;
  .title {
    position: relative;
    padding: 10px 15px;
    .mm {
      p {
        line-height: 25px;
        &.dsc{
          font-size: 14px
        }
        &.user {
          color:#10aeff
        }
      }
    }
    .tag {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:after, &:before{
      position: absolute;
      content: " ";
      left: 0;
      bottom: 0;
      right: 0;
      border-top: 1px solid #8c8b8b;
      color: #8c8b8b;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
    &:before {
      top: 0
    }
  }
  .customer { padding: 10px 15px;}
  .opt {
    display: flex;
    padding: 0 15px;
    .list {
      flex: 1;
      position: relative;
      height: 40px;
      line-height: 40px;
      .tag {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &:nth-of-type(1) {
        margin-right: 10px;
        .tag {
          right: 10px;
        }
        &::before {
          position: absolute;
          content: " ";
          height: 100%;
          right: 0;
          border-right: 1px solid #8c8b8b;
          color: #8c8b8b;
          transform-origin: 0 0;
        }
      }
    }
  }
  .section {
    margin: 0 10px;
    background:white;
    border-radius: 5px;
    overflow: hidden;
    color:#35495e;
    &.top {margin-top: 15px}
    h2 {
      color: #35495e;
      font-size: 14px;
      padding: 10px 0 10px 15px;
      font-weight: normal;
      position: relative;
      .fa {
        position: absolute;
        top:50%;
        right:10px;
        font-size: 18px;
        transform: translateY(-50%);
      }
    }
    .avatar{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 8px;
    }
    .nodata{
      text-align: center;
      font-size: 14px;
      padding: 10px 0
    }
    .other {
      display: flex;
      .om {
        flex:1;
        position:relative;
        padding: 5px 15px;
        margin: 5px 0;
        .fa {
          position: absolute;top:50%;right:10px;
          transform: translateY(-50%);
        }
        p{
          line-height: 20px;
          &.len {font-size: 12px;color:#666}
        }
        &:after {
          position: absolute;
          content: '';
        }
      }
    }
    .payment {
      overflow: hidden;
      padding: 10px 15px;
      .jk {
        float:left;
        width: 50%;
        display: flex;
        padding: 5px 0;
        .icon {
          width: 35px;position: relative;
          .img {display: block;
            height: 25px;
            line-height: 25px;
            width: 25px;
            color:white;
            background:#ff5c5c;
            border-radius: 50%;
            text-align: center;
            font-size: 14px;
            position: absolute;
            top:50%;
            left: 50%;
            transform:translate(-50%, -50%);
            .fa {margin: 0}
          }
        }
        .data {
          flex: 1;
          p.text{ font-size: 12px;color:#666}
        }
      }
    }
  }
}
.caidan {
  width: 52px;
  height: 52px;
  bottom: 0;
  width: 100%;
  left: 0;
  opacity: 1;
  position: absolute;
  z-index: 99;
  overflow: hidden;
  display: flex;
  box-shadow: 1px 1px 20px 0px #35495e;
  border-top: 1px solid #6b6b6b;
  .item {
    background:#35495e;
    flex:1;
    text-align: center;
    a {color:#10aeff}
    span {
      display: block;
      &.icon{padding: 5px 0 0 0; .fa {font-size: 27px;margin:0}}
      &.text{ font-size: 10px}
    }
  }
}
</style>
