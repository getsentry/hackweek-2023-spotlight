import { useSentrySdks } from '../data/useSentrySdks';
import PlatformIcon from './PlatformIcon';
import TimeSince from './TimeSince';

function sdkToPlatform(name: string) {
  if (name.indexOf('sentry.javascript') === 0) return 'javascript';
  return 'unknown';
}

export default function SdkList() {
  const sdkList = useSentrySdks();

  return (
    <>
      <div className="divide-y divide-indigo-500 bg-indigo-950">
        {sdkList.length !== 0 ? (
          sdkList.map(sdk => {
            return (
              <div className="flex items-center gap-x-4 px-6 py-4" key={`${sdk.name}-${sdk.version}`}>
                <PlatformIcon platform={sdkToPlatform(sdk.name)} />

                <div className="flex flex-col truncate font-mono text-indigo-300">
                  <div>{sdk.name}</div>
                  <div>{sdk.version}</div>
                  <TimeSince date={sdk.lastSeen} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-6 text-indigo-300">Looks like there's no SDKs tha thave reported yet. 🤔</div>
        )}
      </div>
    </>
  );
}
