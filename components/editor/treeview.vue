<template>
  <v-card id="treeview">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-icon>mdi-silverware</v-icon>
      <v-toolbar-title>源码在线编辑</v-toolbar-title>
    </v-toolbar>
    <v-row>
      <v-col>
        <v-card-text class="pb-0">
          <v-treeview
            :items="listFile"
            item-key="path"
            open-on-click
            :active.sync="activeFile"
            activatable
          >
            <template v-slot:label="{item}">
              <div class="py-2" @contextmenu.prevent="rightShow(item)">
                {{ item.name }}
              </div>
            </template>
            <template v-slot:prepend="{ item, open }">
              <div @contextmenu.prevent="rightShow(item)">
                <v-icon v-if="!item.file">
                  {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                  {{ files[item.file] }}
                </v-icon>
              </div>
            </template>
          </v-treeview>
        </v-card-text>
        <div class="pb-5" @contextmenu.prevent="rightShow({path:'',name:''},'')" />
      </v-col>
      <v-divider vertical />
      <v-col cols="12" md="8" :class="{'d-flex justify-center align-center':!fileName}">
        <template v-if="fileName">
          <!-- eslint-disable-next-line vue/attribute-hyphenation -->
          <codeedit :fileContent.sync="fileContent" :fileName="fileName" :saveFile="saveFile" />
        </template>
        <template v-else>
          <div
            key="title"
            class="title font-weight-light grey--text pa-4 text-center"
          >
            左侧打开文件查看源码
          </div>
        </template>
      </v-col>
    </v-row>

    <v-divider />
    <v-card-actions v-if="fileName">
      <v-spacer />
      <v-btn
        class="white--text"
        color="green darken-1"
        depressed
        :loading="saveFileLoading"
        @click="saveFile"
      >
        保存
        <v-icon right>
          mdi-content-save
        </v-icon>
      </v-btn>
    </v-card-actions>
    <createdialog
      :dialogloading="dialogloading"
      :createstatus="createstatus"
      :dialog.sync="dialog"
      :nowfile="nowfile"
      :dialogsave="dialogsave"
      :dialogcontent.sync="dialogcontent"
    />
    <deletefile :deleteoption="deleteoption" :closedelete="closedelete" />
  </v-card>
</template>
<script>
import Codeedit from '@/components/editor/codeedit.vue'
import Createdialog from './createdialog.vue'
import Deletefile from './deletefile.vue'

function find (arr, path) {
  if (arr == null) { return null }
  for (const obj of arr) {
    if (obj.path === path) {
      return collect(obj, path)
    }
    // eslint-disable-next-line no-unused-vars
    const ret = find(obj.children, path)
    if (ret) { return ret }
  }
  return null
}

function collect (obj, path) {
  let ret = obj
  if (obj.path === path) {
    return ret
  }
  if (obj.children) {
    for (const o of obj.children) {
      ret = [...ret, ...collect(o)]
    }
  }
  return ret
}

function removefile (showlist, path) {
  if (typeof showlist === 'object') {
    // 如果showList是一个object，遍历showlist
    for (let i = 0; i < showlist.length; i++) {
      const element = showlist[i]
      if (element.path === path) {
        showlist.splice(i, 1)
        // 注意删除了一项后，索引-1
        i--
      } else {
        // 遍历其子节点
        // eslint-disable-next-line no-unused-vars
        removefile(element.children, path)
      }
    }
  } else {
    // 子节点不存在则结束
  }
}

export default {
  components: {
    Codeedit,
    Createdialog,
    Deletefile
  },
  props: {
    listFile: {
      type: Array,
      default: null
    }
  },

  data: () => ({
    dialog: false,
    dialogcontent: '',
    dialogloading: false,
    activeFile: [],
    nowfile: {},
    files: {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel'
    },
    // codeedit
    fileContent: '',
    fileName: '',
    dialogsave: null,
    createstatus: 1, // 1为文件夹,2为文件
    deleteoption: {
      loading: false,
      show: false,
      deletefile: null
    },
    saveFileLoading: false
  }),
  watch: {
    activeFile (value) {
      if (value.length <= 0 || !value) { return }
      const arr = value[0].split('/')
      const file = arr[arr.length - 1]
      const items = find(this.listFile, value[0])
      if (!items.file && items.children.length === 0) { return }
      if (!file) { return }
      this.getFile(file, value[0])
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    deleteDirectory () {
      // /api/v1/editor/delete/directory
    },
    closedelete (item) {
      this.deleteoption.show = false
    },
    deletefile (item, type) {
      this.deleteoption.loading = true
      console.log(item.path)
      const url = type === 'file' ? '/api/v1/editor/delete' : '/api/v1/editor/delete/directory'
      const body = type === 'file' ? {
        file_path: item.path
      } : {
        directory: item.path
      }
      console.log(body)
      this.$axios.delete(url, {
        params: body
      })
        .then((res) => {
          removefile(this.listFile, item.path)
          this.$toasted.success(res.data)
          this.deleteoption.show = false
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.deleteoption.loading = false
        })
    },
    rightShow (item) {
      // eslint-disable-next-line camelcase
      const add_path = item.path ? '/' : ''
      const dirmenu = [{
        label: '新建文件',
        onClick: () => {
          this.nowfile = item
          this.dialog = true
          this.createstatus = 2
          // eslint-disable-next-line camelcase
          this.dialogsave = value => this.createFile(item, item.path + add_path + this.dialogcontent, this.dialogcontent)
        }
      },
      {
        label: '新建文件夹',
        onClick: () => {
          this.nowfile = item
          this.dialog = true
          this.createstatus = 1
          // eslint-disable-next-line camelcase
          this.dialogsave = value => this.createDirectory(item, item.path + add_path + this.dialogcontent, this.dialogcontent)
        }
      }, {
        label: '删除文件夹',
        onClick: () => {
          this.nowfile = item
          this.deleteoption.show = true
          this.deleteoption.deletefile = () => this.deletefile(item, 'directory')
        }
      }]
      const filemenu = [{
        label: '删除文件',
        onClick: () => {
          this.nowfile = item
          this.deleteoption.show = true
          this.deleteoption.deletefile = () => this.deletefile(item, 'file')
        }
      }
        // {
        //   label: '重命名文件',
        //   onClick: () => {
        //     this.nowfile = item
        //     this.dialog = true
        //   }
        // }

      ]
      const menu = item.file ? filemenu : dirmenu
      this.$contextmenu({
        items: menu,
        event,
        customClass: this.useCustomClass ? 'custom-class' : '',
        zIndex: 3,
        minWidth: 150
      })
      event.preventDefault()
    },
    // 创建文件
    createFile (item, path, filename) {
      this.dialogloading = true
      const url = '/api/v1/editor/write'
      const body = {
        file_path: path,
        data: 'txt'
      }
      this.$axios
        .post(url, body)
        .then((res) => {
          if (item.path === '') {
            // 如果是根目录则
            this.listFile.push({
              path,
              name: filename,
              file: 'txt'
            })
          } else {
            if (!find(this.listFile, item.path).children) {
              find(this.listFile, item.path).children = []
            }
            find(this.listFile, item.path).children.push({
              path,
              name: filename,
              file: 'txt'
            })
          }
          this.fileContent = ''
          this.$toasted.success(res.data)
          this.dialog = false
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.dialogloading = false
        })
    },
    // 创建文件夹
    createDirectory (item, path, filename) {
      this.dialogloading = true
      const url = '/api/v1/editor/create'
      const body = {
        directory: path
      }
      this.$axios
        .post(url, body)
        .then((res) => {
          if (item.path === '') {
            // 如果是根目录则
            this.listFile.push({
              path,
              name: filename,
              children: []
            })
          } else {
            if (!find(this.listFile, item.path).children) {
              find(this.listFile, item.path).children = []
            }
            find(this.listFile, item.path).children.push({
              path,
              name: filename,
              children: []
            })
          }
          this.$toasted.success(res.data)
          this.fileContent = ''
          this.dialog = false
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
        .finally(() => {
          this.dialogloading = false
        })
    },
    // 获取文件
    getFile (filename, path) {
      const url = '/api/v1/editor/read'
      const params = {
        file_path: path
      }
      this.$axios
        .get(url, { params })
        .then((res) => {
          this.fileContent = res.data
          this.fileName = filename
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
    },
    // 保存文件
    saveFile () {
      this.saveFileLoading = true
      const url = '/api/v1/editor/write'
      const body = {
        file_path: this.activeFile[0],
        data: this.fileContent
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
          this.saveFileLoading = false
        })
    }

  }
}
</script>

<style lang="scss">
  #treeview{
  .v-treeview-node__root{
      min-height:unset
    }
  }
</style>
