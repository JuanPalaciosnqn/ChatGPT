import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';


// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    plugins: [react(), wasm(), topLevelAwait()],
    define: {
      'process.env': env
    },
    resolve: {
      alias: {
        '@icon/': new URL('./src/assets/icons/', import.meta.url).pathname,
        '@logo/': new URL('./src/assets/logo/', import.meta.url).pathname,
        '@type/': new URL('./src/types/', import.meta.url).pathname,
        '@store/': new URL('./src/store/', import.meta.url).pathname,
        '@hooks/': new URL('./src/hooks/', import.meta.url).pathname,
        '@constants/': new URL('./src/constants/', import.meta.url).pathname,
        '@api/': new URL('./src/api/', import.meta.url).pathname,
        '@components/': new URL('./src/components/', import.meta.url).pathname,
        '@utils/': new URL('./src/utils/', import.meta.url).pathname,
        '@src/': new URL('./src/', import.meta.url).pathname,
      },
    },
    base: env.VITE_PUBLIC_PATH,
  }
});
