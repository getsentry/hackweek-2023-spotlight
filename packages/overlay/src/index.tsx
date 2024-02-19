import fontStyles from '@fontsource/raleway/index.css?inline';
import { MemoryRouter } from 'react-router-dom';
import colors from 'tailwindcss/colors';
import App from './App.tsx';
import { DEFAULT_ANCHOR, DEFAULT_EXPERIMENTS, DEFAULT_SIDECAR_URL } from './constants.ts';
import globalStyles from './index.css?inline';
import { initIntegrations, type SpotlightContext } from './integrations/integration.ts';
import { default as sentry } from './integrations/sentry/index.ts';
import { getSpotlightEventTarget } from './lib/eventTarget.ts';
import { activateLogger, log } from './lib/logger.ts';
import { SpotlightContextProvider } from './lib/useSpotlightContext.tsx';
import { React, ReactDOM } from './react-instance.tsx'; // Import specific exports
import { SpotlightOverlayOptions, WindowWithSpotlight } from './types.ts';

export { default as console } from './integrations/console/index.ts';
export { default as hydrationError } from './integrations/hydration-error/index.ts';
export { default as sentry } from './integrations/sentry/index.ts';
export { default as viteInspect } from './integrations/vite-inspect/index.ts';
export { React, ReactDOM };
function createStyleSheet(styles: string) {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(styles);
  return sheet;
}

/**
 * Open the Spotlight debugger Window
 */
export async function openSpotlight(path?: string | undefined) {
  getSpotlightEventTarget().dispatchEvent(
    new CustomEvent('open', {
      detail: { path },
    }),
  );
}

/**
 * Close the Spotlight debugger Window
 */
export async function closeSpotlight() {
  getSpotlightEventTarget().dispatchEvent(new CustomEvent('close'));
}

/**
 * Invokes the passed in callback when the Spotlight debugger Window is closed
 */
export async function onClose(cb: () => void) {
  getSpotlightEventTarget().addEventListener('closed', cb);
}

/**
 * Invokes the passed in callback when the Spotlight debugger Window is opened
 */
export async function onOpen(cb: () => void) {
  getSpotlightEventTarget().addEventListener('opened', cb);
}

/**
 * Register a callback that is invoked when a severe event is processed
 * by a Spotlight integration.
 * A count of the number of collected severe events is passed to the callback.
 */
export async function onSevereEvent(cb: (count: number) => void) {
  getSpotlightEventTarget().addEventListener('severeEventCount', e => {
    cb((e as CustomEvent).detail?.count ?? 1);
  });
}

/**
 * Trigger an event in Spotlight.
 *
 * This is primarily useful for handling an uncaught error/crash, and forcing the debugger
 * to render vs a native error handler.
 *
 * e.g. trigger("sentry.showError", {eventId});
 */
export async function trigger(eventName: string, payload: unknown) {
  getSpotlightEventTarget().dispatchEvent(
    new CustomEvent(eventName, {
      detail: payload,
    }),
  );
}

function isSpotlightInjected() {
  const windowWithSpotlight = window as WindowWithSpotlight;
  if (windowWithSpotlight.__spotlight && window.document.getElementById('sentry-spotlight-root')) {
    return true;
  }
  return false;
}

export async function init({
  openOnInit = false,
  showTriggerButton = true,
  injectImmediately = false,
  sidecarUrl = DEFAULT_SIDECAR_URL,
  anchor = DEFAULT_ANCHOR,
  debug = false,
  integrations,
  experiments = DEFAULT_EXPERIMENTS,
  fullPage = false,
  showClearEventsButton = true,
}: SpotlightOverlayOptions = {}) {
  if (typeof document === 'undefined') return;

  const finalExperiments = { ...DEFAULT_EXPERIMENTS, ...experiments };

  // We only want to intialize and inject spotlight once. If it's already
  // been initialized, we can just bail out.
  if (isSpotlightInjected()) return;

  if (debug) {
    activateLogger();
  }

  // Sentry is enabled by default
  const defaultInitegrations = [sentry({ sidecarUrl })];

  const context: SpotlightContext = {
    open: openSpotlight,
    close: closeSpotlight,
    experiments: finalExperiments,
  };

  const [initializedIntegrations] = await initIntegrations(integrations ?? defaultInitegrations, context);

  // build shadow dom container to contain styles
  const docRoot = document.createElement('div');
  docRoot.id = 'sentry-spotlight-root';
  const shadow = docRoot.attachShadow({ mode: 'open' });
  const appRoot = document.createElement('div');
  if (fullPage) {
    docRoot.style.height = '100%';
    docRoot.style.backgroundColor = colors.indigo[950];
    appRoot.style.height = 'inherit';
  } else {
    appRoot.style.position = 'absolute';
    appRoot.style.top = '0';
    appRoot.style.left = '0';
    appRoot.style.right = '0';
  }
  shadow.appendChild(appRoot);

  const ssGlobal = createStyleSheet(globalStyles);
  shadow.adoptedStyleSheets = [createStyleSheet(fontStyles), ssGlobal];

  if (import.meta.hot) {
    import.meta.hot.accept('./index.css?inline', newGlobalStyles => {
      ssGlobal.replaceSync(newGlobalStyles?.default);
    });
  }

  const tabs = initializedIntegrations
    .map(integration => {
      if (integration.tabs) {
        return integration.tabs({ processedEvents: [] }).map(tab => ({
          ...tab,
          processedEvents: [],
        }));
      }
      return [];
    })
    .flat();

  const initialTab = tabs.length ? `/${tabs[0].id}` : '/no-tabs';

  ReactDOM.createRoot(appRoot).render(
    // <React.StrictMode>
    <MemoryRouter initialEntries={[initialTab]}>
      <SpotlightContextProvider context={context}>
        <App
          integrations={initializedIntegrations}
          openOnInit={openOnInit}
          showTriggerButton={showTriggerButton}
          sidecarUrl={sidecarUrl}
          anchor={anchor}
          fullPage={fullPage}
          showClearEventsButton={showClearEventsButton}
        />
      </SpotlightContextProvider>
    </MemoryRouter>,
    // </React.StrictMode>
  );

  function injectSpotlight() {
    log('Injecting into application');
    document.body.append(docRoot);
  }

  if (injectImmediately) {
    injectSpotlight();
  } else {
    window.addEventListener('load', () => {
      injectSpotlight();
    });
  }
  window.addEventListener('error', () => {
    if (!isSpotlightInjected()) {
      injectSpotlight();
    }
  });
}
