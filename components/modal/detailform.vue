<template>
  <v-form ref="form" v-model="valid" lazy-validation class="row" no-gutters>
    <v-col cols="12" sm="8" md="8">
      <template v-if="iscategory">
        <p class="mb-1">
          名称
        </p>
        <v-text-field
          v-model="form.name"
          label="分类名称"
          :loading="loading.formData"
          :counter="10"
          solo
          dense
          required
        />
      </template>
      <template v-if="!iscategory">
        <p class="mb-1">
          标题
        </p>
        <v-text-field
          v-model="form.title"
          label="输入标题信息"
          :loading="loading.formData"
          :counter="10"
          solo
          dense
          required
        />
      </template>
      <div>
        <p class="mb-1">
          描述信息:
        </p>
        <v-textarea
          v-model="form.description"
          :loading="loading.formData"
          solo
        />
      </div>
      <markdown :content.sync="form.content" />
      <seoform :loading="loading" :form="form" class="mt-5" />
    </v-col>
    <v-col cols="12" sm="4" md="4">
      <div>
        <p class="mb-0">
          图片上传
        </p>
        <vueuploadimgs />
      </div>
      <div>
        <p
          class="mb-1 mt-2"
        >
          设置分类
        </p>
        <treeselect v-model="form.selectCategory" :multiple="false" :options="form.category" />
      </div>
    </v-col>
    <v-col cols="12">
      <operation
        :save="save"
        :drafts="drafts"
        :loading="loading"
        :status="status"
        :deletefn="deletefn"
      />
    </v-col>
  </v-form>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import Markdown from './markdown.vue'
import Seoform from './seoform.vue'
import Vueuploadimgs from './vueuploadimgs.vue'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: '',
  components: { Markdown, Seoform, Vueuploadimgs, Treeselect },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    iscategory: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    save: {
      type: Function,
      required: true
    },
    deletefn: {
      type: Function,
      required: false,
      default () {}
    },
    drafts: {
      type: Function,
      required: false,
      default: () => {}
    },
    status: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      valid: false,
      form: {
        content: '',
        title: '',
        name: '',
        category: [],
        description: '',
        selectCategory: 0
      }
    }
  },
  computed: {
    modal_name () {
      return this.$route.params.name
    }
  },
  watch: {
  },
  created () {
    this.form = this.data
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      this.loading.getList = true
      const url = '/api/v1/category/articles/read/json'
      this.$axios
        .get(url)
        .then((res) => {
          this.form.category = res.data.children
          this.form.category.unshift({ name: '根分类', id: 0 })
          this.recursiveTree(this.form.category)
        })
        .catch((error) => {
          console.log(error)
          this.$toasted.error(error)
        })
        .finally(() => {
          this.loading.getList = false
        })
    },
    recursiveTree (tree) {
      // 格式化：清掉空的children，将title换成label
      tree.map((item) => {
        item.label = item.name
        if (item.children) {
          if (item.children.length === 0) {
            delete item.children
            return
          }
          item.children.map((child) => {
            child.label = child.name
          })
          this.recursiveTree(item.children)
        }
      })
      // console.log(tree)
    }
  }

}
</script>
<style lang='scss' scoped>
</style>
