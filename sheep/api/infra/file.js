import request2 from '@/sheep/request2';

const FileApi = {
  // 上传文件
  uploadFile: (file) => {
    const token = uni.getStorageSync('token');
    uni.showLoading({
      title: '上传中',
    });
    return new Promise((resolve, reject) => {
      // 此处先换成yudao
      // TODO 芋艿：后续搞下
      uni.uploadFile({
        // url: 'http://api-dashboard.yudao.iocoder.cn' + '/app-api/infra/file/upload',
        url: 'http://127.0.0.1:48080' + '/app-api/infra/file/upload',
        filePath: file,
        name: 'file',
        header: {
          // Accept: 'text/json',
          // Authorization: token,
          Accept : '*/*',
          'tenant-id' :'1',
          Authorization:  'Bearer test247',
        },
        success: (uploadFileRes) => {
          debugger
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
};

export default FileApi;
