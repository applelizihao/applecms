<template>
  <v-dialog
    ref="addpanelfields"
    v-model="dialogfields"
    persistent
    max-width="500px"
    transition="dialog-transition"
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
          @click="$emit('update:dialogfields',false)"
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
  components: {},
  props: {
    dialogfields: {
      type: Boolean,
      default: false
    }
  },
  middleware: 'authenticated',
  data () {
    return {
      valid: false,
      content: '',
      value: '',
      reg: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    save () {

    }
  }
}
</script>
<style lang='scss' scoped>
</style>
