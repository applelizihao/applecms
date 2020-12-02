<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <div>
          <h5>
            当前路径为:{{ nowfile.path }}
          </h5>
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <ValidationProvider
            v-slot="{ errors }"
            name="value"
            rules="required"
          >
            <v-text-field
              id="id"
              v-model="content"
              dense
              name="value"
              :error-messages="errors"
              solo
              required
              :label="'输入'+ isFile + '名'"
            />
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error darken-1"
          @click="close"
        >
          关闭
        </v-btn>
        <v-btn
          color="success darken-1"
          :loading="dialogloading"
          @click="dialogsave"
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
    dialog: {
      type: Boolean,
      default: false
    },
    nowfile: {
      type: Object,
      default: null
    },
    dialogsave: {
      type: Function,
      default: null
    },
    dialogcontent: {
      type: String,
      default: ''
    },
    dialogloading: {
      type: Boolean,
      default: false
    },
    createstatus: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      valid: false,
      content: ''
    }
  },
  computed: {
    isFile () {
      let status
      switch (this.createstatus) {
        case 1:
          status = '文件夹'
          break
        case 2:
          status = '文件'
          break
      }
      return status
    }
  },
  watch: {
    content () {
      this.$emit('update:dialogcontent', this.content)
    }
  },
  created () {
    this.content = ''
  },
  mounted () {},
  methods: {
    close () {
      this.$emit('update:dialog', false)
    },
    save () {
      this.dialogsave()
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
