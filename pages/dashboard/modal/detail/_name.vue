<template>
  <div>
    <nuxt-child />
  </div>
</template>
<script>
export default {
  name: '',
  middleware: 'authenticated',
  components: {},
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
      title: '文章列表',
      meta: [
        { hid: 'description', name: 'description', content: '文章列表' }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
