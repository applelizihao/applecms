<template>
  <div>
    <h4>修改文章</h4>
    <detailform :data="form" :save="changeDetail" :loading="loading" :drafts="changeDrafts" />
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
        seo_description: ''
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
      const url = `/api/v1/${this.modal_name}/self/readone/` + id
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
      const url = `/api/v1/${this.modal_name}/update`
      const body = {
        id: this.$route.params.id,
        title: this.form.title,
        content: this.form.content,
        description: this.form.description,
        seo_title: this.form.seo_title,
        seo_keywords: this.form.seo_keywords,
        seo_description: this.form.seo_description
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
