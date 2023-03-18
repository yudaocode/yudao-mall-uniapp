import { loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
// import viteCompression from 'vite-plugin-compression';
import uniReadPagesV3Plugin from './sheep/router/utils/uni-read-pages-v3';
// 引入直播组件
import replaceManifest from './modifyManifest'


// https://vitejs.dev/config/
export default (command, mode) => {
	const env = loadEnv(mode, __dirname, 'SHOPRO_');
	if (env.SHOPRO_MPLIVE_ON === 'true') {
		replaceManifest(`{
    "live-player-plugin": {
      "version": "1.3.5",
      "provider": "wx2b03c6e691cd7370"
    }
  }`, 'push')
	} else {
		replaceManifest(`{
			"live-player-plugin": {
			  "version": "1.3.5",
			  "provider": "wx2b03c6e691cd7370"
			}
		  }`, 'delete')
	}
	return {
		envPrefix: "SHOPRO_",
		plugins: [
			uni(),
			// viteCompression({
			// 	verbose: false
			// }),
			uniReadPagesV3Plugin({
				pagesJsonDir: path.resolve(__dirname, './pages.json'),
				includes: ['path', 'aliasPath', 'name', 'meta'],
			}),
		],
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
