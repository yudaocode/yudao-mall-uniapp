import request from '@/sheep/request';
import request2 from '@/sheep/request2';

export default {
	// 订单详情
	detail: (id, params) =>
		request2({
			url: 'trade/order/get-detail?id=' + id,
			method: 'GET',
			params,
		}),
	// detail: (id, params) =>
	// 	request({
	// 		url: 'order/order/' + id,
	// 		method: 'GET',
	// 		params,
	// 	}),
	// 发票详情
	invoice: (id) =>
		request({
			url: 'order/invoice/' + id,
			method: 'GET',
		}),
	// 获取支付结果
	payResult: (id) =>
		request({
			url: 'order/order/' + id,
			method: 'GET',
			custom: {
				showLoading: false,
			},
		}),
	itemDetail: (id, itemId) =>
		request({
			url: 'order/order/itemDetail/' + id + '/' + itemId,
			method: 'GET',
			custom: {
				showLoading: false,
			},
		}),
	// 订单列表
	list: (params) =>
		request2({
			url: 'trade/order/page',
			method: 'GET',
			params,
			custom: {
				showLoading: false,
			},
		}),
	// list: (params) =>
	//   request({
	//     url: 'order/order',
	//     method: 'GET',
	//     params,
	//     custom: {
	//       showLoading: false,
	//     },
	//   }),
	// 计算订单信息
	calc: (data) => {
		const data2 = {
			...data,
		}
		// 解决 SpringMVC 接受 List<Item> 参数的问题
		delete data2.items
		for (let i = 0; i < data.items.length; i++) {
			// data2['items[' + i + '' + '].skuId'] = data.items[i].skuId + '';
			// data2['items[' + i + '' + '].count'] = data.items[i].count + '';
			// data2['items[' + i + '' + '].cartId'] = data.items[i].cartId + '';
			data2['items' + `%5B${i}%5D` + '.skuId'] = data.items[i].skuId + '';
			data2['items' + `%5B${i}%5D` + '.count'] = data.items[i].count + '';
			data2['items' + `%5B${i}%5D` + '.cartId'] = data.items[i].cartId + '';
		}
		console.log(data2, '对比数据')
		return request2({
			url: 'trade/order/settlement',
			method: 'GET',
			// data,
			params: data2
		})
	},
	// calc: (data) =>
	//   request({
	//     url: 'order/order/calc',
	//     method: 'POST',
	//     data,
	//   }),
	// 创建订单
	create: (data) =>
		request({
			url: 'order/order/create',
			method: 'POST',
			data,
		}),
	//订单可用优惠券
	coupons: (data) =>
		request({
			url: 'order/order/coupons',
			method: 'POST',
			data,
		}),
	// 确认收货
	confirm: (id) =>
		request({
			url: 'order/order/confirm/' + id,
			method: 'PUT',
		}),
	// 评价订单
	comment: (data) =>
		request2({
			url: 'trade/order/item/create-comment',
			method: 'POST',
			data,
		}),
	// comment: (id, data) =>
	// 	request({
	// 		url: 'order/order/comment/' + id,
	// 		method: 'POST',
	// 		data,
	// 	}),
	// 申请退款
	applyRefund: (id) =>
		request({
			url: 'order/order/applyRefund/' + id,
			method: 'PUT',
		}),
	// 取消订单
	cancel: (id) =>
		request({
			url: 'order/order/cancel/' + id,
			method: 'PUT',
		}),
	// 删除订单
	delete: (id) =>
		request({
			url: 'order/order/' + id,
			method: 'DELETE',
		}),
	// 售后
	aftersale: {
		// 申请售后
		apply: (data) =>
			request({
				url: 'order/aftersale',
				method: 'POST',
				data,
			}),
		list: (params) =>
			request2({
				url: 'trade/after-sale/page',
				method: 'GET',
				params,
				custom: {
					showLoading: false,
				},
			}),
		// list: (params) =>
		// 	request({
		// 		url: 'order/aftersale',
		// 		method: 'GET',
		// 		params,
		// 		custom: {
		// 			showLoading: false,
		// 		},
		// 	}),
		//取消售后
		cancel: (id) =>
			request({
				url: 'order/aftersale/cancel/' + id,
				method: 'PUT',
			}),
		//删除售后单
		delete: (id) =>
			request({
				url: 'order/aftersale/' + id,
				method: 'DELETE',
			}),
		// 售后详情
		detail: (id) =>
			request2({
				url: 'trade/after-sale/get?id=' + id,
				method: 'GET',
			}),
	},
	//订单包裹
	express: (id, orderId) =>
		request({
			url: 'order/express/' + id + `${orderId ? '/' + orderId : ''}`,
			method: 'GET',
		}),
};