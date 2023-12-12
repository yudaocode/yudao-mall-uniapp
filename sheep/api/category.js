export default {
	list: (params) =>
		request({
			url: '/app-api/product/category/list',
			method: 'GET',
			params,
		}),
};