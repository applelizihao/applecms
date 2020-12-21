<template>
  <div class="d-flex justify-center mt-4">
    <v-btn
      v-if="status === 'create'"
      class="ma-2"
      color="primary"
      rounded
      dark
      :loading="loading.draft"
      @click="drafts"
    >
      <v-icon
        dark
        left
      >
        mdi-plus
      </v-icon>
      保存至草稿箱
    </v-btn>
    <v-btn
      v-if="status === 'edit'"
      class="ma-2"
      color="error"
      rounded
      :loading="loading.delete"
      dark
      @click="deletefn"
    >
      <v-icon
        dark
        left
      >
        mdi-content-save
      </v-icon>
      永久删除
    </v-btn>
    <v-btn
      class="ma-2"
      color="success"
      :loading="loading.save"
      rounded
      dark
      @click="save"
    >
      <v-icon
        dark
        left
      >
        mdi-content-save
      </v-icon>
      保存
    </v-btn>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    save: {
      type: Function,
      required: true
    },
    drafts: {
      type: Function,
      default: null
    },
    status: {
      type: String,
      default: null
    },
    deletefn: {
      type: Function,
      required: true
    },
    loading: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
<style lang='scss' scoped>
</style>
