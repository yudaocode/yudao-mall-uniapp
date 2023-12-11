import request from '@/sheep/request';
import request2 from '@/sheep/request2';

export default {
	// 获得优惠劵模板列表
	getCouponTemplateListByIds: (ids) => {
		return request({
			url: '/app-api/promotion/coupon-template/list-by-ids',
			method: 'GET',
			params: {
				ids
			},
		});
	},
	// 获得优惠劵模版列表
	getCouponTemplateList: (params) => {
		return request2({
			url: `promotion/coupon/match-list?price=${params.price}&spuIds=${params.spuIds}&skuIds=${params.skuIds}&categoryIds=${params.categoryIds}`,
			method: 'GET',
			// params,
		});
	},
	// getCouponTemplateList: (spuId, productScope, count) => {
	//   return request({
	//     url: '/app-api/promotion/coupon-template/list',
	//     method: 'GET',
	//     params: { spuId, productScope, count },
	//   });
	// },
};