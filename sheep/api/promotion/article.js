import request from '@/sheep/request';

export default {
    // 获得文章详情
    getArticle: (id) => {
        return request({
            url: '/app-api/promotion/article/get',
            method: 'GET',
            params: { id }
        });
    }
}
