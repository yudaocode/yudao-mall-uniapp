import request from '@/sheep/request';
import $platform from '@/sheep/platform';

export default {
	getUnused: () =>
		request({
			url: '/app-api/promotion/coupon/get-unused-count',
			method: 'GET',
			custom: {
				showLoading: false,
				auth: true,
			},
		}),
	profile: () =>
		request({
			url: '/app-api/member/user/get',
			method: 'GET',
			custom: {
				showLoading: false,
				auth: true,
			},
		}),
	balance: () =>
		request({
			url: '/app-api/pay/wallet/get',
			method: 'GET',
			custom: {
				showLoading: false,
				auth: true,
			},
		}),
	update: (data) =>
		request({
			url: '/app-api/member/user/update',
			method: 'PUT',
			custom: {
				showSuccess: true,
				auth: true,
			},
			data,
		}),
	// 账号登录
	accountLogin: (data) =>
		request({
			url: '/user/api/user/accountLogin',
			method: 'POST',
			data,
			custom: {
				showSuccess: true,
				loadingMsg: '登录中',
			},
		}),
	// 短信登录
	smsLogin: (data) =>
		request({
			url: '/user/api/user/smsLogin',
			method: 'POST',
			data,
			custom: {
				showSuccess: true,
				loadingMsg: '登录中',
			},
		}),
	// 短信注册
	smsRegister: (data) =>
		request({
			url: '/user/api/user/smsRegister',
			method: 'POST',
			data,
			custom: {
				showSuccess: true,
				loadingMsg: '正在注册',
			},
		}),
	// 重置密码
	resetPassword: (data) =>
		request({
			url: '/user/api/user/resetPassword',
			method: 'POST',
			data,
			custom: {
				showSuccess: true,
				loadingMsg: '验证中',
			},
		}),

	// 修改密码
	changePassword: (data) =>
		request({
			url: '/user/api/user/changePassword',
			method: 'POST',
			data,
			custom: {
				showSuccess: true,
				loadingMsg: '验证中',
			},
		}),

	// 绑定、更换手机号
	changeMobile: (data) =>
		request({
			url: '/user/api/user/changeMobile',
			method: 'POST',
			data,
			custom: {
				showSuccess: true,
				loadingMsg: '验证中',
			},
		}),

	// 修改用户名
	changeUsername: (data) =>
		request({
			url: '/user/api/user/changeUsername',
			method: 'POST',
			data,
			custom: {
				showSuccess: true,
				loadingMsg: '验证中',
			},
		}),

	// 更新小程序信息
	updateMpUserInfo: (data) =>
		request({
			url: '/user/api/user/updateMpUserInfo',
			method: 'POST',
			data,
		}),

	// 第三方授权信息
	thirdOauthInfo: () =>
		request({
			url: '/user/api/user/thirdOauth',
			method: 'GET',
			params: {
				provider: $platform.provider,
				platform: $platform.platform,
			},
			custom: {
				showLoading: false,
			},
		}),

	// 添加分享记录
	addShareLog: (data) =>
		request({
			url: 'share/add',
			method: 'POST',
			data,
			custom: {
				showError: false,
			},
		}),
	share: {
		list: (params) =>
			request({
				url: 'share/list',
				method: 'GET',
				params,
			}),
	},
	// 账号登出
	logout: (data) =>
		request({
			url: '/user/api/user/logout',
			method: 'POST',
			data,
		}),
	// 账号注销
	logoff: (data) =>
		request({
			url: '/user/api/user/logoff',
			method: 'POST',
			data,
		}),

	address: {
		default: () =>
			request({
				url: '/app-api/member/address/get-default',
				method: 'GET',
				custom: {
					showError: false,
				},
			}),
		list: () =>
			request({
				url: '/app-api/member/address/list',
				method: 'GET',
				custom: {},
			}),
		create: (data) =>
			request({
				url: '/app-api/member/address/create',
				method: 'POST',
				data,
				custom: {
					showSuccess: true,
				},
			}),
		update: (data) =>
			request({
				url: '/app-api/member/address/update',
				method: 'PUT',
				data,
				custom: {
					showSuccess: true,
				},
			}),
		detail: (id) =>
			request({
				url: '/app-api/member/address/get?id=' + id,
				method: 'GET',
			}),
		delete: (id) =>
			request({
				url: '/app-api/member/address/delete?id=' + id,
				method: 'DELETE',
			}),
	},
	invoice: {
		list: () =>
			request({
				url: 'user/invoice',
				method: 'GET',
				custom: {},
			}),
		create: (data) =>
			request({
				url: 'user/invoice',
				method: 'POST',
				data,
				custom: {
					showSuccess: true,
				},
			}),
		update: (id, data) =>
			request({
				url: 'user/invoice/' + id,
				method: 'PUT',
				data,
				custom: {
					showSuccess: true,
				},
			}),
		detail: (id) =>
			request({
				url: 'user/invoice/' + id,
				method: 'GET',
			}),
		delete: (id) =>
			request({
				url: 'user/invoice/' + id,
				method: 'DELETE',
			}),
	},
	favorite: {
		list: (params) =>
			request({
				url: '/app-api/product/favorite/page',
				method: 'GET',
				params,
			}),
		do: (id) =>
			request({
				url: '/app-api/product/favorite/create',
				method: 'POST',
				data: {
					spuId: id,
				},
				custom: {
					showSuccess: true,
					auth: true,
				},
			}),
		dos: (id) =>
			request({
				url: '/app-api/product/favorite/delete',
				method: 'DELETE',
				data: {
					spuId: id,
				},
				custom: {
					showSuccess: true,
					auth: true,
				},
			}),
		// 取消收藏
		cancel: (id) =>
			request({
				url: '/app-api/product/favorite/delete-list',
				method: 'DELETE',
				data: {
					spuIds: id.split(',').map(item => item * 1),
					// spuIds: id.split(',').join(','),
				},
				custom: {
					showSuccess: true,
					auth: true,
				},
			}),
	},
	view: {
		list: (params) =>
			request({
				url: 'user/goodsLog/views',
				method: 'GET',
				params,
				custom: {},
			}),
		delete: (data) =>
			request({
				url: 'user/goodsLog/viewDel',
				method: 'DELETE',
				data,
				custom: {
					showSuccess: true,
				},
			}),
	},
	wallet: {
		log: (params) =>
			request({
				// url: 'member/point/record/page',
				url: '/app-api/pay/wallet-transaction/page',
				method: 'GET',
				params,
				custom: {},
			}),
		log2: (params) =>
			request({
				url: '/app-api/member/point/record/page',
				// url: 'pay/wallet-transaction/page',
				method: 'GET',
				params,
				custom: {},
			}),
	},
	account: {
		info: (params) =>
			request({
				url: 'user/account',
				method: 'GET',
				params,
				custom: {
					showError: false,
					auth: true,
				},
			}),
		save: (data) =>
			request({
				url: 'user/account',
				method: 'POST',
				data,
				custom: {
					showSuccess: true,
					auth: true,
				},
			}),
	},
	//数量接口
	data: () =>
		request({
			url: '/app-api/trade/order/get-count',
			method: 'GET',
			custom: {
				showLoading: false,
				auth: true,
			},
		}),
	data2: () =>
		request({
			url: '/app-api/trade/after-sale/get-applying-count',
			method: 'GET',
			custom: {
				showLoading: false,
				auth: true,
			},
		}),
};