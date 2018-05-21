<template>
   <div id="app">
     <div v-transfer-dom>
        <loading v-model="isLoading"></loading>
     </div>
     <div v-transfer-dom>
     <m-sett :sett="gobalSett"></m-sett>
   </div>
     <router-view></router-view>
   </div>
</template>

<script>
import { Loading } from 'vux'
import MSett from '@/page/home/msetting'
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState({
      isLoading: state => state.vux.isLoading,
      gobalSett: state => state.vux.gobalSett
    })
  },
  data () {
    return {
      plus: null,
      message: ''
    }
  },
  created () {
    // this.plusReady()
    // this.connWebIM()
  },
  components: {
    Loading,
    MSett
  },
  methods: {
    // plusReady () {
    //   var that = this
    //   // 监听plusready事件
    //   document.addEventListener('plusready', function () {
    //     // 扩展API加载完毕，现在可以正常调用扩展API
    //     // 获取客户端标识信息
    //     that.plus = plus
    //     that.connWebIM()  // var info = plus.push.getClientInfo();console.log( JSON.stringify( info ) );获取app的信息，appid等
    //     // 添加监听从系统消息中心点击消息启动事件
    //     plus.push.addEventListener('click', function (msg) {
    //     // 分析msg.payload处理业务逻辑
    //       console.log('You clicked:' + msg.content)
    //       console.log(msg)
    //       console.log(JSON.parse(msg.payload))
    //       var getMsg = JSON.parse(msg.payload)
    //       if (getMsg.msg_type === 'payment') {
    //         that.$router.push({path: '/record', query: {id: getMsg.row_id}})
    //       } else if (getMsg.msg_type === 'customer') {
    //         that.$router.push('/clientdetail/' + getMsg.row_id)
    //       } else if (getMsg.msg_type === 'clue') {
    //         that.$router.push('/cluedetail/' + getMsg.row_id)
    //       }
    //     }, false)
    //   })
    // },
    // connWebIM () {
    //   window.conn = new WebIM.connection ({
    //       isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    //       https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    //       url: WebIM.config.xmppURL,
    //       heartBeatWait: WebIM.config.heartBeatWait,
    //       autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    //       autoReconnectInterval: WebIM.config.autoReconnectInterval,
    //       apiUrl: WebIM.config.apiURL,
    //       isAutoLogin: true
    //   })
    //   console.log(conn)
    //   this.connListen()
    //   if (localStorage.getItem('uid')) {  //  登陆需要uid
    //     this.connect()
    //   }
    // },
    // //  消息处理回调
    // connListen () {
    //   var that = this
    //   conn.listen({
    //     onOpened: function (message) {  //  连接成功回调
    //           // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
    //           // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
    //           // 则无需调用conn.setPresence();
    //       console.log('登陆成功')
    //           //  conn.setPresence();
    //     },
    //     onClosed: function (message) {}, //  连接关闭回调
    //     onTextMessage: function (message) {
    //       that.plus.push.createMessage(message.data, JSON.stringify(message.ext.data), {title: 'CRM', sound: 'system'})//  本地推送消息
    //       that.message = message.ext.data
    //       console.log('接收消息成功')
    //     },    //  收到文本消息
    //     onEmojiMessage: function (message) {},   //  收到表情消息
    //     onPictureMessage: function (message) {}, //  收到图片消息
    //     onCmdMessage: function (message) {},    // 收到命令消息
    //     onAudioMessage: function (message) {},   //  收到音频消息
    //     onLocationMessage: function (message) {},  //  收到位置消息
    //     onFileMessage: function (message) {},    //  收到文件消息
    //     onVideoMessage: function (message) {}, //  收到视频消息
    //     onPresence: function (message) {},  //  处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    //     onRoster: function (message) {},         //  处理好友申请
    //     onInviteMessage: function (message) {},  //  处理群组邀请
    //     onOnline: function () {},                  //  本机网络连接成功
    //     onOffline: function () {},                 //  本机网络掉线
    //     onError: function (message) {},          //  失败回调
    //     onBlacklistUpdate: function (list) {       //  黑名单变动
    //         // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
    //       console.log(list)
    //     },
    //     onReceivedMessage: function (message) {},    //  收到消息送达服务器回执
    //     onDeliveredMessage: function (message) {},   //  收到消息送达客户端回执
    //     onReadMessage: function (message) {},        //  收到消息已读回执
    //     onCreateGroup: function (message) {},        //  创建群组成功回执（需调用createGroupNew）
    //     onMutedMessage: function (message) {}        //  如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
    //   })
    // },
    // connect () {
    //   var options = {
    //     apiUrl: WebIM.config.apiURL,
    //     user: localStorage.getItem('uid'),
    //     pwd: '888888',
    //     appKey: WebIM.config.appkey
    //   }
    //   conn.open(options)
    //   setTimeout(() => {
    //     conn.setPresence()
    //   }, 3000)
    // }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
html,body,#app{height:100%;overflow-x:hidden;width: 100%}
html {-webkit-text-size-adjust:100%}
body {font-family:-apple-system-font,Helvetica Neue,sans-serif}
</style>
