import request from '@/sheep/request';

const SpuHistoryApi = {
    // 删除商品浏览记录
    deleteBrowseHistory: (spuIds) => {
        return request({
            url: '/app-api/product/browse-history/delete',
            method: 'DELETE',
            data: { spuIds },
        });
    },
    // 清空商品浏览记录
    cleanBrowseHistory: () => {
        return request({
            url: '/app-api/product/browse-history/clean',
            method: 'DELETE',
        });
    },
    // 获得商品浏览记录分页
    getBrowseHistoryPage: (data) => {
        return request({
            url: '/app-api/product/browse-history/page',
            method: 'GET',
            data
        });
    },
    // 获得商品浏览记录数量
    getBrowseHistoryCount: () => {
        return request({
            url: '/app-api/product/browse-history/get-count',
            method: 'GET',
        });
    }
};
export default SpuHistoryApi;
