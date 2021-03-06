
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - 后台管理',
    title: '博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '博客管理系统' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    'vxe-table/lib/style.css',
    'mavon-editor/dist/css/index.css',
    // lib css
    'codemirror/lib/codemirror.css',
    // merge css
    'codemirror/addon/merge/merge.css',
    // theme css
    'codemirror/theme/base16-dark.css'
  ],
  render: {
    resourceHints: false
  },
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '@/plugins/toasted', ssr: false },
    { src: '@/plugins/persistedState.js', ssr: false },
    { src: '@/plugins/axios' },
    { src: '@/plugins/vue-markdown.js', ssr: false },
    { src: '@/plugins/vueuploadimgs.js', ssr: false },
    { src: '@/plugins/moment.js', ssr: false },
    { src: '@/plugins/codemirror.js', ssr: false },
    { src: '@/plugins/vex-table' },
    { src: '@/plugins/contextmenu.js', ssr: false }
  ],
  loading: {
    color: 'blue',
    height: '2px'
  },
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true // Can be also an object with default options
  },
  proxy: {
    '/api/': 'http://35.241.66.226:8000/'
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    // customVariables: ['~/assets/variables.scss'],
    // theme: {
    //   dark: false,
    //   options: {
    //     cspNonce: 'dQw4w9WgXcQ'
    //   },
    //   themes: {
    //     dark: {
    //       primary: colors.blue.darken2,
    //       accent: colors.grey.darken3,
    //       secondary: colors.amber.darken3,
    //       info: colors.teal.lighten1,
    //       warning: colors.amber.base,
    //       error: colors.deepOrange.accent4,
    //       success: colors.green.accent3
    //     }
    //   }
    // }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: {
      ignoreOrder: true
    },
    transpile: ['vee-validate/dist/rules', 'vee-validate/dist', 'vue-markdown/dist']
  }
}
