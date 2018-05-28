<template>
  <div class="nobar">
    <div v-transfer-dom>
       <previewer :list="uploadImg" ref="picInfo" :options="options" @on-index-change="logIndexChange"></previewer>
    </div>
  <group :gutter="0">
    <x-input title="产品名称" v-model="infos.title" text-align="right"></x-input>
    <x-input title="产品单价" is-type="number" v-model.number="infos.unit_price" text-align="right"></x-input>
    <x-input title="产品单位" v-model="infos.unit_sales" text-align="right"></x-input>
    <PopupPicker title="产品分类" v-if="cateList[0].length" v-model="infos.cate_id" text-align="right" :data="cateList"></PopupPicker>
    <div class="imglist">
      <div class="upload">
        <div class="a-upload">
            <input type="file" @change="pushImg" accept='image/*'>上传产品图
        </div>
      </div>
      <div class="pic">
        <div v-for="(m, index) in infos.image" :key="index">
        <div class="imgList" :style="{backgroundImage:'url(' + m.url + ')'}" @click="show(index)">
          <i class="fa fa-minus-circle" aria-hidden="true" @click.stop.prevent="delPic(m)"></i>
        </div>
      </div>
      </div>
    </div>
    <datetime title="创建时间" v-model="infos.create_time" text-align="right" format="YYYY-MM-DD HH:mm"></datetime>
    <datetime title="更新时间" v-model="infos.update_time" text-align="right" format="YYYY-MM-DD HH:mm"></datetime>
    <x-input title="产品编号" v-model="infos.product_code" text-align="right"></x-input>
    <x-input title="产品成本" v-model="infos.unit_cost" text-align="right"></x-input>
    <x-input title="毛利率" v-model="infos.rate" text-align="right"></x-input>
    <x-textarea title="产品介绍" placeholder="请输入内容" v-model="infos.content" :max="200"></x-textarea>
  </group>
  <div class="delbtn">
    <x-button type="warn" @click.native="delProduct">删除产品</x-button>
  </div>
</div>
</template>

<script>
import { XInput, Datetime, XTextarea, XButton, PopupPicker, Previewer } from 'vux'
import { DetailApi, EditSave, ERR_OK, DelProduct, Upload, ProCategroy } from '@/api/api'

export default {
  name: 'productinfo',
  data () {
    return {
      infos: {},
      params: [],
      uploadImg: [],
      ids: [],
      cateList: [[]],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.imgList')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  created () {
    ProCategroy().then(res => { res.data.forEach(item => { this.cateList[0].push(item.name) }) })
    this.getInfo()
    this.$vux.bus.$on('Addinfo', () => {
      this.saveData()
    })
  },
  beforeDestroy () {
    this.$vux.bus.$off('Addinfo')
  },
  methods: {
    delProduct () {
      let _that = this
      this.$vux.confirm.show({
        content: '删除后不可恢复',
        onConfirm () {
          DelProduct({row_id: _that.$route.params.id}).then(res => {
            if (ERR_OK === res.code) {
              _that.$vux.toast.show({
                text: res.msg,
                type: 'success',
                onHide () {
                  _that.$router.go(-1)
                }
              })
            } else {
              _that.$vux.toast.show({
                text: res.msg
              })
            }
          })
        }
      })
    },
    logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      console.log(index)
      this.$refs.picInfo.show(index)
    },
    pushImg (e) {
      let input = event.target
      let reader = new FileReader()
      reader.onload = () => {
        let dataUrl = reader.result
        this.infos.image.push({id: '', url: dataUrl})
        this.uploadImg.push({name: input.files[0].name, image: dataUrl, src: dataUrl, msrc: dataUrl})
      }
      if (input.files[0]) reader.readAsDataURL(input.files[0])
    },
    delPic (item) {
      this.infos.image.splice(this.infos.image.indexOf(item), 1)
      this.ids.splice(this.ids.indexOf(item.id), 1)
    },
    getInfo () {
      DetailApi({ row_id: this.$route.params.id }, 'product').then(res => {
        this.infos = res.data.body
        this.infos.cate_id = [this.infos.cate_id]
        res.data.body.image.forEach(item => {
          this.ids.push(item.id)
          this.uploadImg.push({src: item.url, msrc: item.url})
        })
      })
    },
    saveData () {
      console.log(this.params)
      Upload({file: this.uploadImg}, 'clue').then(res => {
        this.ids.push.apply(this.ids, res.data.split(','))
        for (let i in this.infos) {
          if (i === 'image') {
            this.params.push({name: i, value: this.ids.toString()})
          } else { this.params.push({name: i, value: this.infos[i]}) }
        }
        this.params.cate_id = this.params.cate_id.toString()
        EditSave({field_data: JSON.stringify(this.params)}, 'product').then(res => {
          if (ERR_OK === res.code) {
          } else {}
        }).catch(err => {
          console.log(err)
        })
      })
    }
  },
  components: {
    XInput,
    Datetime,
    XTextarea,
    XButton,
    PopupPicker,
    Previewer
  }
}
</script>

<style lang="less" scoped>
.delbtn { margin: 15px }
.upload {
  overflow: hidden;
  display: flex;
  position: relative;
  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
  }
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
  &+.pic {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    & > div {
      width: 30%;
      float:left;
      margin-bottom: 15px;
      overflow: hidden;
      & > div {
        width:100%;
        padding-top: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: relative;
        & > .fa {
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 24px;
          color:#fff;
          z-index: 99
        }
      }
    }
  }
}
</style>
