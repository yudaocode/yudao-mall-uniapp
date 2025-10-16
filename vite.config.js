import { loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
// import viteCompression from 'vite-plugin-compression';
import uniReadPagesV3Plugin from './src/sheep/router/utils/uni-read-pages-v3';
import mpliveMainfestPlugin from './src/sheep/libs/mplive-manifest-plugin';

// https://vitejs.dev/config/
export default (command, mode) => {
  const env = loadEnv(mode, __dirname, 'SHOPRO_');
  return {
    envPrefix: 'SHOPRO_',
    plugins: [
      uni(),
      // viteCompression({
      // 	verbose: false
      // }),
      uniReadPagesV3Plugin({
        pagesJsonDir: path.resolve(__dirname, './src/pages.json'),
        includes: ['path', 'aliasPath', 'name', 'meta'],
      }),
      mpliveMainfestPlugin(env.SHOPRO_MPLIVE_ON),
    ],
    pluginOptions: {
      uni: {
        manifestPath: path.resolve(__dirname, './manifest.json'),
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        // 可以添加更多别名
        // '@components': path.resolve(__dirname, './src/components'),
        // '@utils': path.resolve(__dirname, './src/utils'),
      },
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          javascriptEnabled: true,
          silenceDeprecations: ['legacy-js-api', 'global-builtin'],
          additionalData: `@use '@/sheep/scss/theme/index.scss' as *;`, // 全局样式变量和混入
        },
      },
    },
    server: {
      host: true,
      // open: true,
      port: env.SHOPRO_DEV_PORT,
      hmr: {
        overlay: true,
      },
    },
  };
};
