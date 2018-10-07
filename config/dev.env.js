// 此处是开发时的配置信息,请确认服务器与本地代码同步后再进行更改地址
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_URL: '"http://10.35.44.227:8080"'   //rest后台测试url
  // BASE_URL: '"http://58.251.138.41:8083/api"'  //rest后台外网部署url
  // BASE_URL: '"http://192.168.1.115:8082/maluyixie/member/"'
  BASE_URL: '"http://localhost:2019"'
  // BASE_URL: '"http://192.168.1.102:8082/maluyixie/member/"'        //rest后台内网部署url
})
