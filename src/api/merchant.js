import { requestApi } from './ajax'
export const projectAdd = function (params) {
  return requestApi('post', '/basic', params)
}
export const projectVenueXx = function (params) {
  return requestApi('post', '/basic/xx', params)
}
export const projectList = function (params) {
  return requestApi('post', '/venue', params)
}
// POST
export const projectVenueDetail = function (params) {
  return requestApi('post', '/venue/des', params)
}
// POST
export const projectEdit = function (params) {
  return requestApi('post', '/basic/edit', params)
}
export const priceList = function (params) {
  return requestApi('post', '/price/area', params)
}
//
export const priceAddTime = function (params) {
  return requestApi('post', '/price/add/time', params)
}
export const priceAddTimeEdit = function (params) {
  return requestApi('post', '/price/add/time/edit', params)
}
// POST
export const priceAddSite = function (params) {
  return requestApi('post', '/price/add/site', params)
}
export const priceAddSiteEdit = function (params) {
  return requestApi('post', '/price/add/site/edit', params)
}
export const priceAddDayEdit = function (params) {
  return requestApi('post', '/price/add/day/edit', params)
}
export const priceAddDay = function (params) {
  return requestApi('post', '/price/add/day', params)
}
export const priceDetail = function (params) {
  return requestApi('post', '/price', params)
}
export const priceAddShare = function (params) {
  return requestApi('post', '/price/add/share', params)
}
export const priceEditShare = function (params) {
  return requestApi('post', '/price/edit/share', params)
}
export const orderOwner = function (params) {
  return requestApi('post', '/basic/order', params)
}
export const orderCheck = function (params) {
  return requestApi('post', '/basic/order/check', params)
}
export const orderRep = function (params) {
  return requestApi('post', '/basic/order/rep', params)
}
export const orderStatusSite = function (params) {
  return requestApi('post', '/statistic/basic', params)
}
export const orderStatusHour = function (params) {
  return requestApi('post', '/statistic/basic1', params)
}
export const orderStatusDays = function (params) {
  return requestApi('post', '/statistic/basic2', params)
}
export const orderStatusShare = function (params) {
  return requestApi('post', '/statistic/basic3', params)
}
//
export const disabledBuy = function (params) {
  return requestApi('post', '/statistic/basic/stop', params)
}
export const disabledBuyList = function (params) {
  return requestApi('post', '/statistic/basic/stop/list', params)
}
export const disabledBuyDele = function (params) {
  return requestApi('post', '/statistic/basic/stop/del', params)
}
export const basicePriceMethod = function (params) {
  return requestApi('post', '/statistic/basic/stop/price_method', params)
}

export const basiceTopOrder = function (params) {
  return requestApi('post', '/statistic/basic/top/order/info', params)
}
export const tradeOrder = function (params) {
  return requestApi('post', '/trade/wx/order', params)
}
export const tradeOrderDele = function (params) {
  return requestApi('post', '/statistic/basic/del/order', params)
}
export const getCouponList = function (params) {
  return requestApi('post', '/admin/coupon/basic/', params)
}
//
export const addCoupon = function (params) {
  return requestApi('post', '/admin/coupon/conf', params)
}
//
export const deleCoupon = function (params) {
  return requestApi('post', '/admin/coupon/conf/del', params)
}
export const getHourList = function (params) {
  return requestApi('post', '/statistic/merchant/hour', params)
}
export const delePrice = function (params) {
  return requestApi('post', '/price/edit/del', params)
}
export const regionInfo = function (params) {
  return requestApi('post', '/admin/region/info', params)
}
export const regionAdd = function (params) {
  return requestApi('post', '/admin/region/set', params)
}
export const regionDele = function (params) {
  return requestApi('post', '/admin/region/info/del', params)
}
export const topOrderList = function (params) {
  return requestApi('post', '/statistic/basic/price/site/order', params)
}
export const userManageList = function (params) {
  return requestApi('post', '/user/sub/list', params)
}
export const permissionList = function (params) {
  return requestApi('post', '/user/permission/list', params)
}
export const userAdd = function (params) {
  return requestApi('post', '/user/sub', params)
}
export const userEdit = function (params) {
  return requestApi('post', '/user/sub/edit', params)
}
export const basicOrderPrice = function (params) {
  return requestApi('post', '/basic/order/price', params)
}
export const memberInfo = function (params) {
  return requestApi('get', '/trade/wx/vip/info', params)
}
