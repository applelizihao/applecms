<template>
  <div>
    <h4>创建文章</h4>
    <detailform :data="form" :save="createArticle" :status="'create'" :loading="loading" :drafts="createDrafts" />
  </div>
</template>
<script>
import Detailform from '../../../../../components/modal/detailform.vue'
export default {
  name: '',
  middleware: 'authenticated',
  components: { Detailform },
  data () {
    return {
      form: {
        content: '321321',
        title: '312312321',
        category: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        description: 'cascsa',
        seo_title: '312312',
        seo_keywords: '312312',
        seo_description: 'dsadasdas'
      },
      loading: {
        save: false,
        draft: false
      }
    }
  },
  computed: {
    modal_name () {
      return this.$route.params.name
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // trash垃圾箱 outline草稿箱 online已发布 noseacrh已发布不索引 all全部,索引分别为0,1,2,3,10
    createArticle () {
      this.loading.save = true
      const url = `/api/v1/${this.modal_name}/create`
      const body = {
        title: this.form.title,
        content: this.form.content,
        description: this.form.description,
        seo_title: this.form.seo_title,
        seo_keywords: this.form.seo_keywords,
        seo_description: this.form.seo_description,
        status: 2,
        is_release: false,
        can_search: true
      }
      this.$axios
        .post(url, body)
        .then((res) => {
          this.$toasted.success('文章创建成功,并且索引发布')
          this.$router.push('/dashboard/modal/detail/' + this.modal_name)
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.save = false
        })
    },
    createDrafts () {
      this.loading.draft = true
      const url = `/api/v1/${this.modal_name}/create`
      const body = {
        title: this.form.title,
        content: this.form.content,
        description: this.form.description,
        seo_title: this.form.seo_title,
        seo_keywords: this.form.seo_keywords,
        seo_description: this.form.seo_description,
        status: 1,
        is_release: false,
        can_search: false
      }
      this.$axios
        .post(url, body)
        .then((res) => {
          this.$toasted.success('文章创建成功并存入草稿箱')
          this.$router.push('/dashboard/modal/detail/' + this.modal_name)
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.draft = false
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
