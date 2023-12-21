import request from '@/sheep/request';

export default {
	// 分销商详情
	agent: () =>
		request({
			url: 'commission/agent',
			method: 'GET',
			custom: {
				showLoading: false,
				showError: false,
			},
		}),
	// 分销表单
	form: () =>
		request({
			url: 'commission/agent/form',
			method: 'GET',
		}),
	// 申请分销商
	apply: (data) =>
		request({
			url: 'commission/agent/apply',
			method: 'POST',
			data,
			custom: {
				showSuccess: true,
			},
		}),
	// 分销动态
	log: (params) =>
		request({
			url: 'commission/log',
			method: 'GET',
			params,
		}),
	// 分销订单
	order: (params) =>
		request({
			url: '/app-api/trade/brokerage-record/page',
			method: 'GET',
			params,
		}),

	// 分销商品
	goods: (params) =>
		request({
			url: '/app-api/product/spu/page',
			method: 'GET',
			params,
		}),
	// 我的团队
	team: (params) =>
		request({
			url: '/app-api/trade/brokerage-user/child-summary-page',
			method: 'GET',
			params,
		}),
	// 佣金转余额
	transfer: (data) =>
		request({
			url: 'commission/agent/transfer',
			method: 'POST',
			data,
		}),
	getSummary: (data) =>
		request({
			url: '/app-api/trade/brokerage-user/get-summary',
			method: 'GET',
		}),
	getBrokerageRankNumber: (params) =>
		request({
			url: '/app-api/trade/brokerage-user/get-rank-by-price',
			method: 'GET',
			params
		}),
	getBrokerageRankList: (params) =>
		request({
			url: '/app-api/trade/brokerage-user/rank-page-by-price',
			method: 'GET',
			params
		}),
	getRanklist: (params) =>
		request({
			url: '/app-api/trade/brokerage-user/rank-page-by-user-count',
			method: 'GET',
			params
		}),
};