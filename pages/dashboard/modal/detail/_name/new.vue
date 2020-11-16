<template>
  <div class="row" no-gutters>
    <v-col cols="12" sm="8" md="8">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="form.title"
          label="标题"
          :counter="10"
          required
        />
      </v-form>
      <markdown :content.sync="form.content" />
      <seoform class="mt-5" />
      <operation :save="createArticle" :drafts="createDrafts" />
    </v-col>
    <v-col cols="12" sm="4" md="4">
      <quilleditor />
    </v-col>
  </div>
</template>
<script>
import Markdown from '../../../../../components/modal/markdown.vue'
import Seoform from '../../../../../components/modal/seoform.vue'
import Quilleditor from '../../../../../components/modal/quilleditor.vue'
export default {
  name: '',
  middleware: 'authenticated',
  components: { Markdown, Seoform, Quilleditor },
  data () {
    return {
      valid: false,
      form: {
        content: '#### 这是手册',
        title: null
      },
      loading: {
        reg: false
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    createDrafts () {
      alert('asd')
    },
    createArticle () {
      this.loading.reg = true
      const url = '/api/v1/article/create'
      const body = {
        title: this.form.title,
        content: this.form.content
      }
      this.$axios
        .post(url, body)
        .then((res) => {
          this.$toast.success('文章创建成功')
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
