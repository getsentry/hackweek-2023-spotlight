# @spotlightjs/core

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
