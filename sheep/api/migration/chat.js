import request from '@/sheep/request';

// TODO 芋艿：暂不支持 socket 聊天
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
