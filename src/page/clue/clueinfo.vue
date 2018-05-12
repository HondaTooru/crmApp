<template>
  <detail-content :ax="name">
    <div slot="detail" slot-scope="item" class="content">
      <div v-transfer-dom>
        <popup v-model="k" max-height="50%">
          <group :gutter="0">
            <radio :options="status" @on-change="select"></radio>
          </group>
        </popup>
      </div>
      <router-link :to="'/cluedit/' + $route.params.id" tag="div" class="title">
        <div class="mm">
          <p class="user"><i class="fa fa-user" aria-hidden="true"></i>{{item.detail.body.username}}</p>
          <p class="dsc">{{item.detail.body.company}}</p>
        </div>
        <div class="tag">
          <x-icon type="ios-arrow-forward" size="20" fill="white"></x-icon>
        </div>
      </router-link>
      <div class="opt">
        <div class="list" @click="getStatus">
          <div class="name" ref="status">{{item.detail.body.status}}</div>
          <div class="tag"><x-icon type="ios-arrow-forward" size="16" fill="white"></x-icon></div>
        </div>
        <router-link :to="'/task/' + $route.params.id" tag="div" class="list">
          <div class="name">任务</div>
          <div class="tag"><x-icon type="ios-arrow-forward" size="16" fill="white"></x-icon></div>
        </router-link>
      </div>
      <div class="section">
        <router-link :to="'/allrevisit/' + $route.params.id" tag="h2">
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
        <router-link :to="{ name: '', params: {} }" tag="h2">
          <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>销售团队
        </router-link>
        <group :gutter="0" label-width="5em">
          <cell title="所属部门" :value="item.detail.sale_team.department"></cell>
          <cell title="负责人" :value="item.detail.sale_team.fuzeren"></cell>
        </group>
      </div>
      <div class="caidan">
        <router-link :to="{ name: '', params: {} }" tag="div" class="item"><i class="fa fa-pencil" aria-hidden="true"></i>写跟进</router-link>
        <div class="item"><i class="fa fa-phone" aria-hidden="true"></i>电话</div>
      </div>
    </div>
  </detail-content>
</template>

<script>
import DetailContent from '@/page/common/detail'
import { RevisitApi, AllStatusApi, CludEdit, ERR_OK } from '@/api/api'
import { Popup, Radio } from 'vux'

export default {
  name: 'clueinfo',
  data () {
    return {
      k: false,
      name: 'clue',
      rList: null,
      len: 0,
      status: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      RevisitApi({row_id: this.$route.params.id, record_type: 'lead'}).then(res => {
        this.rList = res.data[0]
        this.len = res.data.length
        localStorage.setItem('REVISIT_ALL', JSON.stringify(res.data))
      })
    },
    getStatus () {
      if (!this.status.length) {
        AllStatusApi().then(res => {
          if (ERR_OK === res.code) {
            this.k = !this.k
            res.data.forEach(item => {
              this.status.push({key: item.id, value: item.name})
            })
          }
        })
      } else {
        this.k = !this.k
      }
    },
    select (n, m) {
      this.$refs.status.innerText = m
      this.k = !this.k
      CludEdit({row_id: this.$route.params.id, status: m}).then(res => {
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
  padding-bottom: 50px;
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
  }
  .caidan {
    width: 40px;
    height: 40px;
    bottom: 0;
    width: 100%;
    left: 0;
    opacity: 1;
    position: fixed;
    z-index: 99;
    overflow: hidden;
    display: flex;
    .item {
      background:#da6464;
      flex:1;
      text-align: center;
      line-height: 40px;
      &:nth-of-type(2){
        background:#676666;
        margin-left: 10px
      }
    }
  }
}
</style>
