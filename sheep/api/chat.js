import request from '@/sheep/request';

export default {
  // 获取聊天token
  unifiedToken: () =>
    request({
      url: 'unifiedToken',
      custom: {
        showError: false,
        showLoading: false,
      },
    }),
};
