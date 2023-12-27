import request from '@/sheep/request';

export default {
	// 我的团队
	team: (params) =>
		request({
			url: '/app-api/trade/brokerage-user/child-summary-page',
			method: 'GET',
			params,
		}),
	getSummary: (data) =>
		request({
			url: '/app-api/trade/brokerage-user/get-summary',
			method: 'GET',
		})
};