require('dotenv').config();
const builder = require('electron-builder');

const config = {
  appId: 'io.sentry.spotlight',
  productName: 'Spotlight',
  asarUnpack: ['resources/**'],
  afterSign: 'scripts/notarize.js',
  npmRebuild: false,
  files: [
    '!**/.vscode/*',
    '!src/*',
    '!scripts/*',
    '!electron.vite.config.{js,ts,mjs,cjs}',
    '!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.yaml,dev-app-update.yml,CHANGELOG.md,README.md}',
    '!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
    '!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}',
  ],
  mac: {
    icon: 'resources/icons/mac/icon.icns',
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'build/entitlements.mac.plist',
    entitlementsInherit: 'build/entitlements.mac.plist',
    target: 'zip',
    cscLink: process.env.CSC_LINK,
    cscKeyPassword: process.env.CSC_KEY_PASSWORD,
  },
  publish: {
    provider: 'generic',
    url: 'https://example.com/auto-updates',
  },
};

builder.build({ config });
