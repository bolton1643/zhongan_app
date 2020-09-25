// 获取支付宝订单号
export function aliPrepay(data) {
  return tui.request(`/alipay/prepay`, "POST", data)
}
// 获取微信订单号
export function wxPrepay(data) {
  return tui.request(`/wxpay/prepay`, "POST", data)
}