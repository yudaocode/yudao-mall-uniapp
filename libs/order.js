import {
	preOrderApi
} from '@/api/order.js';
import util from 'utils/util'

// TODO 芋艿：需要调整位置
/**
 * 去商品详情
 */
export function goShopDetail(item, uid) {
	return new Promise(resolve => {
    const activityH5 = item.activityList && item.activityList[0] ? item.activityList[0] : null;
		if (activityH5 && activityH5.type === 1) {
			uni.navigateTo({
				url: `/pages/activity/goods_seckill_details/index?id=${activityH5.id}`
			})
		} else if (activityH5 && activityH5.type === 2) {
			uni.navigateTo({
				url: `/pages/activity/goods_bargain_details/index?id=${activityH5.id}&startBargainUid=${uid}`
			})
		} else if (activityH5 && activityH5.type === 3) {
			uni.navigateTo({
				url: `/pages/activity/goods_combination_details/index?id=${activityH5.id}`
			})
		} else {
			resolve(item);
		}
	});
}

/**
 * 活动商品、普通商品、购物车、再次购买预下单
 */
export function getPreOrder(preOrderType, orderDetails) {
	return new Promise((resolve, reject) => {
		preOrderApi({
			"preOrderType": preOrderType,
			"orderDetails": orderDetails
		}).then(res => {
			uni.navigateTo({
				url: '/pages/users/order_confirm/index?preOrderNo=' + res.data.preOrderNo
			});
		}).catch(err => {
			return util.Tips({
				title: err
			});
		})
	});
}
