import createPersistedState from 'vuex-persistedstate'

export default (context) => {
  window.onNuxtReady((nuxt) => {
    createPersistedState({
      reducer (obj) {
      // 其中 authorization  为需要自动存储的 state
        const { token } = obj
        return { token }
      }
    })(context.store)
  })
}
