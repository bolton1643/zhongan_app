import request from '@/common/httpRequest.js'
// import { formatGetUri } from '@/common/util.js'

const api = {}
// POST请求方式
api.login = params => request.request(`/api/tuser/appTUser/login`, 'POST', params, false,false)
// 注册
api.register = params => request.request(`/api/tuser/appTUser/register`, 'POST', params, false,false)
/*----------------------------------公共------------------------------------*/
// 获取验证码
api.vCode = params => request.request(`/api/tuser/public/vCode`, 'GET', params, false,false)
// 获取礼包信息
api.gift = params => request.request(`/api/tuser/public/gift`, 'GET', params, false,false)
// 获取礼包信息
api.gift = params => request.request(`/api/tuser/public/gift`, 'GET', params, false,false)
// 获取套餐信息
api.package = params => request.request(`/api/tuser/public/package`, 'GET', params, false,false)
// 获取店铺类型
api.shopList = params => request.request(`/api/tuser/public/shopList`, 'GET', params, false,false)

/*----------------------------------新增------------------------------------*/
// 申请成为城市合伙人
api.partnerApply = params => request.request(`/api/tuser/appTUser/partnerApply`, 'POST', params, false,false)
// 到店新增
api.process = params => request.request(`/api/tuser/shop/process`, 'POST', params, false,false)
// 店铺设备新增
api.deviceAdd = params => request.request(`/api/tuser/shop/deviceAdd`, 'POST', params, false,false)
// 警情处理
api.alarmProcess = params => request.request(`/api/tuser/shop/alarm/process`, 'POST', params, false,false)
// 获取支付宝订单号
api.prepay = params => request.request(`/api/tuser/alipay/prepay`, 'POST', params, false,false)

/*----------------------------------查询------------------------------------*/
// 门店首页统计信息
api.stats = params => request.request(`/api/tuser/shop/stats`, 'GET', params, false,false)
// 店铺列表
api.shopLists = params => request.request(`/api/tuser/shop/shopList`, 'GET', params, false,false)
// 店铺设备
api.deviceList = params => request.request(`/api/tuser/shop/deviceList`, 'GET', params, false,false)
// 申请列表
api.applyList = params => request.request(`/api/tuser/shop/applyList`, 'GET', params, false,false)
// 消息获取
api.alarmMessage = params => request.request(`/api/tuser/shop/alarmMessage`, 'GET', params, false,false)
// 消息获取
api.earningList = params => request.request(`/api/tuser/income/earningList`, 'GET', params, false,false)
// 我的金豆
api.incomeList = params => request.request(`/api/tuser/income/list`, 'GET', params, false,false)
// 维修信息列表
api.repairList = params => request.request(`/api/tuser/shop/repair/list`, 'GET', params, false,false)
// 维修信息详情
api.repairDetail = params => request.request(`/api/tuser/shop/repair/detail`, 'GET', params, false,false)
// 维修信息处理
api.repairProcess = params => request.request(`/api/tuser/shop/repair/process`, 'GET', params, false,false)
// 告警信息列表
api.alarmList = params => request.request(`/api/tuser/shop/alarm/list`, 'GET', params, false,false)
// 告警信息详情
api.alarmDetail = params => request.request(`/api/tuser/shop/alarm/detail`, 'GET', params, false,false)
// 套餐变更列表
api.combochangeList = params => request.request(`/api/tuser/shop/combochange/list`, 'GET', params, false,false)
// 套餐当前详情
api.combochangeDetail = params => request.request(`/api/tuser/shop/combochange/detail`, 'GET', params, false,false)
// 套餐变更处理
api.combochangeProcess = params => request.request(`/api/tuser/shop/combochange/process`, 'POST', params, false,false)
// 申请单处理
api.fellow = params => request.request(`/api/tuser/shop/fellow`, 'POST', params, false,false)

export default api