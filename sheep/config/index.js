// 开发环境配置
export let baseUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = import.meta.env.SHOPRO_DEV_BASE_URL;
} else {
  baseUrl = import.meta.env.SHOPRO_BASE_URL;
}
console.log(`[Shopro v1.0.8]  https://www.sheepjs.com/`);
export const apiPath = import.meta.env.SHOPRO_API_PATH;

export const staticUrl = import.meta.env.SHOPRO_STATIC_URL;

export default {
  baseUrl,
  apiPath,
  staticUrl,
};
