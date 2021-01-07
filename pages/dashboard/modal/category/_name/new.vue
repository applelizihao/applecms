<template>
  <div>
    <h4>创建分类</h4>
    <detailform :data="form" :status="'createCategory'" :save="createArticle" :loading="loading" />
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
        category: [],
        description: 'cascsa',
        seo_title: '312312',
        seo_keywords: '312312',
        seo_description: 'dsadasdas',
        selectCategory: 0,
        image: ''
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
      const url = `/api/v1/category/${this.modal_name}/create/${this.form.selectCategory}`
      const body = {
        leaf: {
          name: this.form.title,
          description: this.form.description
        },
        data: {
          name: this.form.title,
          content: this.form.content,
          description: this.form.description,
          status: true,
          seo_title: this.form.seo_title,
          seo_keywords: this.form.seo_keywords,
          seo_description: this.form.seo_description,
          image: this.form.image
        }
      }
      this.$axios
        .post(url, body)
        .then((res) => {
          this.$toasted.success('分类创建成功')
          this.$router.push('/dashboard/modal/category/' + this.modal_name)
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.save = false
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
