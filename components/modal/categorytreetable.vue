<template>
  <div>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="getTreeExpansionEvent">
          获取已展开
        </vxe-button>
        <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">
          展开所有
        </vxe-button>
        <vxe-button @click="$refs.xTree.clearTreeExpand()">
          关闭所有
        </vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTree"
      border
      resizable
      :tree-config="{children: 'children', iconOpen: 'fas fa-minus-circle', iconClose: 'fas fa-plus-circle'}"
      :data="categorylist"
    >
      <vxe-table-column width="60" field="id" title="ID" />
      <vxe-table-column field="name" title="分类名称" tree-node />
      <vxe-table-column field="description" title="分类描述" />
      <vxe-table-column title="操作">
        <template v-slot="{ row }">
          <div>
            <v-icon small class="mr-2" color=" primary" @click="editItem(row)">
              mdi-pencil
            </v-icon>
            <v-icon small color="error" @click="showDeleteModal(row)">
              mdi-delete
            </v-icon>
          </div>
        </template>
      </vxe-table-column>
    </vxe-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline  ">
          <div class="text-center" style="width:100%">
            <h5>
              确定要删除这个分类吗
            </h5>
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
export default {
  props: {
    categorylist: {
      type: Array,
      default: null
    },
    getCategory: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      loading: {
        delete: false
      },
      dialogDelete: false,
      deleteId: null
    }
  },
  created () {
  },
  methods: {
    editItem (item) {
      this.$router.push(this.$route.params.name + '/edit/' + item.id)
    },
    closeDelete () {
      this.dialogDelete = false
    },
    showDeleteModal (item) {
      this.dialogDelete = true
      this.deleteId = item.id
    },
    deleteItemConfirm () {
      this.loading.delete = true
      const deleteId = this.deleteId
      const url = `/api/v1/category/${this.$route.params.name}/remove/${deleteId}`
      this.$axios
        .delete(url)
        .then((res) => {
          this.$toasted.success('永久删除成功')
          this.getCategory()
          this.dialogDelete = false
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.loading.delete = false
        })
    },
    getTreeExpansionEvent () {
      const treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
      this.$XModal.alert(treeExpandRecords.length)
    }
  }
}
</script>

<style>

</style>
