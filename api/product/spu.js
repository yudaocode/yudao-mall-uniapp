import request from "@/utils/request.js";

// 获得商品 SPU 列表
export function getSpuList(recommendType) {
  return request.get('app-api/product/spu/list', {
    recommendType
  });
}

// 获得商品 SPU 分页
export function getSpuPage(data) {
  return request.get('app-api/product/spu/page', data);
}

// 查询商品
export function getSpuDetail(id) {
  return request.get('app-api/product/spu/get-detail', {
    id
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
