<template>
  <div>
    <nuxt />
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
  beforeMount () {},
  mounted () {},
  methods: {},
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
