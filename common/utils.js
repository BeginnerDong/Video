import assetsConfig from "@/config/assets.config.js";
import token from '@/common/token.js';
import api from '@/apis/index.js';
export default {
	
	uploadFile(filePath, name, formData, callback) {
		var that = this;
		uni.showLoading({
			mask: true,
			title: '上传中',
		});
		const c_callback = (res) => {
			that.uploadFile(filePath, name, formData, callback);
		};
		console.log('uploadFile', formData)
		if (formData.tokenFuncName) {
			if (formData.refreshTokn) {
				token[formData.tokenFuncName](c_callback, {
					refreshToken: true
				});
			} else {
				formData.token = token[formData.tokenFuncName](c_callback);
			};
			if (!formData.token) {
				return;
			};
		};
		uni.uploadFile({
			url: 'http://106.12.155.217/video/public/index.php/api/v1/Base/FtpFile/upload',
			filePath: filePath,
			name: name,
			formData: formData,
			success: function(res) {
				if (res.data) {
					res.data = JSON.parse(res.data);
				};
				if (res.data.solely_code == '200000') {
					token[formData.tokenFuncName](c_callback, {
						refreshToken: true
					});
				} else {
					callback && callback(res.data);
				};
			},
			fail: function(err) {
				uni.showToast({
					title: '网络故障',
					icon: 'fail',
					duration: 2000,
					mask: true,
				});
			}
		})
	},
	

	realPay(param, callback) {
	
		function onBridgeReady(param) {
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest', {
					"appId": "wx7db54ed176405e24", //公众号名称，由商户传入     
					'timeStamp': param.timeStamp,
					'nonceStr': param.nonceStr,
					'package': param.package,
					'signType': param.signType,
					'paySign': param.paySign,
				},
				function(res) {
	
					if (res.err_msg == "get_brand_wcpay_request:ok") {
						// 使用以上方式判断前端返回,微信团队郑重提示：
						//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						callback && callback(1);
					} else {
/* 						alert(JSON.stringify(res));
						alert(res.err_msg); */
						callback && callback(0);
					}
				});
		}
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		} else {
			onBridgeReady(param);
		}
	
	},
	
	getHashParameters() {
		
		
		if(location.search){
			var searchArr = location.search.substr(1).split('&');
		};
		if(location.hash&&location.hash .split('?')[1]){
			var hashArr = location.hash .split('?')[1].split('&');
			var hash = location.hash .split('?')[0]
		};
		var arr = [];
		if(searchArr){
			arr = arr.concat(searchArr)
		};
		if(hashArr){
			arr = arr.concat(hashArr)
		};
		var params = {};
		for (var i = 0; i < arr.length; i++) {
			var data = arr[i].split('=')
			if (data.length === 2) {
			  params[data[0]] = data[1]
			};
		};
		
		if(!hash){
			var hash = location.hash
		};

		return [params,hash]
    },

	showToast(title, type, duration, func) {
		uni.showToast({
			title: title,
			icon: type,
			duration: duration ? duration : 2000,
			mask: true,
			complete: func
		})
	},

	loadAll(array, self) {
		uni.setStorageSync('canClick', false);
		uni.setStorageSync('loadAllArray', array);
		for (var i = 0; i < array.length; i++) {
			self[array[i]]();
		};
	},

	stopMultiClick(func) {
		if (!uni.getStorageSync('canClick')) {
			return;
		};
		uni.setStorageSync('canClick', false);
		func();
	},

	inArray(value, array) {
		
		return array.indexOf(parseInt(value));
	},

	finishFunc(funcName) {
		uni.setStorageSync('canClick', true);
		var loadArray = uni.getStorageSync('loadAllArray');
		console.log('loadArray',loadArray)
		if (loadArray && loadArray.length > 0) {
			var length = loadArray.indexOf(funcName);
			if (length >= 0) {
				loadArray.splice(length, 1);
				console.log('finishFunc')
				uni.setStorageSync('loadAllArray', loadArray);
				if (uni.getStorageSync('loadAllArray').length == 0) {
					uni.hideLoading();
				};
			};
		};
	},


	/* 
	 * 将cityNo 转 cityName
	 * cityData:原数据
	 * cityNo：二级地区编码
	 */
	getCityName(cityData, cityNo) {
		if (!cityNo) return;
		if (!(cityData instanceof Array)) return;
		// 9112
		cityNo += "";
		for (let i = 0; i < cityData.length; i++) {
			let sheng = cityData[i];
			for (let j = 0; j < sheng.children.length; j++) {
				let shi = sheng.children[j];
				if (shi.value == cityNo) {
					// 使用return 终止循环
					return `${sheng.label}-${shi.label}`;
				}
			}
		}
	},

	/* 
	 * obj 转 params字符串参数  
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = "";
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	},

	/* 
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || "/";
		let paramsStr = "";
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += "?");
		url += paramsStr;
		return url;
	},

	/* 
	 * 获取url字符串参数
	 */
	getRequestParameters(locationhref) {
		let href = locationhref || "";
		let theRequest = new Object();
		let str = href.split("?")[1];
		if (str != undefined) {
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},

	/* 
	 * 银行卡每四位空格
	 */
	formatCardNo(cardNo) {
		cardNo += "";
		return cardNo.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
	},

	/**
	 * 乘法，解决js精度损失问题
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	accMul(arg1, arg2) {
		arg1 = arg1 || 0;
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	},

	formatTime() {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hour = date.getHours()
		const minute = date.getMinutes()
		const second = date.getSeconds()

		return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
	},

	formatNumber() {
		n = n.toString()
		return n[1] ? n : '0' + n
	},


	commonInit(self) {
		uni.showLoading();

		self.buttonCanClick = false;
		self.paginate = this.cloneForm(assetsConfig.paginate);
		self.isLoadAll = false;
		self.fonts = assetsConfig.font,
			self.img = assetsConfig.img,
			uni.removeStorageSync('checkLoadAll');
	},

	getDataSet(event, key) {
		return event.currentTarget.dataset[key];
	},

	checkArrayEqual(array1, array2) {

		if (array1.sort().toString() == array2.sort().toString()) {
			return true;
		} else {
			return false;
		}

	},

	cloneForm(form) {
		var res = JSON.parse(JSON.stringify(form));
		return res;
	},

	fillForm(form, pform) {
		var res = JSON.parse(JSON.stringify(form));
		for (var key in form) {
			if (pform[key]) {
				form[key] = pform[key];
			}
		};
		return form;
	},

	buttonCanClick(self, type) {
		if (type) {
			self.data.buttonCanClick = type;
			self.setData({
				web_buttonCanClick: self.data.buttonCanClick
			});
			if (type) {
				uni.hideLoading();
			};
			return type;
		} else if (self.data.buttonCanClick) {
			self.data.buttonCanClick = false;
			self.setData({
				web_buttonCanClick: self.data.buttonCanClick
			});
			uni.showLoading();
			return self.data.buttonCanClick;
		} else {
			uni.showLoading();
			return false;
		};
	},

	getToday() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	},

	getJsonLength(json) {
		var length = 0;
		for (var item in json) {
			length++
		};
		return length;
	},

	jsonToArray(obj, type) {

		const result = [];
		for (let key in obj) {
			//result.push(key);
			if (type == 'push') {
				result.push(obj[key]);
			};
			if (type == 'unshift') {
				result.unshift(obj[key]);
			};
		};
		return result;
	},

	getStorageArray(storageName, key, value) {
		const self = this;
		if (uni.getStorageSync(storageName)) {
			var array = JSON.parse(uni.getStorageSync(storageName));
			if (key && value && array) {
				var index = self.findItemInArray(array, key, value)[0];
				return array[index];
			} else if (array) {
				return array;
			} else {
				return false;
			};
		} else {
			return [];
		};
	},

	setStorageArray(storageName, item, key, limit, type = 'unshift') {

		const self = this;
		if (uni.getStorageSync(storageName)) {
			var array = JSON.parse(uni.getStorageSync(storageName));
			if (array.length < limit) {
				self.setItemInArray(array, item, key, type);
			} else {
				if (type == 'unshift') {
					array.splice(array.length - 1, 1);
				} else {
					array.splice(0, 1);
				};
				self.setItemInArray(array, item, key, type);
			};
		} else {
			var array = [];
			array[type](item);
		};
		array = JSON.stringify(array);
		uni.setStorageSync(storageName, array);
		return true;

	},

	delStorageArray(storageName, item, key) {

		const self = this;
		var array = JSON.parse(uni.getStorageSync(storageName));
		var index = self.findItemInArray(array, key, item[key])[0];
		array.splice(index, 1);
		array = JSON.stringify(array);
		uni.setStorageSync(storageName, array);
		return true;

	},

	findItemInArray(array, fieldName, field) {

		for (var i = 0; i < array.length; i++) {
			if (array[i][fieldName] == field) {
				return [i, array[i]];
			}
		};
		return false;
	},

	findItemsInArray(array, fieldName, field) {
		var array = [];
		for (var i = 0; i < array.length; i++) {
			if (array[i][fieldName] == field) {
				array.push({
					index: i,
					data: array[i]
				});
			}
		};
		return array;
	},


	addItemInArray(array, fieldName) {
		var count = 0;
		for (var i = 0; i < array.length; i++) {
			if (array[i][fieldName]) {
				count += parseFloat(array[i][fieldName])
			};
		};
		return count.toFixed(2);
	},

	setItemInArray(array, item, fieldName, type = 'push') {
		var findI = -1;
		for (var i = 0; i < array.length; i++) {
			if (array[i][fieldName] == item[fieldName]) {
				findI = i;
			};
		};
		if (findI >= 0) {
			array[findI] = item;
		} else {
			array[type](item);
		};
		return array;
	},

	footOne(res, name, limit, objName) {
		const self = this;
		if (wx.getStorageSync(objName)) {
			var history = wx.getStorageSync(objName);
			var limitSum = self.getJsonLength(history);
			

			if (history[res[name]]) {
				history[res[name]] = res;
				wx.setStorageSync(objName, history);
			} else {
				if (limitSum < limit) {
					history[res[name]] = res;
				} else {
					const historyArray = self.jsonToArray(history, 'push');
					historyArray.splice(0, 1);
					historyArray.push(res);
					var history = {};
					for (var i = 0; i < historyArray.length; i++) {
						history[historyArray[i][name]] = historyArray[i];
					};
				}
				wx.setStorageSync(objName, history);
			}

		} else {
			var history = {};
			history[res[name]] = res;
			wx.setStorageSync(objName, history);
		}

	},

	updateFootOne(name, objName, fieldName, field) {
		const self = this;
		if (wx.getStorageSync(objName)) {
			var history = wx.getStorageSync(objName);
			
			if (history[name]) {
				history[name][fieldName] = field;
				wx.setStorageSync(objName, history);
			}
		} else {
			return false;
		}

	},

	deleteFootOne(name, objName) {
		const self = this;
		if (wx.getStorageSync(objName)) {
			var history = wx.getStorageSync(objName);
			
			if (history[name]) {
				delete history[name];
				wx.setStorageSync(objName, history);
			}
		} else {
			return false;
		}

	},

	footTwo(res, limit, objName) {
		const self = this;
		if (wx.getStorageSync(objName)) {
			var history = wx.getStorageSync(objName);
			var limitSum = history.length;
			if (limitSum < limit) {
				history.unshift(res);
			} else {
				history.splice(limitSum - 1, 1);
				history.unshift(res);
			};
			wx.setStorageSync(objName, history);
		} else {
			var history = [];
			history.unshift(res);
			wx.setStorageSync(objName, history);
		}
	},

	skuChoose(skuData, choosed_sku_item) {
		const self = this;

		var can_choose_sku_item = [];
		var can_choosed_sku_item = [];
		var choosed_skuData = {};
		can_choose_sku_item = self.cloneForm(choosed_sku_item);
		for (var i = 0; i < skuData.length; i++) {
			if (JSON.stringify(skuData[i].sku_item.sort()) == JSON.stringify(choosed_sku_item.sort())) {
				choosed_skuData = self.cloneForm(skuData[i]);	
				var finish = true;
				can_choosed_sku_item = self.cloneForm(skuData[i].sku_item);
				
			} else {
				if (choosed_sku_item.length > 0) {
					var all = true;
					
					var choosedLength = choosed_sku_item.length;
					if(choosedLength>1){
						for (var c_i = 0; c_i < choosedLength; c_i++) {
							if (skuData[i].sku_item.indexOf(choosed_sku_item[c_i]) == -1) {
								all = false;
							};
						};
					};
					
					if (all) {
						can_choose_sku_item.push.apply(can_choose_sku_item, skuData[i].sku_item);
						if(!finish){
							can_choosed_sku_item = self.cloneForm(skuData[i].sku_item);
						};	
					};
				} else {
					can_choose_sku_item.push.apply(can_choose_sku_item, skuData[i].sku_item);
				};
				
			};
		};

		return {
			choosed_skuData: choosed_skuData,
			can_choose_sku_item: this.uniqueArray(can_choose_sku_item),
			can_choosed_sku_item: can_choosed_sku_item
		};
	},

	uniqueArray(array) {
		array.sort();
		var re = [array[0]];
		for (var i = 1; i < array.length; i++) {
			if (array[i] !== re[re.length - 1]) {
				re.push(array[i]);
			}
		}
		return re;
	},

	intersectionInArray(array, array1) {
		var newArray = [];
		for (var i = 0; i < array.length; i++) {
			if (array1.indexOf(array[i]) != -1) {
				newArray.push(array[i])
			};
		};
		return newArray;
	},


	clearPageIndex(self) {
		self.paginate.currentPage = 1;
		self.isLoadAll = false;
		self.mainData = [];

	},


	fillChange(e, self, name) {
		const key = this.getDataSet(e, "key");
		const value = e.detail.value;
		self.data[name][key] = value;

	},

	checkComplete(obj) {
		var pass = true;
		for (var key in obj) {
			if (!obj[key] || JSON.stringify(obj[key]) == '[]' || JSON.stringify(obj[key]) == '{}') {
				if (obj[key] === 0) {
					pass = true;
				} else {
					pass = false;
				};
			};
		};
		return pass;
	},

	getcurrentPage() {
		var pages = getCurrentPages();
		var currentPage = pages[pages.length - 1];
		return currentPage;
	},

	checkLoadAll(array, item, self) {

		var path = this.getcurrentPage().route
		if (wx.getStorageSync('checkLoadAll') && wx.getStorageSync('checkLoadAll').path == path) {
			var testArray = wx.getStorageSync('checkLoadAll').testArray;
		} else {
			var testArray = [];
		};
		testArray.push(item);
		if (this.checkArrayEqual(array, testArray)) {
			wx.hideLoading();
			wx.removeStorageSync('checkLoadAll');
			if (self) {
				self.data.buttonCanClick = true;
				self.setData({
					web_buttonCanClick: self.data.buttonCanClick
				});
			};
			wx.hideNavigationBarLoading();
			wx.stopPullDownRefresh();
			return true;
		} else {
			wx.setStorageSync('checkLoadAll', {
				path: path,
				testArray: testArray
			});
			return false
		};

	},

	timeToTimestamp(format) {

		var mydata = format.replace('-', '/');
		mydata = mydata.replace('-', '/');
		return new Date(mydata) / 1000;

	},

	timeto(date, type) {
		var seperator1 = "-";
		var seperator2 = ":";
		var date = parseInt(date);
	
	
		var date = new Date(date);
	
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		if (hour >= 0 && hour <= 9) {
			hour = "0" + hour;
		}
		if (min >= 0 && min <= 9) {
			min = "0" + min;
		}
		if (sec >= 0 && sec <= 9) {
			sec = "0" + sec;
		}
		if (type == "ym") {
			// 转年月
			var currentdate = date.getFullYear() + seperator1 + month;
		} else if (type == "ymd") {
			// 转年月日
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
		} else if (type == "ymd-hms") {
			//转年月日 时分秒
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
				" " + date.getHours() + seperator2 + date.getMinutes() +
				seperator2 + date.getSeconds();
		} else if (type == "hms") {
			//转时分秒
			var currentdate = date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
		}
		return currentdate;
	},
	
	formatMsgTime(timespan) {
		timespan=timespan.replace(/-/g, '/');
		var timeStamp = this.timeToTimestamp(timespan)*1000
		var dateTime = new Date(timespan);
		console.log('dateTime',dateTime)
		
		//dateTime=dateTime.replace(/-/g, '/')
		var year = dateTime.getFullYear();
		var month = dateTime.getMonth() + 1;
		var day = dateTime.getDate();
		var hour = dateTime.getHours();
		var minute = dateTime.getMinutes();
		var second = dateTime.getSeconds();
		
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (day >= 0 && day <= 9) {
			day = "0" + day;
		}
		if (hour >= 0 && hour <= 9) {
			hour = "0" + hour;
		}
		if (minute >= 0 && minute <= 9) {
			minute = "0" + minute;
		}
		if (second >= 0 && second <= 9) {
			second = "0" + second;
		}
		var now = Date.parse(new Date());
		var milliseconds = 0;
		var timeSpanStr;
		milliseconds = now - timeStamp;
		
		now = this.timeto(now,'ymd-hms')
		now = new Date(now);
		console.log('now',now)
		if (milliseconds <= 1000 * 60 * 1) {
			timeSpanStr = '刚刚';
		} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
			timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
		} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
			timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
		} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
			timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
		} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
			timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
		} else {
			timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
		}
		return timeSpanStr;
	},
	
	likeNum(num) {
	    if (num === 0) {
	        num = 0;
	    }
	    else if (num > 9999 && num <= 9999999) {
	        num = parseInt(num / 10000);
	        num = parseInt(num) + "万";
	    }

	    return num;
	
	}

}
