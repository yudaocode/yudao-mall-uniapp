import request from '@/sheep/request';

export default {
	order: (id) =>
		request({
			url: 'trade/order/' + id,
			method: 'GET',
			custom: {
				showLoading: false,
			},
		}),
	orderLog: (params) =>
		request({
			url: 'trade/order',
			method: 'GET',
			params,
			custom: {
				showLoading: false,
			},
		}),


};