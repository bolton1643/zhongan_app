
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/login/forget","pages/login/register","pages/indexgroup/home","pages/indexgroup/home2","pages/indexgroup/addInstall","pages/indexgroup/warning","pages/indexgroup/warningDetail","pages/indexgroup/dealWarning","pages/my/my","pages/my/myMoney","pages/my/baseInfo","pages/message/messagelist","pages/manage/home","pages/indexgroup/becomepartner","pages/manage/partnerlist","pages/manage/placemanage","pages/manage/placemanageList","pages/manage/placemanageDetail","pages/index/index","pages/indexT/index","pages/basics/layout","pages/basics/background","pages/basics/text","pages/basics/icon","pages/basics/button","pages/basics/design","pages/basics/tag","pages/basics/avatar","pages/basics/progress","pages/basics/shadow","pages/basics/loading","pages/component/bar","pages/component/nav","pages/component/list","pages/component/card","pages/component/form","pages/component/timeline","pages/component/chat","pages/component/swiper","pages/component/modal","pages/component/steps","pages/plugin/indexes","pages/plugin/animation","pages/plugin/drawer","pages/plugin/verticalnav","pages/indexgroup/addInstall","pages/indexgroup/installList","pages/indexgroup/installDetail","pages/indexgroup/repairList","pages/indexgroup/repairDetail","pages/indexgroup/packageList","pages/indexgroup/packageDetail","pages/manage/devices/deviceslist","pages/manage/devices/devicesDetail","pages/manage/log/logList","pages/manage/warning/warningHistoryList","pages/manage/warning/warningHistoryDetail","pages/manage/repair/repairHistoryList","pages/manage/repair/repairHistoryDetail","pages/manage/money/moneyHistoryList","pages/manage/money/moneyHistoryDetail","pages/manage/order/orderDetail","pages/indexgroup/warning/warningVideoDetail","pages/manage/fangqu/fangquDetail","pages/manage/achievement/achievementDetail","pages/my/myMoneyList","pages/my/myMoneyDetail","pages/my/forgetPassword","pages/plugin/home"],"window":{"navigationBarBackgroundColor":"#ffffff","navigationBarTitleText":"demo","navigationStyle":"custom","navigationBarTextStyle":"white"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"轻照守护","compilerVersion":"2.8.11","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{}},{"path":"/pages/login/forget","meta":{},"window":{}},{"path":"/pages/login/register","meta":{},"window":{}},{"path":"/pages/indexgroup/home","meta":{},"window":{}},{"path":"/pages/indexgroup/home2","meta":{},"window":{}},{"path":"/pages/indexgroup/addInstall","meta":{},"window":{}},{"path":"/pages/indexgroup/warning","meta":{},"window":{}},{"path":"/pages/indexgroup/warningDetail","meta":{},"window":{}},{"path":"/pages/indexgroup/dealWarning","meta":{},"window":{}},{"path":"/pages/my/my","meta":{},"window":{}},{"path":"/pages/my/myMoney","meta":{},"window":{}},{"path":"/pages/my/baseInfo","meta":{},"window":{}},{"path":"/pages/message/messagelist","meta":{},"window":{}},{"path":"/pages/manage/home","meta":{},"window":{}},{"path":"/pages/indexgroup/becomepartner","meta":{},"window":{}},{"path":"/pages/manage/partnerlist","meta":{},"window":{}},{"path":"/pages/manage/placemanage","meta":{},"window":{}},{"path":"/pages/manage/placemanageList","meta":{},"window":{}},{"path":"/pages/manage/placemanageDetail","meta":{},"window":{}},{"path":"/pages/index/index","meta":{},"window":{}},{"path":"/pages/indexT/index","meta":{},"window":{}},{"path":"/pages/basics/layout","meta":{},"window":{}},{"path":"/pages/basics/background","meta":{},"window":{}},{"path":"/pages/basics/text","meta":{},"window":{}},{"path":"/pages/basics/icon","meta":{},"window":{}},{"path":"/pages/basics/button","meta":{},"window":{}},{"path":"/pages/basics/design","meta":{},"window":{}},{"path":"/pages/basics/tag","meta":{},"window":{}},{"path":"/pages/basics/avatar","meta":{},"window":{}},{"path":"/pages/basics/progress","meta":{},"window":{}},{"path":"/pages/basics/shadow","meta":{},"window":{}},{"path":"/pages/basics/loading","meta":{},"window":{}},{"path":"/pages/component/bar","meta":{},"window":{}},{"path":"/pages/component/nav","meta":{},"window":{}},{"path":"/pages/component/list","meta":{},"window":{}},{"path":"/pages/component/card","meta":{},"window":{}},{"path":"/pages/component/form","meta":{},"window":{}},{"path":"/pages/component/timeline","meta":{},"window":{}},{"path":"/pages/component/chat","meta":{},"window":{}},{"path":"/pages/component/swiper","meta":{},"window":{}},{"path":"/pages/component/modal","meta":{},"window":{}},{"path":"/pages/component/steps","meta":{},"window":{}},{"path":"/pages/plugin/indexes","meta":{},"window":{}},{"path":"/pages/plugin/animation","meta":{},"window":{}},{"path":"/pages/plugin/drawer","meta":{},"window":{}},{"path":"/pages/plugin/verticalnav","meta":{},"window":{}},{"path":"/pages/indexgroup/installList","meta":{},"window":{}},{"path":"/pages/indexgroup/installDetail","meta":{},"window":{}},{"path":"/pages/indexgroup/repairList","meta":{},"window":{}},{"path":"/pages/indexgroup/repairDetail","meta":{},"window":{}},{"path":"/pages/indexgroup/packageList","meta":{},"window":{}},{"path":"/pages/indexgroup/packageDetail","meta":{},"window":{}},{"path":"/pages/manage/devices/deviceslist","meta":{},"window":{}},{"path":"/pages/manage/devices/devicesDetail","meta":{},"window":{}},{"path":"/pages/manage/log/logList","meta":{},"window":{}},{"path":"/pages/manage/warning/warningHistoryList","meta":{},"window":{}},{"path":"/pages/manage/warning/warningHistoryDetail","meta":{},"window":{}},{"path":"/pages/manage/repair/repairHistoryList","meta":{},"window":{}},{"path":"/pages/manage/repair/repairHistoryDetail","meta":{},"window":{}},{"path":"/pages/manage/money/moneyHistoryList","meta":{},"window":{}},{"path":"/pages/manage/money/moneyHistoryDetail","meta":{},"window":{}},{"path":"/pages/manage/order/orderDetail","meta":{},"window":{}},{"path":"/pages/indexgroup/warning/warningVideoDetail","meta":{},"window":{}},{"path":"/pages/manage/fangqu/fangquDetail","meta":{},"window":{}},{"path":"/pages/manage/achievement/achievementDetail","meta":{},"window":{}},{"path":"/pages/my/myMoneyList","meta":{},"window":{}},{"path":"/pages/my/myMoneyDetail","meta":{},"window":{}},{"path":"/pages/my/forgetPassword","meta":{},"window":{}},{"path":"/pages/plugin/home","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});