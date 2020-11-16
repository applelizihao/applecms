<template>
  <div>
    <div class="d-flex justify-space-between">
      <v-btn color="success" to="new" rounded append>
        新增文章
      </v-btn>
    </div>

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
      const url = '/api/v1/article/self/articles'
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
      title: '创建文章',
      meta: [
        { hid: 'description', name: 'description', content: '创建文章' }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
