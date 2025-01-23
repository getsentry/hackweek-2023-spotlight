import { ReactComponent as AstroIcon } from 'platformicons/svg/astro.svg';
import { ReactComponent as DefaultIcon } from 'platformicons/svg/default.svg';
import { ReactComponent as DotNetIcon } from 'platformicons/svg/dotnet.svg';
import { ReactComponent as FirefoxIcon } from 'platformicons/svg/firefox.svg';
import { ReactComponent as ChromeIcon } from 'platformicons/svg/google.svg';
import { ReactComponent as JavaScriptIcon } from 'platformicons/svg/javascript.svg';
import { ReactComponent as PhpLaravelIcon } from 'platformicons/svg/laravel.svg';
import { ReactComponent as DotNetMauiIcon } from 'platformicons/svg/maui.svg';
import { ReactComponent as NestJsIcon } from 'platformicons/svg/nestjs.svg';
import { ReactComponent as NextJsIcon } from 'platformicons/svg/nextjs.svg';
import { ReactComponent as NodeIcon } from 'platformicons/svg/nodejs.svg';
import { ReactComponent as PhpIcon } from 'platformicons/svg/php.svg';
import { ReactComponent as PythonIcon } from 'platformicons/svg/python.svg';
import { ReactComponent as RemixIcon } from 'platformicons/svg/remix.svg';
import { ReactComponent as RubyIcon } from 'platformicons/svg/ruby.svg';
import { ReactComponent as SafariIcon } from 'platformicons/svg/safari.svg';
import { ReactComponent as PhpSymfonyIcon } from 'platformicons/svg/symfony.svg';
import { SentryEvent } from '../types';

import { ComponentPropsWithoutRef } from 'react';

type Platform = 'python' | 'javascript' | 'node' | 'ruby' | 'csharp' | string;

type PlatformIconProps = ComponentPropsWithoutRef<'svg'> & {
  size?: number;
  platform?: Platform;
  event?: SentryEvent;
  height?: number;
  width?: number;
  title?: string;
};

export default function PlatformIcon({ platform, event, size = 42, title, ...props }: PlatformIconProps) {
  return (
    <WrappedIcon platform={platform} event={event} size={size} title={title} {...props}>
      <CorePlatformIcon platform={platform} event={event} size={size} title={title} {...props} />
    </WrappedIcon>
  );
}

function WrappedIcon({ event, size = 42, ...props }: PlatformIconProps) {
  const wrappedWidth = size / 3;
  const wrappedHeight = size / 3;

  return (
    <div className="relative">
      {props.children}
      <RuntimeIcon
        event={event}
        size={size}
        width={wrappedWidth}
        height={wrappedHeight}
        {...props}
        className="absolute bottom-1 right-1"
      />
    </div>
  );
}

function RuntimeIcon({
  event,
  size = 42,
  ...props
}: ComponentPropsWithoutRef<'svg'> & {
  size?: number;
  event?: SentryEvent;
  height?: number;
  width?: number;
  title?: string;
}) {
  const runtimeName = `${event?.contexts?.runtime?.name || ''}`;
  if (!runtimeName) return null;

  const runtimeTitle = `${runtimeName} ${event?.contexts?.runtime?.version}`;
  switch (runtimeName) {
    case 'node':
      return <NodeIcon title={runtimeTitle} width={size} height={size} {...props} />;
  }

  const browserName = `${event?.contexts?.browser?.name || ''}`;
  const browserTitle = `${browserName} ${event?.contexts?.browser?.version}`;

  if (browserName.includes('Safari')) {
    return <SafariIcon title={browserTitle} width={size} height={size} {...props} />;
  }
  if (browserName.includes('Chrome')) {
    return <ChromeIcon title={browserTitle} width={size} height={size} {...props} />;
  }
  if (browserName.includes('Firefox')) {
    return <FirefoxIcon title={browserTitle} width={size} height={size} {...props} />;
  }

  return null;
}

function CorePlatformIcon({ platform, event, size = 42, title, ...props }: PlatformIconProps) {
  const name = platform || event?.platform || 'unknown';
  const sdk = event?.sdk?.name || '';
  const newTitle = title ?? name;
  if (sdk.startsWith('sentry.javascript.nextjs')) {
    return <NextJsIcon title={newTitle} width={size} height={size} {...props} />;
  } else if (sdk.startsWith('sentry.javascript.astro')) {
    return <AstroIcon title={newTitle} width={size} height={size} {...props} />;
  } else if (sdk.startsWith('sentry.javascript.remix')) {
    return <RemixIcon title={newTitle} width={size} height={size} {...props} />;
  } else if (sdk.startsWith('sentry.javascript.nestjs')) {
    return <NestJsIcon title={newTitle} width={size} height={size} {...props} />;
  }

  switch (name) {
    case 'ruby':
      return <RubyIcon title={newTitle} width={size} height={size} {...props} />;
    case 'python':
      return <PythonIcon title={newTitle} width={size} height={size} {...props} />;
    case 'javascript':
      return <JavaScriptIcon title={newTitle} width={size} height={size} {...props} />;
    case 'node':
      return <NodeIcon title={newTitle} width={size} height={size} {...props} />;
    case 'php':
      return <PhpIcon title={newTitle} width={size} height={size} {...props} />;
    case 'php.laravel':
      return <PhpLaravelIcon title={newTitle} width={size} height={size} {...props} />;
    case 'php.symfony':
      return <PhpSymfonyIcon title={newTitle} width={size} height={size} {...props} />;
    case 'dotnet':
    case 'csharp': // event.platform is 'csharp'
      return <DotNetIcon title={newTitle} width={size} height={size} {...props} />;
    case 'dotnet.maui':
      return <DotNetMauiIcon title={newTitle} width={size} height={size} {...props} />;
    default:
      return <DefaultIcon title={newTitle} width={size} height={size} {...props} />;
  }
}
