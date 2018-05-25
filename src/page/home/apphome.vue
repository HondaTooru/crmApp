<template>
  <div class="crm">
      <section><m-swiper :info="tagList"></m-swiper></section>
      <section><m-sale></m-sale></section>
      <section><m-work></m-work></section>
      <section><m-schedule></m-schedule></section>
  </div>
</template>

<script>
import MSwiper from './mswiper'
import MWork from './mwork'
import MSchedule from './mschedule'
import MSale from './msale'
let conn = ''
let USER = JSON.parse(localStorage.getItem('crm_user_data'))
export default {
  name: 'apphome',
  data () {
    return {
      tagList: null,
      message: '',
      plus: null
    }
  },
  created () {
    this.plusLoad()
  },
  methods: {
    plusLoad () {
      // console.log(1)
      document.addEventListener('plusready', () => {
        this.plus = plus
        // plus.push.createMessage('content-2')
        this.connWebIM()
        plus.push.addEventListener('click', msg => {
          console.log(msg)
          this.$router.push('/notifications/')
          // let tip = JSON.parse(msg.payload)
          // if (tip.msg_type === 'lead') { this.$router.push('/clueinfo/' + tip.row_id) }
          // if (tip.msg_type === 'customer') { this.$router.push('/CustomerInfo/' + tip.row_id) }
          // if (tip.msg_type === 'opportunity') {}
        })
      })
    },
    connWebIM () {
      let _that = this
      conn = new WebIM.connection({
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
        https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
        url: WebIM.config.xmppURL,
        heartBeatWait: WebIM.config.heartBeatWait,
        autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
        autoReconnectInterval: WebIM.config.autoReconnectInterval,
        apiUrl: WebIM.config.apiURL,
        isAutoLogin: true
      })
      let options = {
        apiUrl: WebIM.config.apiURL,
        user: USER.id,
        pwd: '888888',
        appKey: WebIM.config.appkey
      }
      conn.open(options)
      setTimeout(() => { conn.setPresence() }, 3000)
      conn.listen({
        onOpened: function (msg) {
          console.log('进入函数: onOpened')
          conn.setPresence()
          // _that.plus.push.createMessage('content-3')
        },
        onTextMessage: function (msg) {
          //  console.log(msg)
          // _that.$vux.toast.show({ text: msg.data })
          _that.plus.push.createMessage(msg.data, JSON.stringify(msg.ext.data), {title: 'CRM', sound: 'system'})
        }
      })
    }
  },
  components: {
    MSwiper,
    MWork,
    MSchedule,
    MSale
  }
}
</script>

<style lang="less" scoped>
    section{
      margin: 0 10px;
      background: white;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 10px;
  }
  .crm {background:#35495e}
</style>
