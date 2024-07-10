import type { AstroConfig, AstroIntegration } from 'astro';
import { buildClientInitSnippet, buildServerSnippet } from './snippets';

import path from 'path';
import url from 'url';

import type { SpotlightAstroIntegrationOptions } from './types';
import { errorPageInjectionPlugin } from './vite/error-page';

type AstroConfigWithExperimentalDevOverlay = AstroConfig & {
  experimental?: {
    /**
     * This used to be the way of enabling the dev overlay pre Astro 4.x
     */
    devOverlay?: boolean;
  };
};

const createPlugin = (options?: SpotlightAstroIntegrationOptions): AstroIntegration => {
  return {
    name: '@spotlightjs/astro',

    hooks: {
      'astro:config:setup': async ({
        command,
        injectScript,
        addDevOverlayPlugin,
        addDevToolbarApp,
        logger,
        config,
      }) => {
        if (command === 'dev') {
          logger.info('[@spotlightjs/astro] Setting up Spotlight');

          config.vite.plugins = [errorPageInjectionPlugin(), ...(config.vite.plugins || [])];

          // Since Astro 4.0.0-beta.4, `devToolbar` is set and enabled by default.
          // briefly, `devOverlay` was also added to the config but is now deprecated.
          // Setting either of these to `true` or not setting any of them in the config file
          // will lead to both of them being enabled by the time this hook is called.
          // Setting one of them to `false` will not set the other one to false.
          // Therefore, both of them have to be `true` that we know that the toolbar is in fact active.
          const hasToolbarEnabled = config.devToolbar?.enabled || config.devOverlay?.enabled;

          // Before Astro 4, `devOverlay` was disabled by default and under `experimental`
          const hasExperimentalDevOverlayEnabled = !!(config as AstroConfigWithExperimentalDevOverlay).experimental
            ?.devOverlay;

          const showTriggerButton = !hasToolbarEnabled && !hasExperimentalDevOverlayEnabled;

          injectScript('page', buildClientInitSnippet({ showTriggerButton, ...options }));
          injectScript('page-ssr', buildServerSnippet(options));

          const importPath = path.dirname(url.fileURLToPath(import.meta.url));
          const pluginPath = path.join(importPath, 'overlay/index.ts');

          // `addDevToolbarApp` was added in Astro 4.0.0-beta.4.
          if (typeof addDevToolbarApp === 'function') {
            addDevToolbarApp(pluginPath);
          } else {
            // fall back to old name for pre 4.x support
            addDevOverlayPlugin(pluginPath);
          }
        } else if (options?.__debugOptions) {
          injectScript('page', buildClientInitSnippet(options));
        }
      },

      'astro:server:start': async ({ logger }) => {
        if (options?.sidecarUrl) {
          logger.debug('Detected custom sidecar URL. Skipping default sidecar setup.');
          // If users set a custom sidecar URL, we assume they started the sidecar manually outside of Astro.
          // So we don't setup the default sidecar instance.
          return;
        }

        // Importing this dynamically because for some reason, the top level import
        // caused a dev server error because the sidecar code was bundled into the server
        const { setupSidecar } = await import('@spotlightjs/spotlight/sidecar');
        setupSidecar({ logger });
      },
    },
  };
};

export default createPlugin;
