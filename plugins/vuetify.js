import Vue from 'vue'
// register the plugin on vue
import Toasted from 'vue-toasted'

// you can also pass options, check options reference below
Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 300000,
  className: 'vue-toasted'
})
