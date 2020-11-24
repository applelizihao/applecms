<template>
  <div class="d-flex justify-center mt-4">
    <v-btn
      class="ma-2"
      color="primary"
      rounded
      dark
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
      required: true
    },
    loading: {
      type: Object,
      required: true
    }
  },
  middleware: 'authenticated',
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
