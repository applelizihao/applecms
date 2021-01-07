<template>
  <div>
    <h4>修改文章</h4>
    {{ form.image }}
    <detailform
      :data="form"
      :save="changeDetail"
      :loading="loading"
      :drafts="createDrafts"
      :deletefn="deletefn"
      :status="'edit'"
    />
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
        title: '',
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
        delete: false
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
    deletefn () {
      this.loading.delete = true
      const id = this.$route.params.id
      const url = `/api/v1/${this.modal_name}/real_delete/` + id
      this.$axios
        .delete(url)
        .then((res) => {
          this.$toasted.success('永久删除成功,并返回列表页面')
          this.$router.push('/dashboard/modal/detail/' + this.modal_name)
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.delete = false
        })
    },
    getDetail () {
      this.loading.formData = true
      const id = this.$route.params.id
      const url = `/api/v1/${this.modal_name}/self/readone/` + id
      this.$axios
        .get(url)
        .then((res) => {
          for (const key in res.data) {
            this.$set(this.form, key, res.data[key])
          }
          this.form.selectCategory = this.form.category_id
        })
        .finally(() => {
          this.loading.formData = false
        })
    },
    changeDetail () {
      this.loading.save = true
      const url = `/api/v1/${this.modal_name}/update`
      const body = {
        id: this.$route.params.id,
        title: this.form.title,
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
          this.$router.push('/dashboard/modal/detail/' + this.modal_name)
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
