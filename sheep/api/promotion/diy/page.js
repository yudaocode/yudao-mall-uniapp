import request from '@/sheep/request';

const DiyPageApi = {
	getDiyPage: (id) => {
		return request({
			url: '/promotion/diy-page/get',
			method: 'GET',
			params: {
				id
			}
		});
	},
};

export default DiyPageApi;
