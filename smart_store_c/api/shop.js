import tui from '../common/httpRequest'

// 店铺信息
export function getShopInfo(shopId) {
  return tui.request("/shop/info/" + shopId, "GET")
}
// 客流数据--小时
export function getShopHourly(shopId) {
  return tui.request(`/shop/humancount/hourly/${shopId}`, "GET")
}