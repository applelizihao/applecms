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
    console.log(this.$toasted.info('hello billo'))
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
