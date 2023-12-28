import request from '@/sheep/request';
import request2 from '@/sheep/request2';
import $platform from '@/sheep/platform';

export default {



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

	address: {
		default: () =>
			request2({
				url: 'member/address/get-default',
				method: 'GET',
				custom: {
					showError: false,
				},
			}),
		list: () =>
			request2({
				url: 'member/address/list',
				method: 'GET',
				custom: {},
			}),
		create: (data) =>
			request2({
				url: 'member/address/create',
				method: 'POST',
				data,
				custom: {
					showSuccess: true,
				},
			}),
		update: (data) =>
			request2({
				url: 'member/address/update',
				method: 'PUT',
				data,
				custom: {
					showSuccess: true,
				},
			}),
		detail: (id) =>
			request2({
				url: 'member/address/get?id=' + id,
				method: 'GET',
			}),
		delete: (id) =>
			request2({
				url: 'member/address/delete?id=' + id,
				method: 'DELETE',
			}),
	},
	favorite: {
		list: (params) =>
			request2({
				url: 'product/favorite/page',
				method: 'GET',
				params,
			}),
		do: (id) =>
			request({
				url: 'user/goodsLog/favorite',
				method: 'POST',
				data: {
					goods_id: id,
				},
				custom: {
					showSuccess: true,
					auth: true,
				},
			}),
		// 取消收藏
		cancel: (id) =>
			request2({
				url: 'product/favorite/delete-list',
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
		// cancel: (id) =>
		//   request({
		//     url: 'user/goodsLog/favorite',
		//     method: 'POST',
		//     data: {
		//       goods_ids: id,
		//     },
		//     custom: {
		//       showSuccess: true,
		//       auth: true,
		//     },
		//   }),
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
			request2({
				// url: 'member/point/record/page',
				url: 'pay/wallet-transaction/page',
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
	}
};