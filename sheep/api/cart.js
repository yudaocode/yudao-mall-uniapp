import request from '@/sheep/request';

export default {
	list: (data) =>
		request({
			url: '/app-api/trade/cart/list',
			method: 'GET',
			custom: {
				showLoading: false,
				auth: true,
			},
		}),
	append: (data) =>
		request({
			url: '/app-api/trade/cart/add',
			method: 'POST',
      // TODO 芋艿：这里没提示
			custom: {
				showSuccess: true,
				successMsg: '已添加到购物车~',
			},
			data: {
				...data,
				// type: 'inc',
			},
		}),
	// append: (data) =>
	// 	request({
	// 		url: 'cart',
	// 		method: 'POST',
	// 		custom: {
	// 			showSuccess: true,
	// 			successMsg: '已添加到购物车~',
	// 		},
	// 		data: {
	// 			...data,
	// 			type: 'inc',
	// 		},
	// 	}),
	// 删除购物车
	delete: (ids) =>
		request({
			url: '/app-api/trade/cart/delete?ids=' + ids,
			method: 'DELETE',
		}),
	update: (data) =>
		request({
			url: '/app-api/trade/cart/update-count',
			method: 'PUT',
			data: {
				...data,
				type: 'cover',
			},
		}),
};