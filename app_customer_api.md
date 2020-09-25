## API说明



```
接口分为三个部分，前缀分别为
* /api
* /api/cuser
* /api/tuser
对应web,APP C端(商户)，APP T端(合伙人)

  前置条件，除登录、获取验证码接口外，所有调用接口必须在请求的headerz中增加参数与值
  X-Access-Token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU4NTE4NDQsInVzZXJuYW1lIjoiYWRtaW4ifQ.-ujBuq4Bnx--Vhy_amoKjDoJnIcnoevurNqTS_Bfbnk
  token为登录时返回值
  非get请求，请求body为json对象，所有请求Content-Type: application/json
  返回的结果，为json格式。包含字段至少包含status/timestamp/message等字段。status值参考标准http协议，非200，可认为出错，错误信息读取message字段。如status字段值为200，表示请求正确。具体返回值参考result字段。

成功样例
{
	"success":true,
	"message":"操作成功！",
	"status":200,
	"result":{
	  "records":[{"updateTime":"2020-08-08 19:31:23","custName":"张三1",...},...],
	   "total":26,                --总记录数
	   "size":10,                 --每页数量
	   "current":1,               --当前页码
	   "orders":[],
	   "optimizeCountSql":true,
	   "hitCount":false,
	   "searchCount":true,
	   "pages":3                  --总页数
	 },
	 "timestamp":1597315924096
}
出错样例
{
  "timestamp":"2020-07-27 20:05:21",
  "status":500,
  "message":"Token失效，请重新登录",
  "path":"/jeecg-boot/sys/annountCement/listByUser"
}
```



### C端

```
 商户版接口，默认请求前缀都需要加下 /api/cuser，结合下面具体接口的url
```



### 公共接口



#### 获取验证码

```
获取验证码，返回status 200即可，通过短信接收验证码
url: /public/vCode
method: get
params: cellphone=**&type=**
cellphone: 接收验证码手机号码，必填
type: 选填，当为空时，默认为注册验证码，type=reset时，为重置密码时使用，按重置密码模板使用。type=apply时，店铺新增时使用
--
返回报文
{
	"status":200
}
```
#### 服务详情信息(待完成)
获取服务介绍，目前暂时放在前端写死。
url: /public/service
method: get

--

返回报文

#### 上传图片
```
url: /public/upload
method: post
header: Content-Type: multipart/form-data;
params: file=***

```

#### 预览图片
```
url: /public/images/**
文件名为上传后返回，或作为表单数据中的图片字段，需要预览时
```



####  开机画面

```
url: /public/splash
method: get
--返回报文
{
   result: --开机画面链接
}
```



#### 获取服务详情(未测)

```
url: /public/introduction
method: get
--返回报文
{
	result: {
		video: ***  --视屏链接
		images: [
			{
				image: 图片
				title:标题,
				content: ...
			},...]   --长度固定为4个
		promotion: *** --活动详情
	}
}
```



### 消息相关

#### websocket

```
url: /cuser/websocket/{userphone} 路径后面有用户手机号
--推送消息
{
  msgType: --消息类型，根据消息类型不行，data有不同值的形态
  data: {}
}
当msgType=1000时，表示是支付推送消息，门店新增已受理，输入必要信息，这里的消息为订单号，金额及门店相关信息


```



#### 消息汇总

```
url /message/stats
method: get
params: shopId=**
--响应报文
{
	status: 200
	result: [{type:消息类型 1-4:对应告警、布撤防、月报、活动
			total: 总数
			unRead: 未读数量
		}
	]
}
```



#### 服务月报 (未完成，列表/明细)

#### 活动介绍(未完成，列表/明细)

#### 布撤防信息(未完成，列表/明细)

#### 告警信息列表





### 用户相关

#### 注册接口

```
注册接口，密码要求8-16位数字字母组合
url: /user/register
method: post
请求报文
{
	phone:***,     --手机号，必填
	captcha:***,    --验证码，必填
	password:***,   --密码md532位编号，小写，必填
	introduer: ***  --介绍人手机号码，选填
}
--
返回报文
{
	status: 200

}
```

#### 重置密码(未测)
```
密码重置要求，密码要求参考注册
url: /user/resetpassword
method: post
请求报文
{
	phone:***,    --手机号,必填
	captcha:***    --验证码,必填
	password:***   --新密码,必填
}
--
返回报文
{
	"status": 200
}
```

#### 登录
```
登录后返回个人信息及启动广告页,token
url: /user/login
method: post
请求报文
{
	phone:***,  --手机号，必填
	password:***,--密码必填
}

--
返回报文
{
	status: 200,
	result: {
		token: ***,   --对应的token
		userInfo: {
			phone: --手机号码
			name: 姓名
			role: 1|2,管理员,一般操作员
			videoFlag: 0|1,是否具备查看视频权限
		},
		application: { --新店申请

		},
		shopList: [{
          		 "id": "1297535484121083905",
                "createTime": "2020-08-23 22:05:41",
                "shopName": "吴文彬的店铺",
                "shopNo": "000000",
                "provinceCityCounty": null,
                "addr": "祥茂路77号",
                "shopType": "企业",
                "manager": null,
                "managerPhone": null,
                "contact1Name": null,
                "contact1Phone": "13588826451",
                "contact2Name": null,
                "contact2Phone": "13588826451",
                "armingStatus": "1",

                "comboId": "1294210439211507714",
                "comboName": 套餐名称,
                "comboContent": "{\"devices\":[{\"amount\":1,\"deviceType\":\"1\",\"id\":\"15971299552310371342\",\"name\":\"华为好望AI摄像头\",\"price\":200}],\"id\":\"1294210439211507714\",\"packageName\":\"套餐一\",\"serviceDuration\":1,\"serviceEffectiveDate\":1569164530425,\"serviceExpireDate\":1600786930425,\"services\":[{\"amount\":2,\"id\":\"15975454349840434489\",\"insurance\":0,\"name\":\"综合服务费\",\"price\":560}]}",
                "serviceEffectiveDate": 服务生效时间
                "serviceDuration": 服务时效时间
                "serviceExpireDate": 服务失效时间
                "serviceStatus": 失效与否状态
                "coordinate": "3",
                "latitude": "30.336701",
                "longitude": "120.111691",
                "benifitName": 受益人
                "benifitPhone": 受益人电话
                "shopPhoto": --门店图片
                "notes": 备注,
                "deployTime": --部放时间,
                "undeployTime": --撤防时间,
                "armingPhoto": 防区图
            }
		},...] --已有店铺
	}
}
```



### 支付相关

#### 获取支付宝订单号

```
url: /alipay/prepay
method: post
请求报文
{
	applyId: ** 后台通过消息推送或自己获取未支付的标识。T端用户在到店选择套餐、安装后，会进行推送相应的待支付消息。
	totalAmount: **总金额，单位为元。 后端会根据applyId，与totalAmount进行校验。
}
--返回报文
{
	 status:
   result: {
   	outTradeNo: 自己平台订单号。
   	tradeNo: 支付宝平台订单号。
   	totalAmount: 金额，单位为元。精确到小数点两位。
   }
}
```



#### 获取微信订单号

```
url: /wxpay/prepay
method: post
请求报文
{
	applyId: ** 后台通过消息推送或自己获取未支付的标识。T端用户在到店选择套餐、安装后，会进行推送相应的待支付消息。
	totalAmount: **总金额，单位为元。 后端会根据applyId，与totalAmount进行校验。
}
--返回报文
{
	 status:
   result: {
   	outTradeNo: 自己平台订单号。
   	prepayID: 微信平台订单号。
   	totalAmount: 金额，整数，单位为分。
   }
}
```





###   店铺相关

#### 特惠购买(新店开通申请)

```
url: /shop/apply
method: post
请求报文
{
	phone:***     --手机号，这里界面默认填入注册时的号码
	manager:***    --姓名,必填
	captcha:***    --验证码，必填
	province_city_county: *** --省市区 ，标准编码格式，如330102 浙江省杭州市上城区。
	addr: ***      --详细地址,必填
	notes:***      --备注,
}
--
返回报文
{
	status: ***
}

```



#### 店铺信息

```
url: /shop/info/{shopId}
method: get
路径最后一个值为门店的标识

--返回报文
{
	status: **
	result: {
    shopName--店铺名称，必填。
    provinceCityCounty--区域，必填。标准编码格式，如330102 浙江省杭州市上城区。
    addr--详细地址，必填。
    addrNote --位置备注
    longitude --经度
    latitude --纬度
    coordinate --坐标系 1:百度 2:腾讯 3:高德 4:谷歌
    shopType--店铺典型
    manager--负责人
    managerPhone--负责人电话
    benifitPhone--受益人姓名
    benifitName--受益人电话
    contact1Name--联系姓名
    contact1Phone--联系人电话
    contact2Name--联系姓名
    contact2Phone--联系人电话
    contact3Name--联系姓名
    contact3Phone--联系人电话
    serviceEffectiveDate--服务生效时间yyyy-mm-dd
    serviceDuration--服务年限
    armingStatue--布撤防状态 0 撤防，1布防
    comboContent--套餐内容，含额外数据 。格式如下
     {
      id: --套餐标识
      totalMoney:  --计算后的价格，前端统计，后端会根据信息进行校验
        packageName: --套餐名称
        deviceMoney: --设备价格
        serviceMoney: --服务价格

        devices: [{
	          deviceType: 1 --设备，2烟感 3 门磁
            name: --设备名称
            price: --价格
            amount: 数量，这里默认一份
        },...]
        services: [{
            serviceType: 1--保险  2.服务
            name: --服务名称
            price: --服务年费
            amount: --数量，这里默认一份
        }],
        extraDevices:[]  --参照devices，数量可以多个
        extracServices: [] --参照services，数量可以多份
   },
	 shopPhoto--对应图片 ，格式如下
       {
         gate: 门头照
         innerView: 内景
         innerView2:内景
         guard: 防区图
         id1: 身份证
         id2: 身份证
       }
	},
	devices: [{
		id:--
		zhanyeId: 展业设备id
		deviceType:
		deviceName: 名称
		deviceBrand: 品牌
	},...]
}
```



#### 店铺套餐信息

```
url: /shop/packageInfo
method: get
params: shopId=*** 店铺标识
--返回报文
{
	status:
	result: {
			id: --套餐标识
      totalMoney:  --计算后的价格，前端统计，后端会根据信息进行校验
      packageName: --套餐名称
      deviceMoney: --设备价格
      serviceMoney: --服务价格
	    serviceEffectiveDate--服务生效时间yyyy-mm-dd
    	serviceDuration--服务年限
    	insuranceEffectiveDate--保险生效时间
    	insuranceDuration--保险年限
    	benifitName--受益人
    	shopOwner--投保人
      devices: [{
      			id: 标识
            deviceType: 1 --设备，2烟感 3 门磁
            name: --设备名称
            price: --价格
            amount: 数量，这里默认一份
       },...]
       services: [{
            id: 标识
            name: --服务名称
            price: --服务年费
            amount: --数量，这里默认一份
            insurance: 0|1 1为保险
       }],
       extraDevices:[]  --参照devices，数量可以多个
       extracServices: [] --参照services，数量可以多份
	}
}
```



#### 客流数据--小时



```
url: /shop/humancount/hourly
method: get
params: shopId=*

--返回报文
{
	status: 200
  result:{
  		todayTotal: 今日客流
	  	yestTotal: 昨日客流
		  ratioTotal:环比客流
      todaySerial:[{
				hour:--时间，0-23
				totalAmount：--每个时段客流人数
			}]
			yestSerial:[{
				hour:--时间，0-23
				totalAmount：--每个时段客流人数
		}]
	}
}
```


客流数据--天

```
url: /shop/humancount/daily
method: get
params: shopId=*&begin=&end= (时间yyyy-MM-dd格式，可不填，默认近10天。)

--返回报文
{
	status: 200
  result:[{
				date: 日期 yyyyMMdd 格式
				totalAmount：--每天人数
	},..]
}
```



#### 布撤防（ok)

```
url: /shop/deploy/set
method: get
params: shopId=**&flag=**  flag=0标识撤防，1标识布防

--返回报文
{
	status:
}
```



#### 布撤防记录（ok)

```
url: /shop/deploy/list
method: get
params: shopId=***&start=***&end=****&pageNo&pageSize 门店标识，开始时间，结束时间,时间格式 yyyy-MM-dd hh:mm:ss。
--返回报文
{
	result:{
	  "records":[{"opDate":"2020-08-08 19:31:23", --操作时间
	  		"deploy": 1布防|0撤防
	  		"operator": 操作人},...],
	   "total":26,                --总记录数
	   "size":10,                 --每页数量
	   "current":1,               --当前页码
	   "pages":3                  --总页数
	 },
}
```



#### 布撤防时间段设置（ok)

```
url: /shop/deploy/config
method: post
请求报文
{
	shopId: 门店标识
	deployTime: 布防时间  yyyy-MM-dd HH:mm:ss
	undeployTime: 撤防时间 yyyy-MM-dd HH:mm:ss
}
```



#### 设备状态

```
url: /shop/device/status
method: get
params: shopId=**  门店标识
--返回报文
{
	result:[ {
		deviceName: *** --设备名称
		status: *** --状态 离线|在线
	},...]
}
```



#### 负责人新增（ok)

```
url: /shop/operator/add
method: post
请求报文
{
   shopId: --申请门店
   name: --姓名
   phone: --手机号码
   role: --1|2 ， 1.管理员.2操作员
   password: 密码，md5加密
   videoFlag: --0|1  是否可以查看视频
   photo: --照片，一张
}
--返回报文
{
	result: {
		userId: --操作人员id
	}
}
```



#### 负责人修改（ok)

```
url: /shop/operator/upadte
method: post
请求报文
{
   userId: --负责人标识
   name: --姓名
   phone: --手机号码
   role: --1|2 ， 1.管理员.2操作员
   videoFlag: --0|1  是否可以查看视频
   photo: --照片，一张
}
--返回报文
{
  status: 200
}
```



#### 负责人删除（ok)

```
url: /shop/operator/delete
method: post
请求报文
{
   userId: --负责人标识
}
--返回报文
{
  status: 200
}
```



#### 负责人信息（ok)

```
url: /shop/operator/list
method: get
请求报文
{
   shopId: --店铺标识
}
--返回报文
{
  status: 200
  result: [{
    id: --标识
  	name: --姓名
  	phone: --手机号码
  	role: --1|2 ， 1.管理员.2操作员
  	videoFlag: --0|1  是否可以查看视频
    photo: --照片，一张
  },...]
}
```



#### 理赔申报是需上传的资料获取（ok)

```
url: /shop/claim/getRequire
method: get
--返回报文
{
	result: [{
		title: --标题, ex.出警回执|被盗清单
		require: --是否必填0|1
	},...]
}
```



#### 理赔信息列表（ok)

```
url: /shop/claim/list
method: get
params: pageNo=**&pageSize**&shopName=**(店铺名称或编码)&status=**(状态),参数均可选。
--返回报文
{
	result: {
		records:[{
			{
				shopId:--店铺标识
				shopName:--店铺名称
				shopNo--店铺编号
				stolenDate--被盗日期
				claimAmount--申报金额
				photo--图片
				status--状态
				payAmount--理赔金额
			}
		},...],
		total:26,                --总记录数
	  size:10,                 --每页数量
	  current:1,               --当前页码
	  pages:3                  --总页数
	}
}
```



#### 理赔申请（ok)

```
url: /shop/claim/add
method: post
请求报文
{
   shopId: --申请门店
   stolenDate: --被盗日志  yyyy-MM-dd hh:mmss
   claimAmount: 理赔金额(元)
   photo: [{
   	title: --标题
   	image:**--图片
   },...]
}

--返回报文
{
	result: {
		claimId: --理赔标识
	}
}
```



#### 报修申请（ok)

```
url: /shop/repair/add
method: post
{
   shopId: --申请门店，必填
   content: --报修内容，必填
   photo: [image1,...], 图片数组，最多5张，必填
}

--返回报文
{
	result: {
		repairId: --维修标识
	}
}
```



#### 报修信息列表（ok)

```
url: /shop/repair/list
method: get
params: pageNo=**&pageSize**&shopName=**(店铺名称或编码)&repairStatus=**(状态0|1，未维修，已维修),参数均可选。
--返回报文
{
	result: {
		records:[{
			{
				shopId:--店铺标识
				shopName:--店铺名称
				shopNo--店铺编号
				reportBy:--报修人
				reportDate:--报修日期
				reportDesc:--报修内容
				reportPhoto：--报修图片
				repairStatus:--报修状态
				repairBy:--维修人
				repairDate:--维修日期
				repairQuality--维修质量
				repairSpeed--相应速度
				repairAttitude--态度
        repairDesc:--维修内容
        repairPhoto:--维修图片
				remarkDesc--维修评价
			}
		},...],
		total:26,                --总记录数
	  size:10,                 --每页数量
	  current:1,               --当前页码
	  pages:3                  --总页数
	}
}
```



#### 套餐续费

```

```



#### 套餐变更

```
url: /shop/combo/change
method: get
params: shopId=** 门店信息
--返回报文
{
	status
}
```





### 结算相关

#### 我的邀请

```
url: /pay/invitation/list
method: get
params: pageNo=**&pageSize=**
--返回报文
"status":200,
	"result":{
	  "records":[{
	  	"invitationTime":"2020-08-08 19:31:23",
	  	"phone":** ，被邀请手机号码
	  	"name":, 被邀请用户名称
	  	“status":**, 被邀请状态 0: 未注册  100: 已注册 600： 已开通
	  	},...],
	   "total":26,                --总记录数
	   "size":10,                 --每页数量
	   "current":1,               --当前页码
	   "pages":3                  --总页数
	 },
```



#### 我的金豆

```
url: /pay/income/list
method: get
params: pageNo=**&pageSize=**&flag=0|1  为兑换
--返回报文
"status":200,
	"result":{
	  "records":[{
	  	"invitationTime":"2020-08-08 19:31:23",
	  	"phone":** ，被邀请手机号码
	  	“income":**, 邀请用户产生的收益
	  	flag: 0:未退还，1已兑换
	  	},...],
	   "total":26,                --总记录数
	   "size":10,                 --每页数量
	   "current":1,               --当前页码
	   "pages":3                  --总页数
	 },
```

