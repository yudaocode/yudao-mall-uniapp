import request from '@/sheep/request';

export default {
    // 获得优惠劵模板列表
    getCouponTemplateListByIds: (ids) => {
        return request({
            url: '/app-api/promotion/coupon-template/list-by-ids',
            method: 'GET',
            params: { ids }
        });
    }
}
