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
    <!--  eslint-disable-next-line vue/attribute-hyphenation -->
    <categorytreetable :categorylist="categoryList.children" :getCategory="getCategory" />
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline  ">
          <div class="text-center" style="width:100%">
            <h5>
              <template v-if="dialogStatus ===0">
                你确定要删除这篇文章吗?
              </template>
              <template v-else>
                你确定要将这篇文章放入回收站吗
              </template>
            </h5>
            <span class="text-body-2 text--secondary">
              <template v-if="dialogStatus ===0">
                他将被永久删除
              </template>
              <template v-else>
                删除后他将会进入垃圾箱，并不会真正意义上的删除
              </template>
            </span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="closeDelete">
            取消
          </v-btn>
          <v-btn color="error darken-1" :loading="loading.delete" @click="deleteItemConfirm">
            删除
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Categorytreetable from '../../../../../components/modal/categorytreetable.vue'
export default {
  name: '',
  middleware: 'authenticated',
  components: { Categorytreetable },
  data () {
    return {
      detailList: [],
      categoryList: [],
      headers: [{
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id'
      },
      {
        text: '分类名称',
        value: 'name'
      },
      {
        text: '创建时间',
        value: 'create_date'
      },
      {
        text: '更新时间',
        value: 'update_date'
      },
      {
        text: '操作',
        value: 'actions',
        sortable: false
      }
      ],
      dialogDelete: false,
      loading: {
        getList: true,
        delete: false
      },
      dialogItem: {},
      screen: 'all',
      options: [{
        text: '全部',
        value: 'all'
      }, {
        text: '垃圾箱',
        value: 'trash'
      }, {
        text: '草稿箱',
        value: 'outline'
      }, {
        text: '已发布',
        value: 'online'
      }, {
        text: '已发布不索引',
        value: 'noseacrh'
      }]
      // 读取自己的文章,注意在url中加入状态,trash垃圾箱 outline草稿箱 online已发布 noseacrh已发布不索引 all全部,索引分别为0,1,2,3,10
    }
  },
  computed: {
    dialogStatus () {
      return this.dialogItem.status
    },
    modal_name () {
      return this.$route.params.name
    }
  },
  watch: {
    screen () {
      console.log('123312')
      this.getCategory()
    }
  },
  created () {},
  beforeMount () {
    this.getCategory()
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
      this.dialogItem = {}
    },
    deleteItemConfirm () {
      const _index = this.detailList.findIndex(el => el.id === this.dialogItem.id)
      this.loading.delete = true
      const id = this.dialogItem.id
      let url = `/api/v1/${this.modal_name}/delete/${id}`
      if (this.dialogStatus === 0) {
        url = `/api/v1/${this.modal_name}/real_delete/${id}`
      }
      this.$axios
        .delete(url)
        .then((res) => {
          this.$toasted.success(res.data)
          if (this.dialogStatus === 0) {
            this.detailList.splice(_index, 1)
          } else {
            this.$set(this.detailList[_index], 'status', 0)
          }
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.delete = false
          this.dialogDelete = false
        })
    },
    getCategory () {
      this.loading.getList = true
      const url = `/api/v1/category/${this.modal_name}/read/json`
      this.$axios
        .get(url)
        .then((res) => {
          this.categoryList = res.data
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.getList = false
        })
    }
  },
  head () {
    return {
      title: '创建分类',
      meta: [{
        hid: 'description',
        name: 'description',
        content: '创建分类'
      }]
    }
  }
}

</script>
<style scoped>
</style>
