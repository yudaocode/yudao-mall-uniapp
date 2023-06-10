import request from "@/utils/request.js";

// 获得秒杀活动明细
export function getSeckillActivity(id) {
  return request.get("app-api/promotion/seckill-activity/get-detail", {
    id
  });
}
