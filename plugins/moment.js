import Vue from 'vue'
const moment = require('moment')

Vue.filter('utcTime', function (value) {
  if (!value) { return }
  return moment.utc(value).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
})

Vue.filter('fromNow', function (value) {
  if (!value) { return }
  return moment.utc(value).fromNow()
})
