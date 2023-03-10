import request from '@/sheep/request';
import { baseUrl } from '@/sheep/config';

export default {
  // 系统初始化
  init: (templateId) =>
    request({
      url: 'init',
      params: {
        templateId,
      },
      custom: {
        showError: false,
        showLoading: false,
      },
    }),
  // 同步客户端页面到后端
  pageSync: (pages) =>
    request({
      url: 'pageSync',
      method: 'POST',
      data: {
        pages,
      },
      custom: {
        showError: false,
        showLoading: false,
      },
    }),
  // 发送短信
  sendSms: (data) =>
    request({
      url: 'sendSms',
      method: 'POST',
      data,
      custom: {
        showSuccess: true,
        loadingMsg: '发送中',
      },
    }),
  //意见反馈
  feedback: (data) =>
    request({
      url: 'feedback',
      method: 'POST',
      data,
    }),
  // 自定义页面
  page: (id) =>
    request({
      url: 'page/' + id,
      method: 'GET',
    }),
  //积分商城
  scoreShop: {
    list: (params) =>
      request({
        url: 'app/scoreShop',
        method: 'GET',
        params,
      }),
    ids: (params = {}) =>
      request({
        url: 'app/scoreShop/ids',
        method: 'GET',
        params,
      }),
    detail: (id) =>
      request({
        url: 'app/scoreShop/' + id,
        method: 'GET',
      }),
  },
  //小程序直播
  mplive: {
    getRoomList: (ids) =>
      request({
        url: 'app/mplive/getRoomList',
        method: 'GET',
        params: {
          ids: ids.join(','),
        }
      }),
    getMpLink: () =>
      request({
        url: 'app/mplive/getMpLink',
        method: 'GET'
      }),
  },

  //上传
  upload: (file, group = 'ugc', callback) => {
    const token = uni.getStorageSync('token');
    uni.showLoading({
      title: '上传中',
    });
    return new Promise((resolve, reject) => {
      uni.uploadFile({
        url: baseUrl + '/file/api/upload',
        filePath: file,
        name: 'file',
        formData: {
          group,
        },
        header: {
          Accept: 'text/json',
          Authorization: token,
        },
        success: (uploadFileRes) => {
          let result = JSON.parse(uploadFileRes.data);
          if (result.error === 1) {
            uni.showToast({
              icon: 'none',
              title: result.msg,
            });
          } else {
            return resolve(result.data);
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
};
