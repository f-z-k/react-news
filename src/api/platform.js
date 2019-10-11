
import { requestApi } from './ajax'
export const getFiled = function (params) {
  return requestApi('post', '/filed/filed', params)
}
export const filedCheck = function (params) {
  return requestApi('post', '/filed/check', params)
}
//
export const demandList = function (params) {
  return requestApi('post', '/demand/list', params)
}
//
export const demandHandle = function (params) {
  return requestApi('post', '/demand/handle', params)
}
//
export const bannerInfoList = function (params) {
  return requestApi('post', '/banner/info/list', params)
}
//
export const bannerInfoAdd = function (params) {
  return requestApi('post', '/banner/info', params)
}
export const bannerInfoEdit = function (params) {
  return requestApi('post', '/banner/info/edit', params)
}
//
export const bannerInfoDetail = function (params) {
  return requestApi('get', `/banner/info/${params.id}`, params)
}
// GET del/{id}
export const bannerInfoPublish = function (params) {
  return requestApi('get', `/banner/info/del/${params.id}`, params)
}
//
export const merchantInfo = function (params) {
  return requestApi('post', '/statistic/merchant/info', params)
}
export const merchantFreeze = function (params) {
  return requestApi('post', '/statistic/merchant/freeze', params)
}
export const commEdit = function (params) {
  return requestApi('post', '/admin/comm/conf/edit', params)
}
export const commCofGet = function (params) {
  return requestApi('post', '/admin/comm/conf/get', params)
}
export const ptDtList = function (params) {
  return requestApi('post', '/pt/dt/list', params)
}
export const ptBussList = function (params) {
  return requestApi('post', '/pt/buss/list', params)
}
export const ptCgList = function (params) {
  return requestApi('post', '/pt/cg/list', params)
}
export const ptCgUserList = function (params) {
  return requestApi('post', '/pt/cg/user/list', params)
}
export const getFeedList = function (params) {
  return requestApi('post', '/user/sc/list', params)
}
