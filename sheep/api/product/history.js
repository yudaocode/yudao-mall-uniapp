import request from '@/sheep/request';

const SpuHistoryApi = {
    // 删除商品浏览记录
    deleteBrowseHistory: (spuIds) => {
        return request({
            url: '/product/browse-history/delete',
            method: 'DELETE',
            data: { spuIds },
        });
    },
    // 清空商品浏览记录
    cleanBrowseHistory: () => {
        return request({
            url: '/product/browse-history/clean',
            method: 'DELETE',
        });
    },
    // 获得商品浏览记录分页
    getBrowseHistoryPage: (data) => {
        return request({
            url: '/product/browse-history/page',
            method: 'GET',
            data
        });
    }
};
export default SpuHistoryApi;
