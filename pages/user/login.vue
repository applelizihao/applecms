<template>
  <v-app id="inspire">
    <v-main>
      {{ this.$store.state }}
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>登录</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="username"
                    rules="required"
                  >
                    <v-text-field
                      v-model="username"
                      :error-messages="errors"
                      label="账号"
                      name="username"
                      prepend-icon="mdi-account"
                      autocomplete="off"
                      type="text"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|max:60"
                    name="password"
                  >
                    <v-text-field
                      v-model="password"
                      label="密码"
                      :error-messages="errors"
                      name="password"
                      prepend-icon="mdi-lock"
                      autocomplete="off"
                      type="text"
                    />
                  </ValidationProvider>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="success" to="/user/register">
                  注册
                </v-btn>
                <v-btn color="primary" :disabled="!valid || !password || !username" :loading="loading.reg" @click="loginUser">
                  登录
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import '@/utils/validate'
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      username: 123123,
      password: 123123,
      valid: true,
      loading: {
        reg: false
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    loginUser () {
      this.loading.reg = true
      const url = '/api/v1/auth/login'
      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      this.$axios
        .post(url, formData)
        .then((res) => {
          this.$store.commit('SET_TOKEN', res.data.token)
          this.$router.push('/dashboard')
          this.$toast.success('登录成功')
        })
        .catch((res) => {
          this.$toast.error(res.response.data)
        })
        .finally(() => {
          this.loading.reg = false
        })
    }
  },
  head () {
    return {
      title: '登录',
      meta: [{
        hid: 'description',
        name: 'description',
        content: '登录页面'
      }]
    }
  }
}

</script>
<style lang="scss" scoped>

</style>
