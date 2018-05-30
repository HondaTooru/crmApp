<template>
  <div class="login">
    <div>
      <input type="tel" placeholder="请输入您的账号" v-model="userInfo.phone">
      <input type="password" placeholder="请输入您的密码" v-model="userInfo.password">
      <input type="button" value="登录" @click="login">
    </div>
  </div>
</template>

<script>
import { XInput, XButton } from 'vux'
import { LoginApi, ERR_OK, USER_KEY } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        phone: '',
        password: ''
      },
      loginState: false
    }
  },
  components: {
    XInput,
    XButton
  },
  methods: {
    login () {
      if (this.userInfo.phone.trim() && /^1[34578]\d{9}$/.test(this.userInfo.phone)) {
        if (this.userInfo.password.trim()) {
          this.loginState = !this.loginState
          LoginApi(this.userInfo).then(res => {
            this.loginState = !this.loginState
            if (ERR_OK === res.code) {
              this.loginState = !this.loginState
              localStorage.setItem(USER_KEY, JSON.stringify(res.data))
              this.$router.replace('/')
            } else {
              this.$vux.toast.show({
                text: res.msg,
                width: '10em'
              })
            }
          })
        } else {
          this.$vux.toast.show({
            text: '请输入密码',
            position: 'top'
          })
        }
      } else {
        this.$vux.toast.show({ text: '请输入正确的手机号码', width: '10em', position: 'top' })
      }
    }
  }
}
</script>

<style lang="less">
.login {
  background: url(../assets/login.png) no-repeat center center/cover;
  height: 100%;
  width: 100%;
  font-size: 14px;
  position: relative;
  &>div{
    position: absolute;
    top:45%;
    left: 25px;
    right: 25px;
    transform: translateY(-50%);
    input {
      display: block;
      padding: 12px 0 12px 40px;
      width: 100%;
      margin-bottom: 20px;
      border-radius: 5px;
      box-sizing: border-box;
      outline: 0;
      border: 0;
      appearance: none;
      background-color:rgba(255,255,255,.3);
      color:rgba(255,255,255,.6);
      font-size: 14px;
      &::-webkit-input-placeholder{
        color:rgba(255,255,255,.5);
      }
      &:nth-of-type(1), &:nth-of-type(2) {background-repeat:no-repeat;background-position: 10px center;background-size:20px 20px}
      &:nth-of-type(1) {background-image:url('../assets/user.png')}
      &:nth-of-type(2) {background-image:url('../assets/pass.png')}
      &:last-of-type {
        margin: 40px 0 0 0;
        color: rgba(255,255,255,.6);
        padding: 11px 0
      }
    }
  }
  .btn {
    margin:25px 15px
  }
}
</style>
