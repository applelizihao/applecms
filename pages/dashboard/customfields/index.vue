<template>
  <div>
    <div class=" d-flex justify-space-between mb-4 align-end">
      <p>自定义字段设置</p>
      <div>
        <!-- eslint-disable-next-line vue/attribute-hyphenation -->
        <addpanel :listData="listData" :changeListData="changeListData" />
      </div>
    </div>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(item,i) in listData"
        :key="i"
      >
        <v-expansion-panel-header class="justify-space-between d-flex">
          <div>
            {{ item.name }}
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class=" text-right">
            <v-btn color="info" class="d-inline-block" @click="dialogfields = true;childitem = item">
              添加字段
            </v-btn>
          </div>
          <div v-for="(child,idx) in item.children" :key="idx">
            <p class="mb-1">
              {{ child.name }}
              <v-icon class="float-right pt-1" small color="error" @click="deleteItem(item.children,idx)">
                mdi-delete
              </v-icon>
            </p>
            <!-- 简单文本 type:text -->
            <template v-if="child.type == 'text'">
              <filedtext :item="child" />
            </template>
            <template v-if="child.type == 'textarea'">
              <filedtextarea :item="child" />
            </template>
            <template v-if="child.type == 'image'">
              <vueuploadimgs class="mb-5" />
            </template>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!--  eslint-disable-next-line vue/attribute-hyphenation -->
    <addpanelfields
      :list-data="listData"
      :change-list-data="changeListData"
      :dialogfields.sync="dialogfields"
      :childitem="childitem"
    />
  </div>
</template>
<script>
import Addpanel from '../../../components/customfields/addpanel.vue'
import Addpanelfields from '../../../components/customfields/addpanelfields.vue'
import filedtext from './filedtext'
import filedtextarea from './filedtextarea'
export default {
  name: '',
  middleware: 'authenticated',
  components: {
    Addpanel,
    Addpanelfields,
    filedtext,
    filedtextarea
  },
  data () {
    return {
      groupname: '',
      hasName: false,
      dialogfields: false,
      childitem: null,
      listData: []
      // listData: [
      //   {
      //     type: 'panel',
      //     name: '测试',
      //     index: 0,
      //     id: new Date().getTime(),
      //     children: [{
      //       type: 'text',
      //       name: 'xsa',
      //       index: 0,
      //       content: ''
      //     },
      //     {
      //       type: 'text',
      //       name: 'xsa',
      //       index: 1,
      //       content: ''

      //     }, {
      //       type: 'textarea',
      //       name: 'xsa',
      //       content: '',
      //       index: 2
      //     },
      //     {
      //       type: 'image',
      //       name: 'xsa',
      //       index: 3,
      //       content: ''
      //     }]
      //   },
      //   {
      //     type: 'panel',
      //     name: '测试',
      //     index: 1,
      //     id: new Date().getTime(),
      //     children: [{
      //       type: 'text',
      //       name: 'xsa',
      //       content: '',
      //       index: 0
      //     }]
      //   }
      // ]
    }
  },
  computed: {},
  watch: {
    // groupname () {
    //   // console.log(this.listData.find(item => item.name === '测试'))
    //   this.listData.find(item => item.name === this.groupname) ? this.hasName = true : this.hasName = false
    // }
  },
  created () {},
  mounted () {
    this.getListData()
  },
  methods: {
    getListData () {
      const name = 'customfields'
      const url = '/api/v1/customfields/read/' + name
      this.$axios
        .get(url)
        .then((res) => {
          this.listData = res.data
        })
        .catch((error) => {
          this.$toasted.error(error.response.data)
        })
    },
    deleteItem (children, idx) {
      children.splice(idx, 1)
      console.log(children, idx)
    },
    changeListData (obj) {
      console.log(obj)
      this.listData.push({
        type: 'panel',
        index: obj.index,
        name: obj.name,
        id: obj.id,
        children: []
      })
    }
  },
  head () {
    return {
      title: '自定义字段',
      meta: [
        { hid: 'description', name: 'description', content: '自定义字段' }
      ]
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
