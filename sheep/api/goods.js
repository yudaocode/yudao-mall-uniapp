import request from '@/sheep/request';

export default {
	// 商品详情
	detail: (id, params = {}) =>
		request({
			url: '/app-api/product/spu/get-detail?id=' + id,
			method: 'GET',
			params,
			custom: {
				showLoading: false,
				showError: false,
			},
		}),

	// 商品列表
	list: (params) =>
		request({
			url: '/app-api/product/spu/page',
			method: 'GET',
			params,
			custom: {
				showLoading: false,
				showError: false,
			},
		}),

	// 商品查询
	ids: (params = {}) =>
		request({
			url: 'goods/goods/ids',
			method: 'GET',
			params,
			custom: {
				showLoading: false,
				showError: false,
			},
		}),
	// 商品评价列表
	comment: (id, params = {}) =>
		request({
			url: '/app-api/product/comment/list?spuId=' + id,
			method: 'GET',
			params,
			custom: {
				showLoading: false,
				showError: false,
			},
		}),
	// 商品评价类型
	getType: (id) =>
		request({
			url: 'goods/comment/getType/' + id,
			method: 'GET',
			custom: {
				showLoading: false,
				showError: false,
			},
		}),
	// 活动商品查询
	// 商品查询
	activity: (params = {}) =>
		request({
			url: 'goods/goods/activity',
			method: 'GET',
			params,
			custom: {
				showLoading: false,
				showError: false,
			},
		}),
	activityList: (params = {}) =>
		request({
			url: 'goods/goods/activityList',
			method: 'GET',
			params,
		}),
	// 检查是否收藏商品
	exits: (id) =>
		request({
			url: '/app-api/product/favorite/exits?spuId=' + id,
			method: 'GET',
		}),
};