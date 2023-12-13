import request from '@/sheep/request';

export default {
	decorate: () =>
		request({
			url: '/app-api/promotion/decorate/list?page=1',
			method: 'GET',
		}),
	spids: () =>
		request({
			url: '/app-api/product/spu/page?recommendType=best&pageNo=1&pageSize=10',
			method: 'GET',
		}),
};