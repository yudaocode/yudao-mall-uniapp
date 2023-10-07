import request from "@/utils/request.js";

// 查询分类列表
export function getCategoryList() {
  return request.get('app-api/product/category/list', {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
