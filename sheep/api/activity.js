import request from '@/sheep/request';

export default {
	myGroupon: (params) =>
		request({
			url: 'activity/groupon/myGroupons',
			method: 'GET',
			params,
		}),
	getGrouponList: (params) =>
		request({
			url: 'activity/groupon',
			method: 'GET',
			params,
		}),
	grouponDetail: (id) =>
		request({
			url: 'activity/groupon/' + id,
			method: 'GET',
		}),
	signList: (params) =>
		request({
			url: 'activity/signin',
			method: 'GET',
			params,
		}),
	signAdd: () =>
		request({
			url: '/app-api/member/sign-in/record/create',
			method: 'POST',
		}),
	configLise: () =>
		request({
			url: '/app-api/member/sign-in/config/list',
			method: 'GET',
		}),
	recordPage: () =>
		request({
			url: '/app-api/member/sign-in/record/page',
			method: 'GET',
		}),
	// signAdd: () =>
	// 	request({
	// 		url: 'activity/signin',
	// 		method: 'POST',
	// 	}),
	replenish: (data) =>
		request({
			url: 'activity/signin/replenish',
			method: 'POST',
			data,
		}),
	activity: (id) =>
		request({
			url: 'activity/activity/' + id,
			method: 'GET',
		}),
	getSummary: () =>
		request({
			url: '/app-api/member/sign-in/record/get-summary',
			method: 'GET',
		}),
	getBargainRecordSummary: () =>
		request({
			url: '/app-api/promotion/bargain-record/get-summary',
			method: 'GET',
		}),
	getBargainActivityPage: () =>
		request({
			url: '/app-api/promotion/bargain-activity/page',
			method: 'GET',
		}),
	getBargainActivityDetail: (params) =>
		request({
			url: '/app-api/promotion/bargain-activity/get-detail',
			method: 'GET',
			params
		}),

};