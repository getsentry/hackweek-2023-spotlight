import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig, loadEnv } from 'electron-vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // By default, only env variables prefixed with `MAIN_VITE_`,
  // `PRELOAD_VITE_` and `RENDERER_VITE_` are loaded,
  // unless the third parameter `prefixes` is changed.
  let env = {};
  if (mode !== 'development') {
    env = loadEnv(mode);
  }
  return {
    main: {
      plugins: [
        sentryVitePlugin({
          org: env.MAIN_VITE_SENTRY_ORG,
          project: env.MAIN_VITE_SENTRY_PROJECT,
          authToken: env.MAIN_VITE_SENTRY_AUTH_TOKEN,
          release: {
            name: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
          },
        }),
      ],
      build: {
        sourcemap: true,
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'src/electron/main/index.ts'),
          },
        },
      },
    },
    preload: {
      plugins: [
        sentryVitePlugin({
          org: env.MAIN_VITE_SENTRY_ORG,
          project: env.MAIN_VITE_SENTRY_PROJECT,
          authToken: env.MAIN_VITE_SENTRY_AUTH_TOKEN,
          release: {
            name: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
          },
        }),
      ],
      build: {
        sourcemap: true,
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'src/electron/preload/index.ts'),
          },
        },
      },
    },
    renderer: {
      plugins: [
        sentryVitePlugin({
          org: env.MAIN_VITE_SENTRY_ORG,
          project: env.MAIN_VITE_SENTRY_PROJECT,
          authToken: env.MAIN_VITE_SENTRY_AUTH_TOKEN,
          release: {
            name: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
          },
        }),
      ],
      root: '.',
      build: {
        sourcemap: true,
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'index.html'),
          },
        },
      },
    },
  };
});
