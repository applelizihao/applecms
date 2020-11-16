<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>注册</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required|max:60|checkHasUser"
                    name="username"
                  >
                    <v-text-field
                      v-model.trim="username"
                      label="账号"
                      :error-messages="errors"
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
                <v-btn color="primary" to="/user/login">
                  登录
                </v-btn>
                <v-btn color="success" :disabled="!valid || !password || !username" :loading="loading.reg" @click="createUser">
                  注册
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
  name: 'Register',
  components: {},
  data () {
    return {
      username: null,
      password: null,
      valid: true,
      loading: {
        reg: false
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
  },
  methods: {
    createUser () {
      this.loading.reg = true
      const url = '/api/v1/auth/register'
      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      this.$axios
        .post(url, formData)
        .then((res) => {
          this.$toast.success('注册成功')
          this.$router.push('/user/login')
        })
        .finally(() => {
          this.loading.reg = false
        })
    }
  },
  head () {
    return {
      title: '用户注册',
      meta: [
        { hid: 'description', name: 'description', content: '注册页面' }
      ]
    }
  }
}
</script>
<style lang="less" scoped></style>
