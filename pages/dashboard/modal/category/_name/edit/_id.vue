<template>
  <div>
    <h4>修改分类</h4>
    <detailform :iscategory="true" :data="form" :save="changeDetail" :loading="loading" :drafts="changeDrafts" />
  </div>
</template>
<script>
import Detailform from '../../../../../../components/modal/detailform.vue'
export default {
  name: '',
  middleware: 'authenticated',
  components: { Detailform },
  data () {
    return {
      form: {
        content: '',
        name: '',
        category: [],
        description: '',
        seo_title: '',
        seo_keywords: '',
        seo_description: '',
        selectCategory: 0,
        image: ''
      },
      loading: {
        formData: false,
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
  created () {

  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.loading.formData = true
      const id = this.$route.params.id
      const url = `/api/v1/category/${this.modal_name}/read/database/${id}`
      this.$axios
        .get(url)
        .then((res) => {
          for (const key in res.data) {
            this.$set(this.form, key, res.data[key])
          }
        })
        .finally(() => {
          this.loading.formData = false
        })
    },
    changeDetail () {
      this.loading.save = true
      const url = `/api/v1/category/${this.modal_name}/update`
      const body = {
        id: this.$route.params.id,
        name: this.form.name,
        content: this.form.content,
        description: this.form.description,
        seo_title: this.form.seo_title,
        seo_keywords: this.form.seo_keywords,
        seo_description: this.form.seo_description,
        category_id: this.form.selectCategory,
        image: this.form.image
      }
      this.$axios
        .put(url, body)
        .then((res) => {
          this.$toasted.success('成功修改文章')
          this.$router.push('/dashboard/modal/category/' + this.modal_name)
        })
        .finally(() => {
          this.loading.save = false
        })
    },
    changeDrafts () {
      alert('asd')
    }
  },
  head () {
    return {
      title: '修改文章',
      meta: [
        { hid: 'description', name: 'description', content: '修改文章' }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
