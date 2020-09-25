/**
 * 常用方法封装 请求，文件上传等
 * @author echo. 
 **/

const tui = {
	//接口地址
	interfaceUrl: function() {
		// return 'https://www.thorui.cn'
		return 'http://47.111.166.221:8080'
		//return 'https://uat.thorui.cn'
		// return 'https://prod.thorui.cn'
	},
	toast: function(text, duration, success) {
		uni.showToast({
			title: text || "出错啦~",
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
	},
	modal: function(title, content, showCancel, callback, confirmColor, confirmText) {
		uni.showModal({
			title: '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			confirmColor: confirmColor || "#5677fc",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	isAndroid: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android"
	},
	isPhoneX: function() {
		const res = uni.getSystemInfoSync();
		let iphonex = false;
		let models=['iphonex','iphonexr','iphonexsmax','iphone11','iphone11pro','iphone11promax']
		const model=res.model.replace(/\s/g,"").toLowerCase()
		if (models.includes(model)) {
			iphonex = true;
		}
		return iphonex;
	},
	constNum: function() {
		let time = 0;
		// #ifdef APP-PLUS
		time = this.isAndroid() ? 300 : 0;
		// #endif
		return time
	},
	delayed: null,
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} postData 请求参数
	 * @param bool isDelay 是否延迟显示loading
	 * @param bool isForm 数据格式
	 *  true: 'application/x-www-form-urlencoded'
	 *  false:'application/json'
	 * @param bool hideLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: function(url, method, postData, isDelay, hideLoading) {
		//接口请求
		let loadding = false;
		tui.delayed && uni.hideLoading();
		clearTimeout(tui.delayed);
		tui.delayed = null;
		if (!hideLoading) {
			tui.delayed = setTimeout(() => {
				uni.showLoading({
					mask: true,
					title: '请稍候...',
					success(res) {
						loadding = true
					}
				})
			}, isDelay ? 1000 : 0)
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: tui.interfaceUrl() + url,
				data: postData,
				header: {
					// 'content-type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
					'content-type': 'application/json',
					'X-Access-Token': tui.getToken() || ''
				},
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
					clearTimeout(tui.delayed)
					tui.delayed = null;
					if (loadding && !hideLoading) {
						uni.hideLoading()
					}
					// if (res.data && res.data.code == 1) {
					// 	uni.clearStorageSync()
					// 	tui.modal("登录信息已失效，请重新登录", false, () => {
					// 		//store.commit("logout") 登录页面执行
					// 		uni.redirectTo({
					// 			url: '/pages/common/login/login'
					// 		})
					// 	})
					// 	return
					// }
					resolve(res.data)
				},
				fail: (res) => {
					clearTimeout(tui.delayed)
					tui.delayed = null;
					if (loadding && !hideLoading) {
						uni.hideLoading()
					}
					tui.toast("请稍后再试")
					reject(res)
				}
			})
		})
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
	uploadFile: function(url, src) {
		uni.showLoading({
			title: '请稍候...'
		})
		return new Promise((resolve, reject) => {
			const uploadTask = uni.uploadFile({
				url: tui.interfaceUrl() + url,
				filePath: src,
				name: 'file',
				header: {
					// 'Content-Type':'multipart/form-data',
					'X-Access-Token': tui.getToken() || ''
				},
				formData: {
					// sizeArrayText:""
				},
				success: function(res) {
					uni.hideLoading()
					// console.log(res)
					resolve(res.data)
					// let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					// if (d.code % 100 == 0) {
					// 	//返回图片地址
					// 	let fileObj = d.data;
					// 	resolve(fileObj)
					// } else {
					// 	that.toast(res.msg);
					// }
				},
				fail: function(res) {
					console.log(res)
					uni.hideLoading()
					reject(res)
					// this.toast(res.msg);
				}
			})
		})
	},
	tuiJsonp: function(url, callback, callbackname) {
		// #ifdef H5
		window[callbackname] = callback;
		let tuiScript = document.createElement("script");
		tuiScript.src = url;
		tuiScript.type = "text/javascript";
		document.head.appendChild(tuiScript);
		document.head.removeChild(tuiScript);
		// #endif
	},
	//设置用户信息
	setUserInfo: function(mobile, token) {
		//uni.setStorageSync("thorui_token", token)
		uni.setStorageSync("thorui_mobile", mobile)
	},
	//获取token
	getToken() {
		return uni.getStorageSync("thorui_token")
	},
	//判断是否登录
	isLogin: function() {
		return uni.getStorageSync("thorui_mobile") ? true : false
	},
	//跳转页面，校验登录状态
	href(url, isVerify) {
		if (isVerify && !tui.isLogin()) {
			uni.navigateTo({
				url: '/pages/common/login/login'
			})
		} else {
			uni.navigateTo({
				url: url
			});
		}
	}
}

export default tui