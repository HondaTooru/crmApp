<template>
  <div class="nobar">
    <div v-transfer-dom>
      <popup v-model="depart" :popup-style="{background: 'white'}" max-height="50%">
        <radio :options="deList" @on-change="select" v-model="part"></radio>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="deUser" :popup-style="{background: 'white'}" max-height="50%">
        <radio :options="deUlist" @on-change="selectu" v-model="ulist"></radio>
      </popup>
    </div>
    <tab v-model="tab" @on-before-index-change="switchTabItem" :line-width="1">
      <tab-item selected>跟进记录表</tab-item>
      <tab-item>销售漏斗表</tab-item>
    </tab>
    <div class="search vux-1px-b">
      <div class="content">
        <div class="left" @click="chooseType">
          <span>部门</span>
        </div>
        <div class="left" @click="getAdmin">
          <span>负责人</span>
        </div>
        <div class="right">
          <calendar title="" class="nob" v-model="date" placeholder="请选择时间范围" @on-change="selectDate"></calendar>
        </div>
      </div>
    </div>
    <div v-show="tab === 0">
      <column-list ref="clumns" :colum="col" @getItem="listdata"></column-list>
      <load-more tip="跟进详情" :show-loading="false" background-color="#fbf9fe"></load-more>
      <div class="table_w">
        <x-table :cell-bordered="false" class="table">
          <thead>
            <tr>
              <th>姓名</th>
              <th>部门</th>
              <th>总跟进次数</th>
              <th>跟进线索次数</th>
              <th>跟进客户次数</th>
              <th>跟进商机次数</th>
              <th>跟进合同次数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, m) in  tableItem" :key="m">
              <td>{{i.username}}</td>
              <td>{{i.sign_probability}}</td>
              <td>{{i.total_count}}</td>
              <td>{{i.lead_count}}</td>
              <td>{{i.customer_count}}</td>
              <td>{{i.opportunity_count}}</td>
              <td>{{i.contract_count}}</td>
            </tr>
            <tr v-if="!tableItem.length">
              <td colspan="6">暂无数据</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
    <div v-show="tab === 1">
    <funnel-list :options="opt" ref="funnel" @cellData="getData"></funnel-list>
    <group :gutter="0">
      <cell title="商机单数" v-model="infos.total_scount"></cell>
      <cell title="预计销售金额" :value="'¥'+infos.total_expected_sales_amount"></cell>
      <cell title="概率金额" v-model="'¥'+infos.total_calculate_sale_money"></cell>
    </group>
    <load-more tip="销售详情" :show-loading="false" background-color="#fbf9fe"></load-more>
    <div class="table_w">
      <x-table :cell-bordered="false" class="table">
     <thead>
       <tr>
         <th>销售阶段</th>
         <th>商机数</th>
         <th>预计销售金额</th>
         <th>概率金额</th>
         <th>签单几率</th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="(i, m) in  tableList" :key="m">
         <td>{{i.sales_phase}}</td>
         <td>{{i.sign_probability}}</td>
         <td>{{i.expected_sales_amount}}</td>
         <td>{{i.calculate_sale_money}}</td>
         <td>{{i.scount}}</td>
       </tr>
     </tbody>
   </x-table>
    </div>
  </div>
</div>
</template>

<script>
import FunnelList from './funnel'
import ColumnList from './column'
import { Radio, Popup, Calendar, XTable, LoadMore, Tab, TabItem, Sticky } from 'vux'
import { AllDepartmentApi, DepUser, AllAdminApi } from '@/api/api'

export default {
  name: 'datacenter',
  data () {
    return {
      opt: {
        title: true,
        type: 'all',
        man_dep: '',
        revisit_man: '',
        height: '260px'
      },
      col: {
        type: 'all',
        man_dep: '',
        revisit_man: ''
      },
      date: [],
      depart: false,
      deList: [],
      deUser: false,
      deUlist: [],
      infos: {},
      part: 0,
      ulist: 0,
      tableList: [],
      tab: 0,
      tableItem: []
    }
  },
  mounted () {
  },
  created () {
    this.$vux.bus.$on('getTypeList', msg => {
      this.opt.type = this.col.type = msg.name
      this.date = []
      this.$refs.clumns.SalesFunnelList(true)
      this.$refs.funnel.getSaleFunnel()
    })
  },
  beforeDestory () {
    this.$vux.bus.$off('getTypeList')
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
      let m = !value ? '' : value
      this.opt.man_dep = g
      this.col.man_dep = m
      this.$refs.funnel.getSaleFunnel()
      this.$refs.clumns.SalesFunnelList(true)
      this.depart = !this.depart
      this.deUlist = []
      value ? DepUser({revisit_man_dep: value}).then(res => { res.data.forEach(item => { this.deUlist.push({key: item.id, value: item.username}) }) }) : this.getAdmin(false)
      this.deUlist.unshift({key: 0, value: '全部'})
    },
    selectu (value, label) {
      let g = value ? label : ''
      let m = !value ? '' : value
      this.col.revisit_man = m
      this.opt.revisit_man = g
      this.$refs.funnel.getSaleFunnel()
      this.$refs.clumns.SalesFunnelList(true)
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
    selectDate (val) {
      if (this.date.length > 2) {
        this.date = []
        this.$vux.toast.show({ text: '请选择两个时间点的范围~', width: '14em' })
      } else {
        this.date.sort()
        this.opt.type = this.col.type = this.date.toString()
        this.$refs.clumns.SalesFunnelList(true)
        this.$refs.funnel.getSaleFunnel()
      }
    },
    getData (msg, list) {
      this.infos = msg
      this.tableList = list
    },
    switchTabItem () {
    },
    listdata (value) {
      this.tableItem = value
    }
  },
  components: {
    FunnelList,
    Radio,
    Popup,
    Calendar,
    XTable,
    LoadMore,
    Tab,
    TabItem,
    Sticky,
    ColumnList
  }
}
</script>

<style lang="less" scoped>
.search {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
  padding: 10px 0;
  position: relative;
  background-color:white;
  .content {
    display: flex;
    height: 100%;
    .left {
      min-width: 90px;
      text-align: center;
      position: relative;
      font-size: 14px;
      &:after{
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-right: 1px solid #C7C7C7;
        color: #C7C7C7;
        transform-origin: 100% 0;
        transform: scaleX(0.5);
      }
      &:before {
        content: '❯';
        position: absolute;
        color:#C7C7C7;
        right: 15px;
        transform: rotate(90deg);
      }
      span {
        width: 100%;
        display: block;
      }
    }
    .right {
      flex:1;
      padding:0 15px 0 30px;
      .nob {
        top: -10px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
         &::before {
           display: none;
         }
      }
    }
  }
}
.table_w {
  overflow-y: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  .table {
    background:white;
    font-size: 14px;
    thead {
      tr {background:#F7F7F7;
      th {
        min-width: 100px;
      }
      }
    }

  }
}
</style>
