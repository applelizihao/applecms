import $axios from 'axios'
import Vue from 'vue'
import {
  extend,
  ValidationProvider,
  localize
} from 'vee-validate'
import {
  required,
  email,
  min,
  max
} from 'vee-validate/dist/rules'
// eslint-disable-next-line camelcase
import zh_CN from 'vee-validate/dist/locale/zh_CN.json'
localize({
  zh_CN: {
    names: {
      username: '账户名',
      password: '密码'
    }
  }
})
localize('zh_CN', zh_CN)
Vue.component('ValidationProvider', ValidationProvider)

const delay = 300

extend('email', email)
extend('required', required)
extend('min', min)
extend('max', max)

let userTimeOut = null
let userTimeCheck = true
extend('checkHasUser', {
  validate (value) {
    const promise = new Promise(function (resolve, reject) {
      clearTimeout(userTimeOut)
      if (!userTimeCheck) {
        return
      }
      userTimeOut = setTimeout(() => {
        const url = '/api/v1/auth/check'
        const params = {
          username: value
        }
        $axios
          .get(url, {
            params
          })
          .then((res) => {
            resolve('已经注册过了,请重新选个名字')
          })
          .catch(() => {
            resolve(true)
          })
          .finally(() => {
            userTimeCheck = true
          })
      }, delay)
    })
    return promise.then((val) => {
      return val // val值取反
    })
  }
})
