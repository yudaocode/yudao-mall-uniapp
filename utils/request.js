import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME,
	HEADERPARAMS
} from '@/config/app';
import {
	toLogin,
	checkLogin
} from '../libs/login';
import store from '../store';
import {getTerminal} from "./util";

// TODO 芋艿：临时解决 uniapp 在小程序，undefined 会被 tostring 的问题
function deleteUndefinedProperties(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        deleteUndefinedProperties(obj[key]); // 递归调用，处理嵌套的对象
      } else if (obj[key] === undefined) {
        delete obj[key];
      }
    }
  }
}

/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false
}, params) {
	let Url = HTTP_REQUEST_URL,header = HEADER
	if (params != undefined) {
		header = HEADERPARAMS;
	}
	if (!noAuth) {
		//登录过期自动登录
		if (!store.state.app.token && !checkLogin()) {
      // debugger
			toLogin();
			return Promise.reject({
				msg: '未登录'
			});
		}
	}

  deleteUndefinedProperties(data)

  // TODO 补个 header 多租户
  if (url.indexOf('app-api') >= 0) {
    header = {
      ...header
    }
    header['tenant-id'] = 1
  }

  	// 终端
	header['terminal'] = getTerminal()

	if (store.state.app.token) {
    // header[TOKENNAME] = store.state.app.token;
    header['Authorization'] = 'Bearer ' + store.state.app.token;
  }
	return new Promise((reslove, reject) => {
		uni.request({
			// url: url.indexOf('app-api') < 0 ? Url + '/api/front/' + url
      url: url.indexOf('app-api') < 0 ? Url + '/api/front/' + url
        // : 'http://yunai.natapp1.cc/' + url, // TODO 芋艿：搞个 url 的配置
        : 'http://127.0.0.1:48080/' + url, // TODO 芋艿：搞个 url 的配置
        // : 'http://api-dashboard.yudao.iocoder.cn/' + url, // TODO 芋艿：搞个 url 的配置
      method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				if (noVerify)
					reslove(res.data, res);
				else if (res.data.code === 200 || res.data.code === 0)
					reslove(res.data, res);
				else if ([410000, 410001, 410002, 401].indexOf(res.data.code) !== -1) {
					toLogin();
					reject(res.data);
				} else
					reject(res.data.msg || res.data.message || '系统错误');
			},
			fail: (msg) => {
				reject('请求失败');
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt, params) => baseRequest(api, method, data, opt || {}, params)
});



export default request;
