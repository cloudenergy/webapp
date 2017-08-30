"use strict";angular.module("app",["ionic","ngCookies","ngResource","oc.lazyLoad"]).config(["$locationProvider","$ionicConfigProvider",function(o,n){n.tabs.position("bottom"),window.isPRODUCTION?o.html5Mode(!0):o.hashPrefix("")}]).run(["$location","$ionicPlatform","$ionicHistory","$ionicPopup",function(o,n,i,t){n.ready(function(){window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),window.cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&window.StatusBar.styleBlackTranslucent()}),n.registerBackButtonAction(function(n){n.preventDefault();var e=function(){t.confirm({title:"<strong>退出应用?</strong>",template:"你确定要退出应用吗?",okText:"退出",cancelText:"取消"}).then(function(o){o&&window.ionic.Platform.exitApp()})};return/m\/(index|welcome|error|login|bind)/.test(o.path())?e():i.backView()?i.goBack():e(),!1},101)}]),window.isPRODUCTION?angular.element(document).ready(function(){angular.bootstrap(document,["app"])}):document.addEventListener("deviceready",function(){angular.bootstrap(document,["app"])},!1);
"use strict";angular.module("app").constant("APICONFIG",{auth:["auth",,{login:{},logout:{}}],account:["account",,{passwd:{},unbind:{url:"wxaccount/unbind"},wxbind:{url:"wxaccount/bind"}}],apptemplate:["apptemplate",,{info:{}}],business:["business",,{userinfo:{},recentchargelog:{},fundflow:{},monitor:{},timequantumstatistic:{}}],device:["device",,{type:{}}],payment:["payment",,{channelinfo:{},charge:{}}],control:["control",,{send:{}}],department:["department",,{update:{}}],interaction:["interaction",,{uploadtoken:{}}],message:["message",,{list:{},readed:{},delete:{}}],workorder:["workorder",,{add:{},info:{}}],qiniu:["qiniu",,{upload:{url:window.APIORIGIN+"/putb64/-1/key/:base64",transformRequest:function(e){return e.file},headers:{"Content-Type":"application/octet-stream",Authorization:function(e){if(e.params&&e.params.token){var n="UpToken "+e.params.token;return delete e.params.token,n}}}}}]}).service("$api",["$rootScope","$resource","APICONFIG",function(e,n,t){var i=function(e,n){return/(^http:\/\/)|(^https:\/\/)/.test(e)&&e||[window.APIORIGIN+"/api/"+e,n&&"/:_api_action"||""].join("")},r=[];e.$on("$stateChangeStart",function(){angular.forEach(r,function(e){!e.$resolved&&e.$cancelRequest()}),r=[]}),angular.forEach(t,function(e,t){angular.isArray(e)&&e[0]&&(e[0]=i(e[0],!!e[2]),e[3]=angular.extend({cancellable:!0},e[3]),angular.forEach(e[2],function(n,t){n.url=n.url&&i(n.url)||void 0,n.method=n.method||"POST",n.params=n.params||{},n.params._api_action=n.url?void 0:t,window.isPRODUCTION||(n.headers=n.headers||{},n.headers["X-Cors-By"]="cloudenergy.me"),/api\.cloudenergy\.me/.test(n.url||e[0])&&(n.withCredentials=!0)}),angular.forEach(this[t]=n.apply(n,e),function(e,n){this[n]=function(){var n,t;return angular.forEach([arguments[0],arguments[1]],function(e){angular.isObject(e)&&angular.isDefined(e._cancellable)&&(t=e._cancellable,delete e._cancellable)}),n=e.apply(this,arguments),!1===t&&delete n.$cancelRequest,n.$cancelRequest&&r.push(n),n}},this[t]))},this)}]).service("$loading",["$rootScope","$timeout",function(e,n){var t=this;angular.extend(t,{activities:0,inprogress:0,show:function(i){angular.isObject(i.params)&&(i._inprogress=i.params._inprogress,delete i.params._inprogress),angular.isObject(i.data)&&angular.isUndefined(i._inprogress)&&(i._inprogress=i.data._inprogress,delete i.data._inprogress),window.NetworkActivityIndicator&&(i._activities=n(function(){t.activities++,i._activities=t.activities,1===t.activities&&window.NetworkActivityIndicator.show()},60)),e.User.data&&(window.isPRODUCTION||window.isAndroid)&&!1!==i._inprogress&&(i._inprogress=n(function(){t.inprogress++,i._inprogress=t.inprogress,1===t.inprogress&&e.$broadcast("loading:show")},600))},hide:function(i){window.NetworkActivityIndicator&&(angular.isNumber(i._activities)?n(function(){0===--t.activities&&window.NetworkActivityIndicator.hide()},600):angular.isObject(i._activities)&&n.cancel(i._activities),delete i._activities),(window.isPRODUCTION||window.isAndroid)&&!1!==i._inprogress&&(angular.isNumber(i._inprogress)?n(function(){0===--t.inprogress&&e.$broadcast("loading:hide")},600):angular.isObject(i._inprogress)&&n.cancel(i._inprogress)),delete i._inprogress}})}]).config(["$qProvider","$httpProvider",function(e,n){e.errorOnUnhandledRejections(!1),n.interceptors.push(["$q","$location","$loading","$storage",function(e,n,t,i){return{request:function(e){return t.show(e),window.isPRODUCTION||!/\/api\//.test(e.url)||/\/api\/auth\/(login|logout)/.test(e.url)||(e.transformRequest=e.transformRequest.concat([function(e){return JSON.stringify(i.encrypt(JSON.parse(e||"{}")))}])),e},requestError:function(n){return e.reject(n)},response:function(i){return i.config&&t.hide(i.config),angular.isObject(i.data)&&(i.data.code||i.data.result&&angular.isObject(i.data.result)&&!Object.keys(i.data.result).length)?(/90000005|90000007/.test(i.data.code)&&n.url(window.isWECHAT?"/m/bind":"/m/login").replace(),e.reject(i.data)):i},responseError:function(n){return n.config&&t.hide(n.config),e.reject(n.data||{code:n.status})}}}])}]).run(["$rootScope","$ionicLoading",function(e,n){e.$on("loading:show",function(){n.show({template:'<ion-spinner icon="ripple" class="spinner-stable"></ion-spinner>',noBackdrop:!0})}),e.$on("loading:hide",function(){n.hide()})}]);
"use strict";angular.module("app").config(["$urlRouterProvider","$stateProvider",function(e,r){var o=window.isPRODUCTION?"/":"";e.otherwise(o),r.state("otherwise",{url:o,resolve:{rewrite:["$state",function(e){e.go("app.index",{},{location:"replace"})}]}}).state("app",{abstract:!0,url:"/m",templateUrl:"app/tabs.html?rev=57f9110750"}).state("app.welcome",{url:"/welcome",views:{"@":{templateUrl:"app/modules/welcome/welcome.html?rev=4034331f77",controller:"app.welcome",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load(["app/modules/welcome/welcome.min.css?rev=1001d05198","app/modules/welcome/welcome.min.js?rev=c28910cae2"])}]}}).state("app.error",{url:"/error?{message}",views:{"@":{templateUrl:"app/modules/error/error.html?rev=9a31e4f0f8",controller:"app.error",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load("app/modules/error/error.min.js?rev=05d22f00d2")}]}}).state("app.login",{url:"/login",views:{"@":{templateUrl:"app/modules/login/login.html?rev=e866cdbbca",controller:"app.login",controllerAs:"$ctrl"}},resolve:{login:["$ocLazyLoad",function(e){return e.load(["app/modules/login/login.min.css?rev=c7f15cf111","app/modules/login/login.min.js?rev=74e3ef6d5b"])}]}}).state("app.bind",{url:"/bind?{openid}&{platformid}&{target}",views:{"@":{templateUrl:"app/modules/bind/bind.html?rev=e9ea47046c",controller:"app.bind",controllerAs:"$ctrl"}},resolve:{deps:["$state","$ocLazyLoad","$storage",function(e,r,o){return o.get("token")&&e.go("app.index",{},{location:"replace"}),r.load(["app/modules/bind/bind.min.css?rev=9cb0519c32","app/modules/bind/bind.min.js?rev=b9cb73b599"])}]}}).state("app.index",{url:"/index",views:{"view-index":{templateUrl:"app/modules/index/index.html?rev=74c7c9eb6a",controller:"app.index",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load(["app/modules/index/index.min.css?rev=75194c0813","app/modules/index/index.min.js?rev=55209e0707"])}]}}).state("app.device",{url:"/device",views:{"view-device":{templateUrl:"app/modules/device/device.html?rev=8b6347f10c",controller:"app.device",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load(["app/modules/device/device.min.css?rev=03cebc84fb","app/modules/device/device.min.js?rev=0d721e975d"])}]}}).state("app.device_sensor",{url:"/device/sensor/:type/:id/:title",views:{"view-device":{templateUrl:"app/modules/device/sensor.html?rev=b3e07b1b51",controller:"app.device_sensor",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load(["app/modules/device/sensor.min.css?rev=0ca88c2003","app/modules/device/sensor.min.js?rev=cfa0bf2083"])}]}}).state("app.device_month",{url:"/device/month/:month/:id",views:{"view-device":{templateUrl:"app/modules/device/month.html?rev=867d7c8046",controller:"app.device_month",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load(["app/components/highcharts.min.js?rev=07c92aa56f","app/modules/device/month.min.js?rev=fb7239ed0c"])}]}}).state("app.fee",{url:"/fee",views:{"view-index":{templateUrl:"app/modules/fee/fee.html?rev=c131a255fb",controller:"app.fee",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load("app/modules/fee/fee.min.js?rev=c1f394dd2d")}]}}).state("app.recharge",{url:"/recharge",views:{"view-recharge":{templateUrl:"app/modules/recharge/recharge.html?rev=69cd50cbdc",controller:"app.recharge",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load(["app/modules/recharge/recharge.min.css?rev=0261c21de4","app/modules/recharge/recharge.min.js?rev=be31979281"])}]}}).state("app.recharge_channel",{url:"/recharge/channel",params:{amount:{value:null}},views:{"view-recharge":{templateUrl:"app/modules/recharge/channel.html?rev=671ec98d74",controller:"app.recharge_channel",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){var r=["app/modules/recharge/channel.min.js?rev=e76f0572ea"];return window.isWECHAT&&r.push("static/pingpp-js-2.1.9/pingpp.js"),e.load(r).then(function(){window.isWECHAT&&window.pingpp.setAPURL("static/pingpp-js-2.1.9/alipay_in_weixin/pay.htm")})}]}}).state("app.recharge_log",{url:"/recharge/log",views:{"view-recharge":{templateUrl:"app/modules/recharge/log.html?rev=94db029985",controller:"app.recharge_log",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load("app/modules/recharge/log.min.js?rev=cc85ee1abc")}]}}).state("app.account",{url:"/account",views:{"view-account":{templateUrl:"app/modules/account/account.html?rev=1cb2fadb54",controller:"app.account",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load(["app/modules/account/account.min.css?rev=92fa4ca21c","app/modules/account/account.min.js?rev=d39652901d"])}]}}).state("app.repair",{url:"/repair",views:{"view-index":{templateUrl:"app/modules/repair/repair.html?rev=228857f251",controller:"app.repair",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load(["libs/angular-utf8-base64-0.0.5/angular-utf8-base64.min.js","libs/ng-file-upload-12.2.13/ng-file-upload.min.js","app/modules/repair/repair.min.js?rev=fb6c4e3c64"])}]}}).state("app.notification",{url:"/notification",views:{"view-index":{templateUrl:"app/modules/notification/notification.html?rev=bd5b1dba37",controller:"app.notification",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load(["app/modules/notification/notification.min.css?rev=b713b48e9a","app/modules/notification/notification.min.js?rev=4ef61f5bea"])}]}}).state("app.iframe",{url:"/iframe",params:{title:{value:null},target:{value:null}},views:{"view-index":{templateUrl:"app/modules/iframe/iframe.html?rev=f9ee42b918",controller:"app.iframe",controllerAs:"$ctrl"}},resolve:{deps:["$ocLazyLoad",function(e){return e.load("app/modules/iframe/iframe.min.js?rev=f58a7ba983")}]}})}]).run(["$rootScope","$state","$ionicLoading","User","ERRORCODE",function(e,r,o,a,l){e.$on("$stateChangeStart",function(e,t,n,c){angular.isUndefined(a.data)&&/^app\.(bind|login)$/.test(c.name)?e.preventDefault():/^otherwise$/.test(t.name)||(/^app\.welcome$/.test(t.name)||window.isPRODUCTION||localStorage.initialization||(e.preventDefault(),r.go("app.welcome",{},{location:"replace"})),!/^app\.(welcome|error|login|bind)$/.test(t.name)&&angular.isUndefined(a.data)&&(e.preventDefault(),a.$userinfo().then(function(){r.go(t.name,n,{location:"replace"})},function(e){/^90000009$/.test(e.code)&&(o.show({template:'<i class="ion-alert-circled"></i> '+l[e.code],duration:2e3}),a.$logout().then(function(){r.go("app.login",{},{location:"replace"})}))})))})}]);
"use strict";angular.module("app").constant("CATEGORY",{RECHARGING:{name:"充值",icon:"icon-app icon-recharge"},WITHDRAW:{name:"提现",icon:"icon-app icon-withdraw"},PAYFEES:{name:"缴费",icon:"icon-app icon-payment"},PAYPROPERTY:{name:"物业费",icon:"icon-app icon-property"},PAYPARKING:{name:"停车费",icon:"icon-app icon-parking"},HANDLINGCHARGE:{name:"手续费",icon:"icon-app icon-fee"},PAYELECTRICITY:{name:"电费",icon:"icon-app icon-electricity"},PAYCOLDWATER:{name:"冷水费",icon:"icon-app icon-cold-water"},PAYHOTWATER:{name:"热水费",icon:"icon-app icon-hot-water"},PAYACENERGY:{name:"空调费能量表",icon:"icon-app icon-energy"},PAYACPANEL:{name:"空调费面板",icon:"icon-app icon-air-conditioning"},HANDLINGCHARGERCG:{name:"充值服务费",icon:"icon-app icon-service-recharge"},HANDLINGCHARGEWTD:{name:"提现服务费",icon:"icon-app icon-service-withdraw"}}).constant("DEVICETYPE",{HEATENERGYMETER:{name:"热能表",channel:["07","08"],icon:"icon-app icon-energy positive"},DDWATERMETER:{name:"直饮水",channel:["02"],icon:"icon-app icon-cold-water calm"},TTYPETEMPCONTROL:{name:"T型温控器",channel:["33"],icon:"icon-app icon-temperature assertive"},ELECTRICITYMETER:{name:"电表",channel:["11"],icon:"icon-app icon-electricity energized"},HOTWATERMETER:{name:"热水表",channel:["03"],icon:"icon-app icon-hot-water assertive"},COLDWATERMETER:{name:"冷水表",channel:["01"],icon:"icon-app icon-cold-water calm"},ENERGYMETER:{name:"能量表",channel:["07","08"],icon:"icon-app icon-energy positive"},TEMPERATURECONTROL:{name:"温控器",channel:["33"],icon:"icon-app icon-temperature assertive"},TIMERMETER:{name:"时间采集器",channel:["07","08"],icon:"icon-app icon-time balanced"},PRESSUREMETER:{name:"压力表",channel:[],icon:""},ULTRACOLDWATERMETER:{name:"超声波水表",channel:["04"],icon:""}});
"use strict";angular.module("app").constant("ERRORCODE",{20000001:"用户不存在",20000003:"参数不全",90000001:"服务器错误",90000002:"拒绝访问",90000003:"登录失败",90000004:"权限不足",90000005:"未登录",90000006:"身份验证失败",90000007:"签名校验失败",90000009:"请使用商户帐号",pingpp_fail:"支付失败",pingpp_cancel:"取消支付"});
"use strict";angular.module("app").filter("deviceMeter",["DEVICETYPE",function(n){return function(r,e){return n[r]&&n[r][e]||""}}]).filter("deviceChannelScale",["DEVICETYPE",function(n){return function(r,e,u){var t=[];return n[e]&&angular.forEach(n[e][u]||[],function(n){r[n]&&t.push(r[n])}),t}}]).filter("deviceSensorPercent",function(){return function(n,r){var e=0,u=0;return angular.forEach(n,function(n){e+=n.sum,u+=n[r]}),e?100*u/e:0}}).filter("deviceSensorSum",function(){return function(n,r){var e=0;return angular.forEach(n,function(n){e+=r?Number(n[r]):n}),e}});
"use strict";angular.module("app").run(["$ionicPlatform","$ionicPopup","$state","$storage",function(e,t,o,n){e.on("resume",function(){window.chcp?chcp.fetchUpdate(function(e){e?!n.expired()&&o.reload():(navigator.splashscreen.show(),chcp.installUpdate())}):!n.expired()&&o.reload()}),["chcp_nothingToUpdate","chcp_updateInstalled","chcp_updateInstallFailed","chcp_updateLoadFailed"].forEach(function(e){document.addEventListener(e,function(){setTimeout(function(){navigator.splashscreen.hide()},1666.66)},!1)}),document.addEventListener("chcp_updateLoadFailed",function(e){var o=e.detail.error;o&&o.code==chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW&&(t.show({cssClass:"text-center",title:"升级提醒",template:"有新的版本，请下载更新",buttons:[{text:"立即升级",type:"button-positive",onTap:function(e){e.preventDefault(),window.isIOS?window.open("itms-apps://itunes.apple.com/cn/app/id1237120322?timestamp="+(new Date).valueOf()):window.isAndroid&&cordova.InAppBrowser.open("http://zft.gugecc.com/zft-app.html","_system")}}]}),["mousedown","mousemove","mouseup","MSPointerDown","MSPointerMove","MSPointerUp","pointerdown","pointermove","pointerup","touchstart","touchmove","touchend"].forEach(function(e){document.querySelector("body>ion-nav-view").addEventListener(e,function(e){return e.preventDefault(),e.stopPropagation(),!1},!0)}))},!1)}]);
"use strict";angular.module("app").factory("$exceptionHandler",["$fundebug",function(t){return t.init(),t.notifyError}]).service("$fundebug",function(){var t=[];window.isWECHAT&&t.push("wechat"),!window.isPRODUCTION&&t.push(window.ionic.Platform.platform()),t.push(/preapi/.test(window.APIORIGIN)?"release":"production"),this.init=function(){var e=document.createElement("script");e.src="https://og6593g2z.qnssl.com/fundebug.0.2.0.min.js",e.setAttribute("apikey","5db959877819cb008bd51307bdf8c919c406d5ed5e81457db84503a3dd48251a"),e.setAttribute("releasestage",t.join("-")),window.AppVersion&&e.setAttribute("appversion",AppVersion.version),e.onload=e.onreadystatechange=function(){e.readyState&&!/^c|loade/.test(e.readyState)||(e.onload=e.onreadystatechange=null,fundebug.filters=[{req:{method:/^GET$/,url:/^(app\/|data:text\/html|file:\/\/\/|https:\/\/(pre)?app\.)/},res:{status:/^0$/}},{req:{method:/^POST$/,url:/^https:\/\/(pre)?api\./},res:{status:/^0$/}}])},document.body.appendChild(e)},this.metaData=function(t){fundebug.metaData=angular.extend(fundebug.metaData||{},t)},this.notifyError=function(t){fundebug.notifyError(t)}});
"use strict";angular.module("app").run(["$ionicPlatform","$jpush","$message",function(n,i,e){var o,t,a=!0,c=function(){o=t?void 0:setTimeout(function(){o=void 0,e.check()},1666.66)},u=function(){t=o?void 0:setTimeout(function(){t=void 0,e.check()},1666.66)};window.isPRODUCTION?c():(n.on("resume",function(){c(),i.clearAndroid(),i.clearIOS(),a=!0}),n.on("pause",function(){a=!1}),document.addEventListener("jpush.openNotification",function(){u(),i.clearAndroid(),i.clearIOS()},!1),document.addEventListener("jpush.receiveNotification",function(){u(),a&&(i.clearAndroid(),i.clearIOS())},!1))}]).service("$jpush",["$storage",function(n){if(!window.isPRODUCTION){var i,e=this;angular.extend(e,{clearAndroid:function(){setTimeout(function(){i.clearAllNotification()},1666.66)},clearIOS:function(){setTimeout(function(){i.resetBadge(),i.setApplicationIconBadgeNumber(0)},1666.66)},setAlias:function(n,e,o){i.setAlias(angular.isNumber(n)?n.toString():n,e||angular.noop,o||angular.noop)}}),(i=window.plugins&&window.plugins.jPushPlugin).init(),e.clearAndroid(),e.clearIOS(),!n.expired()&&i.getRegistrationID(function n(o){o?localStorage.JPUSH_ALIAS&&e.setAlias(localStorage.JPUSH_ALIAS):setTimeout(function(){i.getRegistrationID(n)},5e3)})}}]);
"use strict";angular.module("app").service("$message",["$rootScope","$q","$ionicPopup","$state","$api",function(e,t,a,r,o){var i,n,l=this;angular.extend(l,{list:function(a){return e.User.data?(i="UNREADMESSAGE_"+e.User.data.uid+"_"+e.User.data.project,o.message.list(angular.extend(a||{},{uid:e.User.data.uid,projectid:e.User.data.project})).$promise):t.reject()},readed:function(e){return o.message.readed(e,function(){l.clearStorage(e)}).$promise},delete:function(e){return o.message.delete(e,function(){l.clearStorage(e)}).$promise},clearStorage:function(t){t.id&&(localStorage[i]=(localStorage[i]||"").replace(","+t.id+",",",").replace(","+t.id,"").replace(t.id+",","").replace(t.id,""),localStorage[i]||(t.all=!0)),t.all&&(delete e.UNREADMESSAGE,delete localStorage[i])},check:function(){l.list({unread:1,pagesize:60}).then(function(t){e.UNREADMESSAGE=t&&t.result&&t.result.detail||[];var o=localStorage[i]||"",l=o?o.split(","):[],c=[];angular.forEach(e.UNREADMESSAGE,function(e){!~l.indexOf(e.id)&&c.push(e.id)}),(l=l.concat(c)).length?localStorage[i]=l.join():delete localStorage[i],!n&&c.length&&(n=a.confirm({title:"通知提醒",template:"收到最新通知，是否立即查看？",cancelText:"稍后",okText:"查看"}).then(function(t){n=void 0,t&&("app.notification"===r.current.name?e.$broadcast("app.notification:refresh"):r.go("app.notification"))}))})}})}]);
"use strict";angular.module("app").service("$storage",["$cookies",function(e){var t=this,n="__emapp_",o=window.isPRODUCTION?".cloudenergy.me":location.hostname,i={uid:"",token:""},r=e.getAll(),a=new window.Hashes.SHA1,s=function(e,t){var n=[],o=[];return angular.forEach(e,function(e,t){n.push(t)}),n.sort(),angular.forEach(n,function(t){o.push(t+"="+encodeURIComponent(angular.isObject(e[t])?JSON.stringify(e[t]):e[t]))}),t+o.toString().replace(/,/g,"")+t};angular.extend(t,{get:function(o){return o=t.expired()?void 0:e.get(o)||sessionStorage[n+o]||localStorage[n+o],"undefined"===o?void 0:o},set:function(r,a,s){r&&Object.keys(r).length?(!s&&Object.keys(i).map(function(t){e.put(t,r[t],{path:"/",domain:o,expires:a&&moment().add(10,"Y")._d||void 0})}),a?(t.expired(moment().add(10,"Y").unix()),Object.keys(i).map(function(e){localStorage[n+e]=r[e]})):(sessionStorage[n+"expires"]="Session",Object.keys(i).map(function(e){sessionStorage[n+e]=r[e]}))):(delete localStorage[n+"expires"],delete sessionStorage[n+"expires"],Object.keys(i).map(function(t){delete localStorage[n+t],delete sessionStorage[n+t],e.remove(t,{path:"/",domain:o})}))},expired:function(t){if(!t||!moment(t,"X"))return!e.get("token")&&(!sessionStorage[n+"expires"]&&(!(t=localStorage[n+"expires"])||moment(t,"X").isBefore(moment())));localStorage[n+"expires"]=t},valid:function(){var e=!0;return Object.keys(i).map(function(n){t.get(n)||(e=!1)}),e},encrypt:function(e){if(t.valid()){var n=moment().unix();e.v=n,e.t=t.get("token"),e.sign=a.hex(s(e,a.hex(n.toString()))),e.p=t.get("uid"),delete e.t}return e}}),Object.keys(r).length&&t.set(r,!1,!0)}]);
"use strict";angular.module("app").service("User",["$rootScope","$q","$api","$fundebug","$jpush","$message","$storage",function(e,t,r,s,n,u,o){angular.extend(e.User=this,{data:void 0,$userinfo:function(n){var u=t.defer();return r.business.userinfo(n||{},function(t){/^USER$/.test(t.result.character._id)?(e.User.data=angular.extend({},t.result),delete t.result.character.rule,s.metaData({userinfo:t.result}),u.resolve(t)):(o.set(null),u.reject({code:90000009}))},function(e){o.set(null),u.reject(e)}),u.promise},$login:function(s){var l=t.defer();return r.auth.login(s||{},function(t){o.set(t.result,!0),e.User.$userinfo().then(function(e){!window.isPRODUCTION&&n.setAlias(localStorage.JPUSH_ALIAS=e.result.userid),u.check(),l.resolve(e)},function(e){o.set(null),l.reject(e)})},l.reject),l.promise},$logout:function(t){return r.auth.logout(t||{},function(){delete e.User.data,delete localStorage.JPUSH_ALIAS,o.set(null),!window.isPRODUCTION&&n.setAlias("")}).$promise}})}]);