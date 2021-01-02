// /*
//  * @Description:
//  */

// import axios from 'axios'
// import qs from 'qs'
// // Toast.allowMultiple();
// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '' // url = base url + request url
//   // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   // timeout: 5000, // request timeout
// })

// service.interceptors.request.use(
//   (config) => {
//     console.log('config', config)
//     if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
//       config.data = qs.stringify(config.data)
//     }
//     return config
//   },
//   (error) => {
//     // Toast('出错了')
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//    */
//   (response) => {
//     console.log('response', response)
//     const res = response.data
//     console.log('res-----', res)
//     // if the custom code is not 20000, it is judged as an error.
//     if (response.status !== 200) {
//       // return Promise.reject(new Error('请求错误'))
//       return {
//         code: -1,
//         message: '请求错误',
//         res
//       }
//     } else {
//       // return res
//       return {
//         code: 0,
//         message: '',
//         res
//       }
//     }
//     // const res = response.data
//     // console.log('res-----', res);
//     // Toast.clear();
//     // return res
//   },
//   (error) => {
//     // Toast('err' + error)
//     // Toast.clear()
//     console.error('err' + error) // for debug
//     return Promise.resolve(error)
//   }
// )

// export default service
