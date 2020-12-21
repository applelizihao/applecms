<template>
  <div>
    <div>
      <p class="mb-1">
        seo标题:
      </p>
      <v-text-field
        v-model="form.seo_title"
        :loading="loading.formData"
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
        v-model="form.seo_keywords"
        :loading="loading.formData"
        label="绑定关键词标题有利于搜索引擎优化"
        solo
        dense
      />
    </div>
    <div>
      <p class="mb-1">
        seo描述:
      </p>
      <v-textarea
        v-model="form.seo_description"
        :loading="loading.formData"
        solo
      />
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    form: {
      type: Object,
      required: true
    },
    loading: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
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
