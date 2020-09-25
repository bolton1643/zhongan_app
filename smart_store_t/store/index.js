//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({//全局变量定义
    state: {
        forcedLogin: true,//是否需要强制登录
        hasLogin: false,
        name: "",
        phone:'',
        token:'',
        provinceCityCounty:'',
		uerInfo: {},
		socketTask: null,
		eventlist: []
    },
    mutations: {
        login(state, user) {
            state.name = user.name || '';
            state.hasLogin = true;
			state.phone = user.phone || '';
            state.provinceCityCounty = user.provinceCityCounty || '';
            state.token = user.token || '';
			state.uerInfo = user || {};
			uni.setStorage({//将用户信息保存在本地  
				key: 'uerInfo',  
				data: user  
			})  
			uni.setStorage({//将用户信息保存在本地
				key: 'thorui_token',  
				data: user.token  
			})
			uni.setStorage({//将用户信息保存在本地
				key: 'isBecomePartner',  
				data: user.status  
			})
        },
		addleaderId(state, data) {
		    state.leaderId = data.id || '';
			state.leaderName = data.name || '';
		},
		addsiteIds(state, data) {
		    state.siteIds = data || '';
		},
        logout(state) {
           // state.userName = "";
           // state.hasLogin = false;
           // state.userId = '';
           // state.token = '';
           // state.pointId = '';
		   uni.clearStorageSync()
		   this.commit(closeSocket)
        },
		WEBSOCKET_INIT(state, url) {
			// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
			state.socketTask = uni.connectSocket({
				url: url,
				success(data) {
					console.log("websocket连接成功");
				},
			});
		
			// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
			state.socketTask.onOpen((res) => {
				console.log("WebSocket连接正常打开中...！");
				state.is_open_socket = true;
				// 注：只有连接正常打开中 ，才能正常收到消息
				state.socketTask.onMessage((res) => {
					let alarm = JSON.parse(res.data)
					if(alarm.msgType == 100) {
						uni.showModal({
						    title: '提示',
						    content: '收到告警通知是否打开查看详情',
						    success: function (data) {
						        if (data.confirm) {
						          uni.navigateTo({
						          	url:  '../indexgroup/warningDetail?item=' + JSON.stringify(alarm.data[0])
						          })
						        } else if (data.cancel) {
						           
						        }
						    }
						});
					}
					
				});
			})
		},
		WEBSOCKET_SEND(state, p) {
			console.log("ws发送！");
			state.socketTask.send({
				data: p,
				async success() {
					console.log("消息发送成功");
				},
			});
		},
		closeSocket(state) {
			state.socketTask.close({
				success(res) {
					console.log("关闭成功", res)
				},
				fail(err) {
					console.log("关闭失败", err)
				}
			})
		},

    },
	actions: {
		WEBSOCKET_INIT({
			commit
		}, url) {
			commit('WEBSOCKET_INIT', url)
		},
		WEBSOCKET_SEND({
			commit
		}, p) {
			commit('WEBSOCKET_SEND', p)
		}
	}
})
export default store