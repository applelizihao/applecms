<template>
  <div>
    <v-data-table
      :loading="loadingList"
      :headers="headers"
      :items="listData"
      :items-per-page="15"
      class="elevation-1"
    >
      <!-- eslint-disable-next-line -->
        <template v-slot:item.actions="{ item }">
        <v-btn
          color="error"
          small
          rounded
          append
          :loading="item.uninstall"
          @click="uninstall(item)"
        >
          卸载
        </v-btn>
        <v-btn
          color="success"
          small
          rounded
          append
          :loading="item.installModal"
          @click="installModal(item)"
        >
          安装
        </v-btn>
      </template>
      <!-- eslint-disable-next-line -->
      <template v-slot:item.version="{ item }">
        <div class="version py-2">
          <v-select
            class="m-0"
            style="max-width:300px"
            label="选择版本"
            dense
            solo
            small
          />
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  components: {},
  // eslint-disable-next-line vue/prop-name-casing
  props: {
    listData: {
      type: Array,
      required: true
    },
    loadingList: {
      type: Boolean,
      required: true
    }
  },
  middleware: 'authenticated',
  data () {
    return {
      headers: [{
        text: '名称',
        align: 'start',
        value: 'name'
      },
      {
        text: '描述',
        value: 'description'
      },
      {
        text: '版本',
        value: 'version'
      },
      {
        text: '操作',
        value: 'actions',
        sortable: false
      }
      ],
      modalList: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    installModal (item) {
      item.installModal = true
      const url = '/api/v1/module/install'
      const body = {
        name: item.name,
        version: '~'
      }
      this.$axios
        .post(url, body)
        .then((res) => {
          this.$toasted.success(res.data)
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          item.installModal = false
        })
    },
    uninstall (item) {
      item.uninstall = true
      const url = '/api/v1/module/uninstall'
      const body = {
        name: item.name,
        version: '~'
      }
      this.$axios
        .post(url, body)
        .then((res) => {
          this.$toasted.success(res.data)
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          item.uninstall = false
        })
    }
  },
  head () {
    return {
      title: '登录',
      meta: [
        { hid: 'description', name: 'description', content: '登录页面' }
      ]
    }
  }
}
</script>
<style lang='scss'>
.version{
 .v-text-field__details{
    display: none !important;
  }
}
</style>
