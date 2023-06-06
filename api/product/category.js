import request from "@/utils/request.js";

// 查询分类列表
export function getCategoryList() {
  return request.get('app-api/product/category/list', {});
}
