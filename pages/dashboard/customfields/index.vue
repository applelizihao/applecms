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
        <v-expansion-panel-header>
          {{ item.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
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
  </div>
</template>
<script>
import Addpanel from '../../../components/customfields/addpanel.vue'
export default {
  name: '',
  middleware: 'authenticated',
  components: { Addpanel },
  data () {
    return {
      groupname: '',
      hasName: false,
      listData: [
        {
          type: 'panel',
          name: '测试',
          index: 0,
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
          name: '测试组2',
          index: 0,
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
        }
      ]
    }
  },
  computed: {},
  watch: {
    groupname () {
      console.log(this.listData.find(item => item.name === '测试'))
      this.listData.find(item => item.name === this.groupname) ? this.hasName = true : this.hasName = false
    }
  },
  created () {},
  mounted () {
    console.log(this.listData.find(item => item.name === '测试'))
  },
  methods: {
    changevalue (value) {
      this.groupname = value
    },
    save () {
      console.log('321312')
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
