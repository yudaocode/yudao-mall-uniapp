import request from "@/utils/request.js";

// 获得秒杀时间段列表
export function getSeckillConfigList() {
  return request.get("app-api/promotion/seckill-config/list", {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得当前秒杀活动
export function getNowSeckillActivity() {
  return request.get("app-api/promotion/seckill-activity/get-now", {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得秒杀活动分页
export function getSeckillActivityPage(data) {
  return request.get("app-api/promotion/seckill-activity/page", data, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得秒杀活动明细
export function getSeckillActivity(id) {
  return request.get("app-api/promotion/seckill-activity/get-detail", {
    id
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
