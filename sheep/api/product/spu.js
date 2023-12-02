import request from '@/sheep/request';

const SpuApi = {
    // 获得商品 SPU 列表
    getSpuList: (recommendType) => {
        return request({
            url: '/app-api/product/spu/list',
            method: 'GET',
            params: {recommendType},
        });
    },
    // 获得商品 SPU 列表
    getSpuListByIds: (ids) => {
        return request({
            url: '/app-api/product/spu/list-by-ids',
            method: 'GET',
            params: {ids},
        });
    },
    // 获得商品 SPU 分页
    getSpuPage: (data) => {
        return request({
            url: '/app-api/product/spu/page',
            method: 'GET',
            data
        });
    },
    // 查询商品
    getSpuDetail: (id) => {
        return request({
            url: '/app-api/product/spu/get-detail',
            method: 'GET',
            params: { id },
        });
    }
};
export default SpuApi;
