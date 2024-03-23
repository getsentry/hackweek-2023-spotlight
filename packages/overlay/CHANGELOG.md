# @spotlightjs/core

## 1.8.1

### Patch Changes

- - Fixed the scneario when trace_id is not present in envelope ex: metrics event.
    ([#381](https://github.com/getsentry/spotlight/pull/381))
  - Added event type and fixed formatting of envelope info.

## 1.8.0

### Minor Changes

- Added Developer Info tab to check the envelopes recived from Sentry
  ([#378](https://github.com/getsentry/spotlight/pull/378))

### Patch Changes

- - Fixed the empty trace scenario on trace detail page when clear events button is clicked.
    ([#366](https://github.com/getsentry/spotlight/pull/366))
  - fixed some semantics and empty state labels

- - Added Span Resizer in traces, which will allow user to resize the span name and waterfall.
    ([#373](https://github.com/getsentry/spotlight/pull/373))
  - Added icon for clear events button.

## 1.7.0

### Minor Changes

- Add support for message events and transactions without spans
  ([#357](https://github.com/getsentry/spotlight/pull/357))

### Patch Changes

- Added a id for trigger button and added e2e test for nextjs with custom integration
  ([#347](https://github.com/getsentry/spotlight/pull/347))

- React and react-dom exported for custom integrations ([#347](https://github.com/getsentry/spotlight/pull/347))

- 1. Removed clear events button for electron app. ([#352](https://github.com/getsentry/spotlight/pull/352))
  2. Added clear events function in Reload and force reload toolbar options in electron app.
  3. Created a event listener to clear events data.
  4. Added a reset function in integration.

- Added testcase for angular and java message sample file ([#359](https://github.com/getsentry/spotlight/pull/359))

- Define process variables for webpack builds ([#361](https://github.com/getsentry/spotlight/pull/361))

## 1.6.0

### Minor Changes

- 1. Added a DELETE /clear API route for sidecar to wipe out all data from buffer.
     ([#345](https://github.com/getsentry/spotlight/pull/345))
  2. Added a cta in overlay to clear data(only present when sentry integration is added).

### Patch Changes

- fix(overlay): Drop interaction transactions from overlay interactions
  ([#348](https://github.com/getsentry/spotlight/pull/348))

## 1.5.0

### Minor Changes

- Added a hydration-overlay extension for Nextjs projects ([#343](https://github.com/getsentry/spotlight/pull/343))

## 1.4.1

### Patch Changes

- Fix use native fetch for context lines
  ([`c47c1d6`](https://github.com/getsentry/spotlight/commit/c47c1d6857c7b9b0282f65317b53616997218281))

## 1.4.0

### Minor Changes

- Added WebVitals in Performance Section ([#330](https://github.com/getsentry/spotlight/pull/330))

### Patch Changes

- Event stack trace should have filename as optional and added a condition to prefer module name instead of filename
  ([#332](https://github.com/getsentry/spotlight/pull/332)) incase when platform is java

- Fixed condition where client removes the spotlight because of some error.
  ([#340](https://github.com/getsentry/spotlight/pull/340))

## 1.3.1

### Patch Changes

- 1. Resource tab added ([#327](https://github.com/getsentry/spotlight/pull/327))
  2. Queries tab and query Summary table improvements
  3. Added sorting for tables

- fixed ui for queries tab and added common breadcrumb component
  ([#323](https://github.com/getsentry/spotlight/pull/323))

- Fix fetch implementation to not cause endless loop ([#335](https://github.com/getsentry/spotlight/pull/335))

## 1.3.0

### Minor Changes

- Added performance and nested queries tab in spotlight to capture DB queries
  ([#314](https://github.com/getsentry/spotlight/pull/314))

### Patch Changes

- updated dockerfile to use packages/spotlight build to serve index page
  ([#311](https://github.com/getsentry/spotlight/pull/311))

- ui improvements ([#305](https://github.com/getsentry/spotlight/pull/305))

- Reverse the error stack trace for php and python platform events
  ([#312](https://github.com/getsentry/spotlight/pull/312))

## 1.2.3

### Patch Changes

- Added a UX to close the sidepanel is clicked outside ([#297](https://github.com/getsentry/spotlight/pull/297))

- fixed sorting of spans across browsers ([#293](https://github.com/getsentry/spotlight/pull/293))

## 1.2.2

### Patch Changes

- added condition to make SpanTree collapsible ([#287](https://github.com/getsentry/spotlight/pull/287))

## 1.2.1

### Patch Changes

- Remove Scrollbars in fullscreen
  ([`f15e006`](https://github.com/getsentry/spotlight/commit/f15e0068a64459cf8078c4369ca4108152c09b27))

- Add injectIntoSDK as option to Sentry integration
  ([`86e1cb4`](https://github.com/getsentry/spotlight/commit/86e1cb43f19c866cdad31c354496181a8ed8bbbf))

## 1.2.0

### Minor Changes

- dotnet logo ([#265](https://github.com/getsentry/spotlight/pull/265))

### Patch Changes

- Fix react errors ([`0c2a229`](https://github.com/getsentry/spotlight/commit/0c2a229f53f356b6413fded3352f108c0d955333))

## 1.1.0

### Minor Changes

- Make shipped HTML fullscreen
  ([`fdd14c7`](https://github.com/getsentry/spotlight/commit/fdd14c7e84172f2a0b9bc355968537e161335636))

## 1.0.1

### Patch Changes

- added expand collapse for spans ([#253](https://github.com/getsentry/spotlight/pull/253))

## 1.0.0

### Major Changes

- meta: Bump `@spotlightjs` packages to version 1.0.0 ([#228](https://github.com/getsentry/spotlight/pull/228))

  This change sets all public `@spotlightjs` packages to major version 1.0.0. From now on, we will follow semantic
  versioning.

### Patch Changes

- feat(overlay): Add experiments configuration and Spotlight Context
  ([#231](https://github.com/getsentry/spotlight/pull/231))

## 0.0.22

### Patch Changes

- fix(overlay): Open overlay on Ctrl+F12 instead of Ctrl/Cmd+Shift+F12
  ([#224](https://github.com/getsentry/spotlight/pull/224))

- fix: Exports types from overlay ([#222](https://github.com/getsentry/spotlight/pull/222))

- fix(overlay): Remove React Dev Tools warning ([#209](https://github.com/getsentry/spotlight/pull/209))

- feat(overlay): Add Astro platform icon ([#214](https://github.com/getsentry/spotlight/pull/214))

## 0.0.21

### Patch Changes

- ref(integrations): Remove `severe` property from `processEvent` return type
  ([#195](https://github.com/getsentry/spotlight/pull/195))

- fix(overlay): Fix trigger button count ([#195](https://github.com/getsentry/spotlight/pull/195))

- fix(sentry): Breadcrumbs UI improvement and minor bug fix (#194)
  ([`218be1c`](https://github.com/getsentry/spotlight/commit/218be1c252fd782437467b9abd9b6e117a9818b5))

- feat(overlay): Add tags to error event contexts view ([#199](https://github.com/getsentry/spotlight/pull/199))

## 0.0.20

### Patch Changes

- fix(overlay): Account for inverted BE->FE traces ([#185](https://github.com/getsentry/spotlight/pull/185))

- Use proper log command
  ([`5923ddc`](https://github.com/getsentry/spotlight/commit/5923ddc2f253a52c3bdb8302603fa6970b044fa2))

- feat(sidecar): Support setting a custom port ([#189](https://github.com/getsentry/spotlight/pull/189))

- ref(overlay): Rename `fullscreen` option to `openOnInit` ([#182](https://github.com/getsentry/spotlight/pull/182))

## 0.0.19

### Patch Changes

- Move everything to dev deps
  ([`aeb507a`](https://github.com/getsentry/spotlight/commit/aeb507abc4c3ba0c988b6f158959947369061b7b))

## 0.0.18

### Patch Changes

- Fix Breadcrumbs ([`d9c8ed0`](https://github.com/getsentry/spotlight/commit/d9c8ed0fbec2e015137758026a3b5eb0f4d874ba))

- feat(overlay): Add `onOpen` and `onSevereEvent` callbacks ([#161](https://github.com/getsentry/spotlight/pull/161))

- feat(core): Add support for custom sidecar URL in client Sentry integration
  ([#160](https://github.com/getsentry/spotlight/pull/160))

## 0.0.17

### Patch Changes

- Don't reverse Stacktrace for PHP & Python
  ([`00c86f1`](https://github.com/getsentry/spotlight/commit/00c86f1b574450ab1a0f62861a688965325699e7))

- Fix error count in tab
  ([`922f092`](https://github.com/getsentry/spotlight/commit/922f092a45bad917ef5b915c4933f90bfc1e4bf2))

- Remove connect function from sidecar
  ([`db73d24`](https://github.com/getsentry/spotlight/commit/db73d241bba120848732e063918afd73b34f9269))

## 0.0.16

### Patch Changes

- Renamed core to overlay package
  ([`eacbe71`](https://github.com/getsentry/spotlight/commit/eacbe71b289703efe5b62519493049d5368297fb))

## 0.0.15

### Patch Changes

- Add debug flag to Spotlight
  ([`9f9370f`](https://github.com/getsentry/spotlight/commit/9f9370f71c3d9f84fecc9fa3b890f9ccc872a766))

- Fix PHP Envelopes
  ([`d90c89c`](https://github.com/getsentry/spotlight/commit/d90c89ca6a9e86f33a4eaf4dbd6a160a4354cc3c))

## 0.0.14

### Patch Changes

- Make Sentry default integration
  ([`9f3bfe9`](https://github.com/getsentry/spotlight/commit/9f3bfe97bbbef260d6fa8c4d11ac0a6c40d0544a))

## 0.0.13

### Patch Changes

- fix(core): Ensure there's only one global spotlight event target
  ([#121](https://github.com/getsentry/spotlight/pull/121))

## 0.0.12

### Patch Changes

- fix(core): Use global event target instead of passing it via props
  ([#109](https://github.com/getsentry/spotlight/pull/109))

## 0.0.11

### Patch Changes

- fix(core): Use effect and cleanup spotlight event target listeners
  ([#104](https://github.com/getsentry/spotlight/pull/104))

## 0.0.10

### Patch Changes

- Don't Overflow body when Spotlight is open
  ([`e96a5c6`](https://github.com/getsentry/spotlight/commit/e96a5c6744ef59d79c6ed7164c9c8f6fe82d9aab))

- Add connect function
  ([`989b5b5`](https://github.com/getsentry/spotlight/commit/989b5b55cefb62240d12f65c9cf9fe9a041f03e1))

- ref(core): Guard calls to symbolication endpoint ([#97](https://github.com/getsentry/spotlight/pull/97))

## 0.0.9

### Patch Changes

- feat(astro): Add dev mode sourcemaps resolver Vite plugin ([#64](https://github.com/getsentry/spotlight/pull/64))

## 0.0.8

### Patch Changes

- fix(sentry): Reverse stack traces of error events ([#56](https://github.com/getsentry/spotlight/pull/56))

- feat(core): Add `injectImmediately` option
  ([`7606b96`](https://github.com/getsentry/spotlight/commit/7606b96080c64bfedac480bc7ab30278c69e7eca))

- fix(core): Ensure Spotlight is only initialized once
  ([`7606b96`](https://github.com/getsentry/spotlight/commit/7606b96080c64bfedac480bc7ab30278c69e7eca))

## 0.0.7

### Patch Changes

- fix(astro): Correctly reset toolbar button state ([#49](https://github.com/getsentry/spotlight/pull/49))

## 0.0.6

### Patch Changes

- Fix version bumps in package.jsons
  ([`bded33c`](https://github.com/getsentry/spotlight/commit/bded33cfd262aa7c86e35fefd9cd46f9f922d891))

## 0.0.5

### Patch Changes

- unstale yarn lock
  ([`2c3d9d1`](https://github.com/getsentry/spotlight/commit/2c3d9d1d3c9bbc36f59ed611601b0ae196c40d8b))

## 0.0.4

### Patch Changes

- ref(integrations): Adjust input and return types of `processEvent`
  ([#42](https://github.com/getsentry/spotlight/pull/42))

- Add description to package.json ([#40](https://github.com/getsentry/spotlight/pull/40))

- Removed `integrationData` prop in favour of `processedEvents` in tab component
  ([#42](https://github.com/getsentry/spotlight/pull/42))

## 0.0.3

### Patch Changes

- ref(core): Remove useNavigation and NavigationContext ([#36](https://github.com/getsentry/spotlight/pull/36))

## 0.0.2

### Patch Changes

- ref(sentry): Use React Router in Traces tab ([#31](https://github.com/getsentry/spotlight/pull/31))

- Update README ([#32](https://github.com/getsentry/spotlight/pull/32))

## 0.0.1

### Patch Changes

- Initial changeset added ([#21](https://github.com/getsentry/spotlight/pull/21))
