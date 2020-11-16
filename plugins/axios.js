import * as Cookies from 'js-cookie'
export default function ({ store, redirect, req, router, app: { $axios } }) {
  // request拦截器
  $axios.onRequest((config) => {
    // 将获取到token加入到请求头中
    config.headers.common.Authorization = Cookies.get('token')
  })
}
