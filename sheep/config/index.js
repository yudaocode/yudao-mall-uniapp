import packageInfo from '@/package.json';
import { getWxEnvVersion } from '@/sheep/helper/env';

const { version } = packageInfo;


// 开发环境配置
export let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = import.meta.env.SHOPRO_DEV_BASE_URL;
} else {
  // 生产环境下，判断是体验版还是正式版
  const wxEnvVersion = getWxEnvVersion();

  if (wxEnvVersion === 'trial') {
    // 体验版使用体验版服务器地址
    baseUrl = import.meta.env.SHOPRO_TRIAL_BASE_URL || import.meta.env.SHOPRO_BASE_URL;
    console.log('当前运行环境：体验版');
  } else if (wxEnvVersion === 'release') {
    // 正式版使用生产服务器地址
    baseUrl = import.meta.env.SHOPRO_BASE_URL;
    console.log('当前运行环境：正式版');
  } else {
    // 其他平台或获取失败，使用默认地址
    baseUrl = import.meta.env.SHOPRO_BASE_URL;
  }
}
if (typeof baseUrl === 'undefined') {
  console.error('请检查.env配置文件是否存在');
} else {
  console.log(`[芋道商城 ${version}]  https://doc.iocoder.cn`);
}

export const apiPath = import.meta.env.SHOPRO_API_PATH;
export const staticUrl = import.meta.env.SHOPRO_STATIC_URL;
export const tenantId = import.meta.env.SHOPRO_TENANT_ID;
export const websocketPath = import.meta.env.SHOPRO_WEBSOCKET_PATH;
export const h5Url = import.meta.env.SHOPRO_H5_URL;

export default {
  baseUrl,
  apiPath,
  staticUrl,
  tenantId,
  websocketPath,
  h5Url,
};
