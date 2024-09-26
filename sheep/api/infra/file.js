import { baseUrl, apiPath, tenantId } from '@/sheep/config';
import request from '@/sheep/request';

const FileApi = {
  // 上传文件
  uploadFile: (file) => {
    // TODO 芋艿：访问令牌的接入；
    const token = uni.getStorageSync('token');
    uni.showLoading({
      title: '上传中',
    });
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: baseUrl + apiPath + '/infra/file/upload',
        filePath: file,
        name: 'file',
        header: {
          // Accept: 'text/json',
          Accept: '*/*',
          'tenant-id': tenantId,
          // Authorization:  'Bearer test247',
        },
        success: (uploadFileRes) => {
          let result = JSON.parse(uploadFileRes.data);
          if (result.error === 1) {
            uni.showToast({
              icon: 'none',
              title: result.msg,
            });
          } else {
            return resolve(result);
          }
        },
        fail: (error) => {
          console.log('上传失败：', error);
          return resolve(false);
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    });
  },

  // 获取文件预签名地址
  getFilePresignedUrl: (path) => {
    return request({
      url: '/infra/file/presigned-url',
      method: 'GET',
      params: {
        path,
      },
    });
  },

  // 创建文件
  createFile: (data) => {
    return request({
      url: '/infra/file/create', // 请求的 URL
      method: 'POST', // 请求方法
      data: data, // 要发送的数据
    });
  },
};

export default FileApi;
