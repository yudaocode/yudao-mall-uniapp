import request from '@/sheep/request';
import request2 from '@/sheep/request2';

export default {
	// 我的拼团
	list: (params) =>
		request({
			url: 'coupon',
			method: 'GET',
			params,
			custom: {
				showLoading: false,
			},
		}),

	detail: (id, user_coupon_id) =>
		request({
			url: 'coupon/' + id,
			method: 'GET',
			params: {
				user_coupon_id,
			},
		}),
	get: (id) =>
		request({
			url: 'coupon/get/' + id,
			method: 'POST',
		}),
};