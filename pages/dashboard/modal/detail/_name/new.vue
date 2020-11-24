<template>
  <div>
    <h4>创建文章</h4>
    <detailform :data="form" :save="createArticle" :loading="loading" :drafts="createDrafts" />
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
        save: false
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    createArticle () {
      this.loading.save = true
      const url = '/api/v1/article/create'
      const body = {
        title: this.form.title,
        content: this.form.content,
        description: '312312',
        seo_title: this.form.seo_title,
        seo_keywords: this.form.seo_keywords,
        seo_description: this.form.seo_description,
        status: 0,
        is_release: false,
        can_search: true
      }
      this.$axios
        .post(url, body)
        .then((res) => {
          this.$toast.success('文章创建成功')
          this.$router.push('/dashboard/modal/detail/' + this.$route.params.name)
        })
        .catch((error) => {
          this.$toast.error(error.response.data)
        })
        .finally(() => {
          this.loading.save = false
        })
    },
    createDrafts () {
      alert('asd')
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
