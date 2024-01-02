import request from '@/sheep/request';

const DiyTemplateApi = {
	// getUsedDiyTemplate: () => {
	//     return request({
	//         url: '/app-api/promotion/diy-template/used',
	//         method: 'GET',
	//     });
	// },
	getDiyTemplate: (id) => {
		return request({
			url: '/app-api/promotion/diy-template/get',
			method: 'GET',
			params: {
				id
			}
		});
	},
};

export default DiyTemplateApi;