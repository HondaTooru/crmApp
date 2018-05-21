<template>
  <div class="login">
    <div>
      <group :gutter="0">
        <div class="wrap">
          <x-input v-model="userInfo.phone" :max="13" is-type="china-mobile" placeholder="请输入手机号码" type="tel">
            <span slot="label" class="title">账号</span>
          </x-input>
          <x-input title="密码" v-model="userInfo.password" placeholder="密码" type="password" :min="6">
            <span slot="label" class="title">密码</span>
          </x-input>
        </div>
      </group>
      <div class="btn">
      <x-button :gradients="['#1D62F0', '#19D5FD']" action-type="button" @click.native="login" :show-loading="loginState" :disabled="loginState">登录</x-button>
    </div>
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
      if (this.userInfo.phone.trim()) {
        if (this.userInfo.password.trim()) {
          this.loginState = !this.loginState
          LoginApi(this.userInfo).then(res => {
            this.loginState = !this.loginState
            if (ERR_OK === res.code) {
              this.loginState = !this.loginState
              localStorage.setItem(USER_KEY, JSON.stringify(res.data))
              this.$router.push('/')
            } else {
              this.$vux.toast.show({
                text: res.msg,
                width: '10em'
              })
            }
          })
        } else {
          this.$vux.toast.show({
            text: '请输入密码'
          })
        }
      } else {
        this.$vux.toast.show({ text: '请输入手机号码', width: '10em' })
      }
    }
  }
}
</script>

<style lang="less">
.login {
  background: url(../assets/login.jpg) no-repeat center center/cover;
  height: 100%;
  width: 100%;
  font-size: 14px;
  position: relative;
  &>div{
    width: 100%;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    .weui-cells{background: transparent}
    .wrap {
      background: rgba(255,255,255,0.5);
      .title {
        display: inline-block;
        width: 70px;
        text-align: right;
        float:left;
        padding-right: 15px;
      }
    }
  }
  .btn {
    margin:25px 15px
  }
}
</style>
