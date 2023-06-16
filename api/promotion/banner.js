import request from "@/utils/request.js";

export function getBannerList(position) {
  return request.get("app-api/promotion/banner/list", {
    position
  });
}
