import request from '@/sheep/request';

const DiyPageApi = {
	getDiyPage: (id) => {
		return request({
			url: '/app-api/promotion/diy-page/get',
			method: 'GET',
			params: {
				id
			}
		});
	},
};

export default DiyPageApi;
