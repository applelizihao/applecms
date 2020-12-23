<template>
  <v-dialog
    v-model="dialogfields"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span>新增一组</span>
      </v-card-title>
      <v-card-text>
        <p class="mb-1 black--text">
          组名
        </p>
        <v-form ref="form" v-model="valid">
          <ValidationProvider
            v-slot="{ errors }"
            name="content"
            rules="required"
          >
            <v-text-field
              id="id"
              v-model="content"
              dense
              name="content"
              :error-messages="errors"
              solo
              required
              label="输入组名"
            />
          </ValidationProvider>
          <p class="mb-1 black--text">
            字段类型
          </p>
          <ValidationProvider
            v-slot="{ errors }"
            name="fieldType"
            rules="required"
          >
            <v-select
              v-model="fieldType"
              :items="filedItems"
              name="fieldType"
              label="请选择字段类型"
              dense
              outlined
              :error-messages="errors"
            />
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error darken-1"
          @click="$emit('update:dialogfields',false)"
        >
          关闭
        </v-btn>
        <v-btn
          color="success darken-1"
          :disabled="!valid||!content||!fieldType"
          @click="save"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import '@/utils/validate'
export default {
  name: '',
  middleware: 'authenticated',
  components: {},
  props: {
    childitem: {
      type: Object,
      default: null
    },
    dialogfields: {
      type: Boolean,
      default: false
    },
    reg: {
      type: Boolean,
      default: false
    },
    listData: {
      type: Array,
      required: true
    },
    changeListData: {
      type: Function,
      default: null,
      required: true
    }
  },
  data () {
    return {
      dialog: false, /* 弹窗状态 */
      valid: false,
      content: '',
      fieldType: 'text',
      filedItems: [{
        text: '文本框',
        value: 'text'
      }, {
        text: '富文本框',
        value: 'textarea'
      }, {
        text: '单图片',
        value: 'image'
      }]
    }
  },
  computed: {},
  watch: {
  },
  created () {
  },
  mounted () {},
  methods: {
    save () {
      console.log(this.fieldType)
      this.childitem.children.push({
        type: this.fieldType,
        name: this.content,
        index: this.childitem.children.length,
        content: ''
      })
      // this.$emit('update:dialogfields', false)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
