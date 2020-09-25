import tui from '../common/httpRequest'

// 店铺信息
export function getShopInfo(shopId) {
  return tui.request(`/shop/info/${shopId}`, "GET")
}
// 客流数据--小时
export function getShopHourly(shopId) {
  return tui.request(`/shop/humancount/hourly?shopId=${shopId}`, "GET")
}
// 客流数据--天
export function getShopDaily(data) {
  return tui.request(`/shop/humancount/daily`, "GET", data)
}
// 布撤防记录
export function getShopDeplotList(data) {
  return tui.request(`/shop/deploy/list`, "GET", data)
}
// 店铺套餐信息
export function getPackageInfo(data) {
  return tui.request(`/shop/packageInfo`, "GET", data)
}
// 套餐变更
export function changeShopCombo(data) {
  return tui.request(`/shop/combo/change`, "GET", data)
}