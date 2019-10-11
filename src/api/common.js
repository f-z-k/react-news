import { requestApi } from './ajax'
export const login = function (params) {
  return requestApi('post', '/admin/login', params)
}
export const getCode = function (params) {
  return requestApi('post', '/admin/pwd/sms', params)
}
export const forgetPwd = function (params) {
  return requestApi('post', '/admin/pwd', params)
}
export const loginOut = function (params) {
  return requestApi('post', '/admin/loginout', params)
}
export const getUserInfo = function (params) {
  return requestApi('post', '/admin/info', params)
}
export const userInfoModitify = function (params) {
  return requestApi('post', '/admin/info/moditify', params)
}
export const areaProvince = function (params) {
  return requestApi('get', '/area/province', params)
}
export const areaCity = function (params) {
  return requestApi('get', `/area/city/${params.id}`)
}
export const areaArea = function (params) {
  return requestApi('get', `/area/area/${params.id}`)
}
export const equipmentList = function (params) {
  return requestApi('post', '/equipment', params)
}
//
export const projectList = function (params) {
  return requestApi('post', '/pro/main', params)
}
