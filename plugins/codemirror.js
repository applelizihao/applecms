
import Vue from 'vue'
if (process.browser) {
  const VueCodemirror = require('vue-codemirror')
  require('codemirror/mode/javascript/javascript.js')
  require('codemirror/mode/css/css.js')
  require('codemirror/mode/xml/xml.js')
  require('codemirror/mode/clike/clike.js')
  require('codemirror/mode/markdown/markdown.js')
  require('codemirror/mode/python/python.js')
  require('codemirror/mode/r/r.js')
  require('codemirror/mode/shell/shell.js')
  require('codemirror/mode/sql/sql.js')
  require('codemirror/mode/swift/swift.js')
  require('codemirror/mode/vue/vue.js')
  Vue.use(VueCodemirror)
}
