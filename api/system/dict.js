import request from "@/utils/request.js";

// 根据字典类型查询字典数据信息
export function getDicts(dictType) {
  return request.get('app-api/system/dict-data/type?type=' + dictType);
}
