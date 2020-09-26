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
//负责人修改
export function upadteOperator(param) {
  return tui.request('/shop/operator/update', 'POST', param)
}
//负责人删除
export function deleteOperator(param) {
  return tui.request('/shop/operator/delete', 'POST', param)
}
//上传图片
export function uploadImg(param) {
  return tui.uploadFile('/api/cuser/public/upload', param)
}
//设置布防时间
export function setDeployTime(param) {
  return tui.request('/shop/deploy/config', 'POST', param)
}
//报修申请
export function addRepairInfo(param) {
  return tui.request('/shop/repair/add', 'POST', param)
}
//理赔申报是需上传的资料获取
export function getClaimRequire(param) {
  return tui.request('/shop/claim/getRequire', 'GET', param)
}
//理赔明细
export function getClaimDetail(param) {
  return tui.request('/shop/claim/detail/' + param, 'GET')
}
//理赔申请
export function addClaim(param) {
  return tui.request('/shop/claim/add', 'POST', param)
}
//理赔信息列表
export function getClaimList(param) {
  return tui.request('/shop/claim/list', 'GET', param)
}
//设备列表
export function getDeviceList(param) {
  return tui.request('/shop/device/status', 'GET', param)
}
