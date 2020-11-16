
<template>
  <v-list-item dense>
    <v-dialog v-model="dialog" persistent max-width="340">
      <template v-slot:activator="{ on, attrs }">
        <v-list-item-title
          v-bind="attrs"
          class="red--text pointer capitalize"
          v-on="on"
        >
          退出登录
        </v-list-item-title>
      </template>
      <v-card>
        <v-card-title class="text-break">
          你确定要退出登录吗
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary darken-1" text @click="dialog = false">
            不，我拒绝
          </v-btn>
          <v-btn color="error darken-1" text @click="singOut">
            是的，我已确认退出
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script>
export default {
  data () {
    return { dialog: false }
  },
  methods: {
    singOut () {
      this.$store.commit('DELETE_TOKEN')
      this.$router.push('/user/login')
      this.$toast.success('成功退出账号')
    }
  }
}
</script>
