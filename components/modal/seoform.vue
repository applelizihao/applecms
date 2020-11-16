<template>
  <div>
    <div>
      <p class="mb-1">
        seo标题:
      </p>
      <v-text-field
        label="绑定关键词标题"
        solo
        dense
      />
    </div>
    <div>
      <p class="mb-1">
        seo关键词:
      </p>
      <v-text-field
        label="绑定关键词标题有利于搜索引擎优化"
        solo
        dense
      />
    </div>
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
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>
