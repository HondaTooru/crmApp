<template>
    <cell primary="content" :title="people.title" @click.native="$emit('on-checkShow')" is-link>
      <div>
        {{people.names}}
        <div v-transfer-dom>
           <popup max-height="50%" v-model="people.xm" :popup-style="{zIndex: '5006'}">
              <checklist :options="people.list" @on-change="select" :value="people.checks"></checklist>
           </popup>
        </div>
      </div>
    </cell>
</template>

<script>
import { Checklist, Popup } from 'vux'

export default {
  name: 'multiplayer',
  props: {
    people: Object
  },
  methods: {
    select (value, label) {
      this.$emit('on-selectPerson', value)
    }
  },
  components: {
    Checklist,
    Popup
  }
}
</script>

<style lang="less">
</style>
