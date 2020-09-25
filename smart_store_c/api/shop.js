import tui from '../common/httpRequest'

// 店铺信息
export function getShopInfo(shopId) {
  return tui.request(`/shop/info?shopId=${shopId}`, "GET")
}
// 客流数据--小时
export function getShopHourly(shopId) {
  return tui.request(`/shop/humancount/hourly?shopId=${shopId}`, "GET")
}
// 客流数据--天
export function getShopDaily({ shopId, begin, end }) {
  return tui.request(`/shop/humancount/daily?shopId=${shopId}&begin=${begin || ''}&end=${end || ''}`, "GET")
}