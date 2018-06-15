import axios from 'axios'
export var request = axios.create({
  baseURL: 'http://localhost:3000'
});
export var requestApi = function (_type, _url, _params) {
  // _params.xxx = '默认参数'
  if (!_params) {
    _params = {} // 防止 参数 underfind
  }
  return new Promise((resolve, reject) => {
    var _config = {}
    if (_type === 'get') { // get post 接收参数
      _config = {
        method: _type,
        url: _url,
        params: _params
      }
    } else {
      _config = {
        method: _type,
        url: _url,
        data: _params
      }
    }
    request(_config).then(res => {
      if (res.data.success) {
        resolve(res['data'])
      } else {
        // 全局处理错误
      }
    }).catch(err => {
      console.log(err)
    })
  })
}