<template>
  <div>
    <div class="d-flex justify-space-between mb-3">
      <p class="mb-1">
        模块管理列表
      </p>
    </div>
    <!--  eslint-disable-next-line vue/attribute-hyphenation -->
    <modallist :loadingList="loading.listData" :listData.sync="listData" />
  </div>
</template>
  </div>
</template>
<script>
import Modallist from '../../../../components/modal/modallist.vue'
export default {
  name: 'ModalList',
  middleware: 'authenticated',
  components: { Modallist },
  data () {
    return {
      listData: [],
      loading: {
        listData: false
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getModalList()
  },
  mounted () {},
  methods: {
    getModalList () {
      this.loading.listData = true
      const url = '/api/v1/module/store/view'
      this.$axios
        .get(url)
        .then((res) => {
          res.data.map((item) => {
            item.installModal = false
            item.uninstall = false
          })
          this.listData = res.data
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.listData = false
        })
    }
  },
  head () {
    return {
      title: '模块管理列表',
      meta: [
        { hid: 'description', name: 'description', content: '模块管理列表' }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
