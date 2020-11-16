<template>
  <div>
    <v-btn color="success" to="new" append>
      新增分类
    </v-btn>
    <pre>
    {{ categoryList }}
    </pre>
  </div>
</template>
<script>
export default {
  name: '',
  middleware: 'authenticated',
  components: {},
  data () {
    return {
      categoryList: null,
      loading: {
        reg: false
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getCategory()
  },
  mounted () {
  },
  methods: {
    getCategory () {
      this.loading.reg = true
      const url = '/api/v1/tree/view'
      this.$axios
        .get(url)
        .then((res) => {
          this.categoryList = res.data
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
      meta: [
        { hid: 'description', name: 'description', content: '登录页面' }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
