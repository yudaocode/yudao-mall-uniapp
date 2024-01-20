import request from '@/sheep/request';

const SpuApi = {
    // 获得商品 SPU 列表
    getSpuList: (recommendType) => {
        return request({
            url: '/product/spu/list',
            method: 'GET',
            params: {recommendType},
        });
    },
    // 获得商品 SPU 列表
    getSpuListByIds: (ids) => {
        return request({
            url: '/product/spu/list-by-ids',
            method: 'GET',
            params: {ids},
        });
    },
    // 获得商品 SPU 分页
    getSpuPage: (data) => {
        return request({
            url: '/product/spu/page',
            method: 'GET',
            data
        });
    },
    // 查询商品
    getSpuDetail: (id) => {
        return request({
            url: '/product/spu/get-detail',
            method: 'GET',
            params: { id },
        });
    }
};
export default SpuApi;
