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