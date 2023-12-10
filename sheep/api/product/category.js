import request from '@/sheep/request';

const CategoryApi = {
    // 查询分类列表
    getCategoryList: () => {
        return request({
            url: '/app-api/product/category/list',
            method: 'GET'
        });
    }
};
export default CategoryApi;
