<template>
  <div class="nobar task">
    <div v-transfer-dom>
      <x-dialog v-model="addTask" :mask-z-index="488" :dialog-style="{zIndex:'490'}">
        <x-icon type="ios-close-outline" style="fill:#35495e;" class="close" size="32" @click.native="addTask = !addTask"></x-icon>
        <group :gutter="0" title="新增任务" label-width="5em">
          <popup-picker :popup-style="{zIndex: '5001'}" title="任务名称" v-model="k.task" :data="[taskList]"></popup-picker>
          <datetime title="开始时间" v-model="k.start_time" format="YYYY-MM-DD HH:mm"></datetime>
          <popup-picker :popup-style="{zIndex: '5001'}" title="提醒时间" v-model="k.ti_remaind" :data="ti_time" :columns="1" show-name></popup-picker>
          <multi-player :people="people" @on-checkShow="select" @on-selectPerson="selctpeople"></multi-player>
        </group>
        <div class="savebtn">
        <x-button type="warn" @click.native="saveTask" :disabled="!isClick">保存</x-button>
        </div>
      </x-dialog>
    </div>
    <group :gutter="0" v-if="list.length">
      <cell v-for="m in list" :title="m.task" :inline-desc="m.start_time" :key="m.id">
        <div class="btn" :class="{done: !m.is_done}" @click="setDone(m)">
          {{ m.is_done === 0 ? '设置已完成' : '设置未完成' }}
        </div>
      </cell>
    </group>
    <empty-data v-if="!list.length"></empty-data>
  </div>
</template>

<script>
import { TaskListApi, TaskDone, AllAdminApi, TaskAdd, ERR_OK } from '@/api/api'
import MultiPlayer from '@/page/common/multiplayer'
import { OptionsTime, TaskList } from '@/page/setting/menu'
import EmptyData from '@/page/common/emptydata'
import { XDialog, XInput, Datetime, dateFormat, PopupPicker, XButton } from 'vux'

export default {
  name: 'tasklist',
  data () {
    return {
      addTask: false,
      list: [],
      ti_time: OptionsTime,
      taskList: TaskList,
      people: {
        xm: false,
        names: '',
        title: '参与人员',
        list: []
      },
      k: {
        task: [],
        start_time: dateFormat(new Date(), 'YYYY-MM-DD HH:mm'),
        ti_remaind: [],
        person: []
      },
      params: {
        row_id: this.$route.params.id,
        tab_type: this.$route.params.type
      }
    }
  },
  components: {
    XDialog,
    XInput,
    Datetime,
    PopupPicker,
    XButton,
    MultiPlayer,
    EmptyData
  },
  beforeDestroy () {
    this.$vux.bus.$off('AddBtn')
  },
  created () {
    this.getList()
    this.$vux.bus.$on('AddBtn', () => {
      this.addTask = !this.addTask
    })
  },
  methods: {
    getList () {
      TaskListApi(this.params).then(res => {
        this.list = res.data
      })
    },
    select () {
      if (!this.people.list.length) {
        AllAdminApi().then(res => {
          if (ERR_OK === res.code) {
            this.people.xm = !this.people.xm
            res.data.forEach(item => {
              this.people.list.push(item.username)
            })
          }
        })
      } else {
        this.people.xm = !this.people.xm
      }
    },
    selctpeople (value) {
      this.people.names = value.toString().trim()
      this.k.person = value
    },
    setDone (m) {
      let o = m.is_done === 1 ? 0 : 1
      let row = {task_id: m.id, is_done: o}
      TaskDone(row).then(res => {
        if (ERR_OK === res.code) {
          m.is_done = o
          this.$vux.toast.show({
            text: res.msg
          })
        } else {
          this.$vux.toast.show({
            text: res.msg
          })
        }
      })
    },
    saveTask () {
      let g = Object.assign({}, this.k, this.params)
      g.ti_remaind = g.ti_remaind.toString()
      g.task = g.task.toString()
      TaskAdd(g).then(res => {
        if (ERR_OK === res.code) {
          this.getList()
          this.$vux.toast.show({
            text: res.msg,
            type: 'success'
          })
          this.addTask = false
        } else {
          this.$vux.toast.show({ text: res.msg })
        }
      })
    }
  },
  computed: {
    isClick () {
      if (!this.k.person.length || !this.k.start_time || !this.k.task || !this.k.ti_remaind.length) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.task {
  .btn {
    padding: 3px 10px;
    color: white;
    background: #35495e;
    border-radius: 5px;
    transition: all .2s;
    &.done {
      background: #ea4949;
    }
  }
}
.savebtn {
  margin: 15px
}
.close{position: absolute;top:0px;right: 0px;}
</style>
