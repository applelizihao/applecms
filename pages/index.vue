<template>
  <div>
    <codeedit />
  </div>
</template>
<script>
import Codeedit from '../components/editor/codeedit.vue'
export default {
  name: '',
  components: { Codeedit },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  beforeMount () {},
  mounted () {
  },
  methods: {},
  head () {
    return {
      title: '首页',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
}
</script>
<style lang='less' scoped>
</style>
