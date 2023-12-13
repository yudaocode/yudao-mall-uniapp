import request from '@/sheep/request';

const CommentApi = {

	// 获得商品评价分页
	getCommentPage: (spuId, pageNo, pageSize, type) => {
		return request({
			url: '/app-api/product/comment/page',
			method: 'GET',
			params: {
				spuId,
				pageNo,
				pageSize,
				type
			},
		});
	},
};
export default CommentApi;