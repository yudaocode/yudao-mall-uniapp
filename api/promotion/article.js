import request from "@/utils/request.js";

// 获得文章分类列表
export function getArticleCategoryList() {
  return request.get("app-api/promotion/article-category/list", {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得文章列表
export function getArticleList(data) {
  return request.get("app-api/promotion/article/list", data, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得文章分页
export function getArticlePage(data) {
  return request.get("app-api/promotion/article/page", data, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 获得文章
export function getArticle(id) {
  return request.get("app-api/promotion/article/get", {
    id
  }, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}

// 增加文章浏览量
export function addArticleBrowseCount(id) {
  return request.put("app-api/promotion/article/add-browse-count?id=" + id, {}, {
    noAuth: true // TODO 芋艿：后续要做调整
  });
}
