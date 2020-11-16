<template>
  <v-app dark>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" class="text-center">
            <div v-if="error.statusCode === 404">
              <NuxtLink to="/dashboard">
                <img
                  src="~/assets/404.png"
                >
              </NuxtLink>
            </div>
            <h1 v-else>
              {{ otherError }}
            </h1>
            <NuxtLink class="text-decoration-none" to="/dashboard">
              <v-btn color="error" class="mt-5">
                返回首页
              </v-btn>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
