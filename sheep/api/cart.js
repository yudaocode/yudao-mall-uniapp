import request from '@/sheep/request';
import request2 from '@/sheep/request2';

export default {
	list: (data) =>
		request2({
			url: 'trade/cart/list',
			method: 'GET',
			custom: {
				showLoading: false,
				auth: true,
			},
		}),
	append: (data) =>
		request({
			url: 'cart',
			method: 'POST',
			custom: {
				showSuccess: true,
				successMsg: '已添加到购物车~',
			},
			data: {
				...data,
				type: 'inc',
			},
		}),
	// 删除购物车
	delete: (ids) =>
		request2({
			url: 'trade/cart/delete?ids=' + ids,
			method: 'DELETE',
		}),
	update: (data) =>
		request2({
			url: 'trade/cart/update-count',
			method: 'PUT',
			data: {
				...data,
				type: 'cover',
			},
		}),
};