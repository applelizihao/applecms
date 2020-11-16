<template>
  <v-menu id="UserDropDown" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-avatar size="32px" item v-bind="attrs" v-on="on">
        <v-img :src="$store.state.user.image" alt="Vuetify" />
      </v-avatar>
    </template>
    <v-list-item-group id="list-item-group" style="width:150px;">
      <v-list>
        <v-list-item dense>
          <v-list-item-title class="pointer capitalize">
            个人中心
          </v-list-item-title>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-title class="pointer capitalize">
            用户设置
          </v-list-item-title>
        </v-list-item>
        <singout />
        <!-- 退出登录按钮 -->
      </v-list>
    </v-list-item-group>
  </v-menu>
</template>
<script>
import Singout from './singout.vue'
export default {
  name: '',
  middleware: 'authenticated',
  components: { Singout },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {},
  head () {
    return {
      title: '登录',
      meta: [
        { hid: 'description', name: 'description', content: '登录页面' }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
