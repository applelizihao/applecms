<template>
  <div>
    <div class="d-flex justify-space-between mb-3">
      <p class="mb-1">
        文章分类列表
      </p>
      <v-btn color="success" to="new" rounded append>
        新增分类
      </v-btn>
    </div>
    <template v-if="detailList.length>0">
      <v-data-table :headers="headers" :items="detailList" :items-per-page="15" class="elevation-1">
        <!-- eslint-disable-next-line -->
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </template>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline  ">
          <div class="text-center" style="width:100%">
            <h5> 你确定要删除这篇文章吗?</h5>
            <span class="text-body-2 text--secondary">
              删除后他将会进入垃圾箱，并不会真正意义上的删除
            </span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="closeDelete">
            Cancel
          </v-btn>
          <v-btn color="error darken-1" @click="deleteItemConfirm">
            OK
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: '',
  middleware: 'authenticated',
  components: {},
  data () {
    return {
      detailList: [],
      headers: [{
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      {
        text: '标题',
        value: 'title'
      },
      {
        text: '所属分类',
        value: 'category'
      },
      {
        text: '描述',
        value: 'description'
      },
      {
        text: '图片',
        value: 'image'
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false
      }
      ],
      dialogDelete: false,
      loading: {
        reg: false
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getDetailList()
  },
  mounted () {},
  methods: {
    editItem (item) {
      this.$router.push(this.$route.params.name + '/edit/' + item.id)
    },
    deleteItem (item) {
      this.dialogDelete = true
      this.dialogItem = item
    },
    closeDelete () {
      this.dialogDelete = false
      this.dialogItem = null
    },
    deleteItemConfirm () {
      const url = '/api/v1/character/delete'
      const params = {
        id: this.dialogItem.id
      }
      this.$axios
        .delete(url, { params })
        .then((res) => {
          this.$toasted.success(res.data)
        })
        .catch((error) => {
          this.$toasted.error(error.response.data.detail)
        })
        .finally(() => {
          this.loading.reg = false
        })
    },
    getDetailList () {
      this.loading.reg = true
      const url = '/api/v1/category/read'
      this.$axios
        .get(url)
        .then((res) => {
          console.log(JSON.parse(res.data))
          // this.detailList = res.data
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.reg = false
        })
    }
  },
  head () {
    return {
      title: '分类列表',
      meta: [{
        hid: 'description',
        name: 'description',
        content: '分类列表'
      }]
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
