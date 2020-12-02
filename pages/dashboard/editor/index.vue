<template>
  <div id="editor">
    <div>
      <!-- eslint-disable-next-line vue/attribute-hyphenation -->
      <treeview :listFile="listFile" />
    </div>
  </div>
</template>
<script>
import Treeview from '../../../components/editor/treeview.vue'
export default {
  name: '',
  middleware: 'authenticated',
  components: { Treeview },
  data () {
    return {
      listFile: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.getEditorList()
  },
  methods: {
    getEditorList () {
      const url = '/api/v1/editor/ls'
      this.$axios
        .get(url)
        .then((res) => {
          this.listFile = res.data
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
    }
  },
  head () {
    return {
      title: '源码编辑',
      meta: [
        { hid: 'description', name: 'description', content: '源码编辑' }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
