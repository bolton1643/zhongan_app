import tui from '../common/httpRequest'

// 布撤防记录
export function getDeployList(param) {
  return tui.request('/shop/deploy/list', 'GET', param)
}
// 负责人列表
export function getOperatorList(param) {
  return tui.request('/shop/operator/list', 'GET', param)
}
//负责人新增
export function addOperator(param) {
  return tui.request('/shop/operator/add', 'POST', param)
}
