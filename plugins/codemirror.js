
import Vue from 'vue'
import 'codemirror/theme/ambiance.css' // 这里引入的是主题样式，根据设置的theme的主题引入，一定要引入！！
require('codemirror/mode/javascript/javascript') // 这里引入的模式的js，根据设置的mode引入，一定要引入！！
const VueCodemirror = require('vue-codemirror')

Vue.use(VueCodemirror)
