<template>
  <div class="nobar">
    <group :gutter="0">
      <x-input title="姓名" v-model="userInfos.username" text-align="right"></x-input>
      <x-input title="邮箱" is-type="email" v-model="userInfos.email" text-align="right"></x-input>
      <x-input title="部门" v-model="userInfos._group" text-align="right" disabled></x-input>
      <x-input title="角色" v-model="userInfos._role" text-align="right" disabled></x-input>
      <x-input title="电话" v-model="userInfos.mobile" text-align="right" disabled></x-input>
    </group>
    <checklist title="性别" :options="sexList" v-model="userInfos.sex" :max="1"></checklist>
    <div class="upload">
    <div class="a-upload">
        <input type="file" @change="pushImg" accept='image/*'>上传头像
    </div>
    <div class="name">{{fileName}}</div>
  </div>
    <div class="avatar" :style="{width: imgWidth, height: imgWidth, backgroundImage: 'url(' + baseImage + ')' }">
     <!-- <img ref="avatar" :src="userInfos.avatar"> -->
     </div>
  </div>

</template>

<script>
import { MemberInfo, SaveMemberInfo, Upload, ERR_OK } from '@/api/api'
import { XInput, Checklist } from 'vux'

export default {
  name: 'center',
  data () {
    return {
      userInfos: {},
      sexList: [
        {key: '0', value: '女'},
        {key: '1', value: '男'}
      ],
      flag: true,
      fileName: '',
      uploadImg: '',
      fid: ''
    }
  },
  components: {
    XInput,
    Checklist
  },
  created () {
    this.getInfos()
    this.$vux.bus.$on('Addinfo', () => { this.saveData() })
  },
  beforeDestroy () { this.$vux.bus.$off('Addinfo') },
  methods: {
    getInfos () {
      MemberInfo().then(res => {
        this.userInfos = res.data
        this.userInfos.sex = [this.userInfos.sex.toString()]
      })
    },
    pushImg (e) {
      let input = event.target
      let reader = new FileReader()
      if (input.files[0]) this.fileName = input.files[0].name
      reader.onload = () => {
        let dataUrl = reader.result
        this.uploadImg = dataUrl
        Upload({image_name: this.fileName, base64_image: dataUrl}, 'api').then(res => { this.fid = res.data })
      }
      if (input.files[0]) reader.readAsDataURL(input.files[0])
    },
    saveData () {
      let g = {}
      let _that = this
      if (!this.flag) return
      g.username = this.userInfos.username
      g.email = this.userInfos.email
      g.sex = this.userInfos.sex.toString()
      g.fid = this.fid
      SaveMemberInfo(g).then(res => {
        if (ERR_OK === res.code) {
          this.$vux.toast.show({
            text: res.msg,
            type: 'success',
            onHide () {
              _that.$router.back()
            }
          })
        } else {
          this.$vux.toast.show({
            text: res.msg,
            onHide () {
              _that.flag = false
            }
          })
        }
      })
    }
  },
  computed: {
    imgWidth () {
      return window.innerWidth - 30 + 'px'
    },
    baseImage () { return !this.uploadImg ? this.userInfos.avatar : this.uploadImg }
  }
}
</script>

<style lang="less" scoped>
.upload {
  overflow: hidden;
  display: flex;
  &>div.name {flex:1; line-height: 58px;padding-left: 10px;font-size: 12px}
  .a-upload {
      margin:15px 0 15px 15px;
      padding: 4px 10px;
      height: 20px;
      line-height: 20px;
      position: relative;
      cursor: pointer;
      color: white;
      background: #35495e;
      border-radius: 5px;
      overflow: hidden;
      font-size: 12px;
      display: inline-block;
      input {
        position: absolute;
        font-size: 18px;
        right: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
        outline: 0 none;
      }
  }
}
.avatar {
  overflow: hidden;
  margin:0 auto 20px;
  background-position: center;
  background-repeat:  no-repeat;
  background-size: cover;

}

</style>
