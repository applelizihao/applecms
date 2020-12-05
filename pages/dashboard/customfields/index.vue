<template>
  <div>
    <div class=" d-flex justify-space-between mb-4 align-end">
      <p>自定义字段设置</p>
      <div>
        <addpanel :save="save" :value="groupname" :changevalue="changevalue" :reg="hasName" />
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
            <v-btn color="info" class="d-inline-block" @click="dialogfields = true">
              添加字段
            </v-btn>
          </div>
          <div v-for="(child) in item.children" :key="child.index">
            <p class="mb-1">
              {{ child.name }}
            </p>
            <!-- 简单文本 type:text -->
            <template v-if="child.type == 'text'">
              <v-text-field
                solo
                dense
              />
            </template>
            <template v-if="child.type == 'textarea'">
              <v-textarea
                solo
                dense
              />
            </template>
            <template v-if="child.type == 'image'">
              <vueuploadimgs />
            </template>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <addpanelfields :dialogfields.sync="dialogfields" />
  </div>
</template>
<script>
import Addpanel from '../../../components/customfields/addpanel.vue'
import Addpanelfields from '../../../components/customfields/addpanelfields.vue'
export default {
  name: '',
  middleware: 'authenticated',
  components: { Addpanel, Addpanelfields },
  data () {
    return {
      groupname: '',
      hasName: false,
      dialogfields: false,
      listData: [
        {
          type: 'panel',
          name: '测试',
          index: 0,
          id: new Date().getTime(),
          children: [{
            type: 'text',
            name: 'xsa',
            index: 0
          },
          {
            type: 'text',
            name: 'xsa',
            index: 1
          }, {
            type: 'textarea',
            name: 'xsa',
            index: 2
          },
          {
            type: 'image',
            name: 'xsa',
            index: 3
          }]
        },
        {
          type: 'panel',
          name: '测试',
          index: 1,
          id: new Date().getTime(),
          children: [{
            type: 'text',
            name: 'xsa',
            index: 0
          }]
        }
      ]
    }
  },
  computed: {},
  watch: {
    groupname () {
      // console.log(this.listData.find(item => item.name === '测试'))
      this.listData.find(item => item.name === this.groupname) ? this.hasName = true : this.hasName = false
    }
  },
  created () {},
  mounted () {
    console.log(this.$refs)
    // console.log(this.listData.find(item => item.name === '测试'))
  },
  methods: {
    changevalue (value) {
      this.groupname = value
    },
    save () {
      let _index
      let _id
      if (this.listData.length > 0) {
        _index = 0
        _id = new Date().getTime()
      } else {
        _index = this.listData.length
        _id = new Date().getTime()
      }
      this.listData.push({
        type: 'panel',
        index: _index,
        name: this.groupname,
        id: _id,
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
