<template>
  <div>
    {{ userslist }}
    <template>
      <v-data-table
        :loading="loading.getUserList"
        :headers="headers"
        :items="userslist"
        :items-per-page="15"
        class="elevation-1"
      >
        <!-- eslint-disable-next-line -->
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" color=" primary" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small :color="item.status === 0 ? 'error' : 'warning'" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.create_date="{ item }">
          {{ item.create_date | utcTime(item.create_date) }}
        </template>
        <!-- eslint-disable-next-line -->
        <template v-slot:item.update_date="{ item }">
          {{ item.update_date | utcTime(item.update_date) }}
        </template>
      </v-data-table>
    </template>
  </div>
</template>
<script>
export default {
  name: '',
  middleware: 'authenticated',
  components: {},
  data () {
    return {
      userslist: [],
      headers: [{
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id'
      }, {
        text: '用户名',
        align: 'start',
        sortable: true,
        value: 'username'
      }, {
        text: '角色权限',
        align: 'start',
        sortable: true,
        value: 'character_id'
      }],
      loading: {
        getUserList: false
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getAllUsers()
  },
  mounted () {},
  methods: {
    getAllUsers () {
      this.loading.getUserList = true
      const url = '/api/v1/auth/view/all_user'
      this.$axios
        .get(url)
        .then((res) => {
          this.userslist = res.data
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.getUserList = false
        })
    }
  },
  head () {
    return {
      title: '用户管理',
      meta: [
        { hid: 'description', name: 'description', content: '管理员中心-用户管理' }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
