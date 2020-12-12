<template>
  <v-form ref="form" v-model="valid" lazy-validation class="row" no-gutters>
    <v-col cols="12" sm="8" md="8">
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
        <v-select
          :items="form.category"
          :loading="loading.formData"
          label="选择分类"
          dense
          solo
        />
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
import Markdown from './markdown.vue'
import Seoform from './seoform.vue'
import Vueuploadimgs from './vueuploadimgs.vue'
export default {
  name: '',
  middleware: 'authenticated',
  components: { Markdown, Seoform, Vueuploadimgs },
  props: {
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
      required: true
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
        category: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        description: ''
      }
    }
  },
  computed: {},
  watch: {
  },
  created () {
    this.form = this.data
  },
  mounted () {},
  methods: {
  }

}
</script>
<style lang='scss' scoped>
</style>
