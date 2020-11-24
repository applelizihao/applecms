<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="success"
        dark
        v-bind="attrs"
        v-on="on"
      >
        新增一组
      </v-btn>
    </template>
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
              label="输入组名"
            />
          </ValidationProvider>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="error darken-1"
          @click="dialog = false"
        >
          关闭
        </v-btn>
        <v-btn
          color="success darken-1"
          :disabled="!valid||!value|| reg"
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
    reg: {
      type: Boolean,
      default: false
    },
    save: {
      type: Function,
      default: null
    },
    changevalue: {
      type: Function,
      default: null
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: true,
      valid: false,
      content: ''
    }
  },
  computed: {},
  watch: {
    content () {
      this.changevalue(this.content)
    }
  },
  created () {
    this.content = this.value
  },
  mounted () {},
  methods: {
  }
}
</script>
<style lang='scss' scoped>
</style>
