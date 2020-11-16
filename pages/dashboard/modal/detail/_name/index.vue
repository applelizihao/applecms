<template>
  <div>
    <v-btn color="success" to="new" append>
      新增分类
    </v-btn>
    <pre>
    {{ detailList }}
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
      detailList: null,
      loading: {
        reg: false
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDetailList()
  },
  mounted () {
  },
  methods: {
    getDetailList () {
      this.loading.reg = true
      const url = '/api/v1/article/view'
      this.$axios
        .get(url)
        .then((res) => {
          this.detailList = res.data
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
