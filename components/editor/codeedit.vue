<template>
  <div>
    <div class="mb-3">
      当前文件名:{{ fileName }}
    </div>
    <client-only placeholder="Codemirror Loading...">
      <codemirror
        ref="myCm"
        :disable="true"
        :value="fileContent"
        :options="options"
        @keydown.s="saveFile"
        @ready="onCmReady"
        @focus="onCmFocus"
        @input="onCmCodeChange"
      />
    </client-only>
  </div>
</template>

<script>

export default {
  props: {
    fileContent: {
      type: String,
      default: ''
    },
    saveFile: {
      type: Function,
      default: null
    },
    nowfile: {
      type: Object,
      default: null
    },
    fileName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      options: {
        // 缩进格式
        mode: 'text/javascript',
        tabSize: 2,
        // 主题，对应主题库 JS 需要提前引入
        // theme: 'cobalt',
        // 显示行号
        lineNumbers: true,
        extraKeys: { Ctrl: 'autocomplete' }, // ctrl唤起智能提示
        line: true,
        hintOptions: { // 自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        }
      }
    }
  },
  computed: {

  },
  mounted () {
  },
  methods: {
    onCmReady (cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus (cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange (newCode) {
      // console.log(this.$refs.myCm.showHint())
      this.$emit('update:fileContent', newCode)
    }

  }
}
</script>
