import request from '@/sheep/request';

const DiyTemplateApi = {
	getUsedDiyTemplate: () => {
	    return request({
	        url: '/promotion/diy-template/used',
	        method: 'GET',
	    });
	},
	getDiyTemplate: (id) => {
		return request({
			url: '/promotion/diy-template/get',
			method: 'GET',
			params: {
				id
			}
		});
	},
};

export default DiyTemplateApi;