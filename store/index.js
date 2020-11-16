import * as Cookies from 'js-cookie'

export const state = () => ({
  token: null,
  user: {
    image: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3807427310,283445384&fm=26&gp=0.jpg'
  }
})

export const mutations = {
  SET_TOKEN (state, value) {
    // image测试值,后期可删除
    state.user.image = 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3807427310,283445384&fm=26&gp=0.jpg'
    state.token = value
    Cookies.set('token', value, { expires: 1, secure: false })
  },
  DELETE_TOKEN (state) {
    state.token = null
    state.user = {}
    Cookies.remove('token')
  }
}
