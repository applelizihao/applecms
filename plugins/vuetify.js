import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})

const opts = {
  timeout: 2000
} // your options

const vueObj = new Vuetify(opts)

export default vueObj

Vue.use(VuetifyToast, { $vuetify: vueObj.framework })
