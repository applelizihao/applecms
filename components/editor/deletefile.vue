<template>
  <v-dialog v-model="deleteoption.show" max-width="500px">
    <v-card>
      <v-card-title class="headline  ">
        <div class="text-center" style="width:100%">
          <h5>确定要删除吗</h5>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="close">
          取消
        </v-btn>
        <v-btn color="error darken-1" @click="save">
          删除
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    closedelete: {
      type: Function,
      default: null
    },
    deleteoption: {
      type: Object,
      default: null
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
  methods: {
    close () {
      this.closedelete()
    },
    save () {
      this.deletefile()
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
