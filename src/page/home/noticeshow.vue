<template>
  <div class="nobar">
    <div class="content" v-if="infos">
        <div class="title vux-1px-b">
          <p>{{infos.title}}</p>
          <p>{{infos.create_time}}</p>
        </div>
        <div class="infos" v-html="infos.content">
        </div>
    </div>
  </div>
</template>

<script>
import { NoticeShow } from '@/api/api'

export default {
  name: 'noticeshow',
  data () {
    return {
      infos: ''
    }
  },
  created () {
    this.getInfos()
  },
  methods: {
    getInfos () {
      NoticeShow({nid: this.$route.params.id}).then(res => { this.infos = res.data })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  margin: 0 15px;
  .fa {margin-right: 5px;}
  .title{
    text-align: center;
    padding: 20px 0 0 0;
    p:nth-of-type(1) {
      font-size: 16px;
    }
    p:nth-of-type(2) {
      font-size: 14px;
      padding-top: 10px;
      padding-bottom: 10px

    }
  }
  .infos {
    padding-top: 15px;
  }
}
</style>
