import axios from 'axios'
import ElementUI from 'element-ui'
import config from './../config'
import Vue from 'vue'
Vue.use(ElementUI)
let self = new Vue()
export const requestApi = function (_type, _url, _params, _root) {
  // _params.xxx = '默认参数'
  if (!_params) {
    _params = {} // 防止 参数 underfind
  }
  _params.adminId = localStorage.getItem('kzid')
  for (let key in _params) {
    if (_params.hasOwnProperty(key)) {
      if (_params[key] === undefined || _params[key] === null || _params[key] === '') {
        delete _params[key]
      }
    }
  }
  _url = (_root || config.apiRoot) + _url
  return new Promise((resolve, reject) => {
    var _config = {
      url: _url,
      headers: {
        token: localStorage.getItem('kztoken') || ''
      },
      withCredentials: true
    }
    if (_type === 'get') { // get post 接收参数
      _config.method = 'get'
      _config.params = _params
    } else {
      _config.method = 'POST'
      _config.data = _params
    }
    axios.interceptors.response.use(function (response) {
      // if (response.data && response.data.resultCode === '403') {
      //   window.location.href = config.pirosLogin
      // } else {
      return response
      // }
    }, function (error) {
      // if (error.response && error.response.status === 401) {
      //   // 未登录处理
      // } else {
      return Promise.reject(error)
      // }
    })
    return axios(_config).then(res => {
      if (res.data.flag) {
        resolve(res['data'])
      } else {
        self.$message.error(res.data.errorMessage)
        if (res.data.statusCode === '510025') {
          window.location.href = '/'
        }
        reject(res.data)
      }
    }).catch(err => {
      console.log(err)
    })
  })
}
