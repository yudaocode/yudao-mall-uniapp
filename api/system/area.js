import request from "@/utils/request.js";

// 获得地区树
export function getAreaTree() {
  return request.get("app-api/system/area/tree", {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
