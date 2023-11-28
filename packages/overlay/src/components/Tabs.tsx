import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { type IntegrationTab } from '~/integrations/integration';
import classNames from '../lib/classNames';
import { getSpotlightEventTarget } from '../lib/eventTarget';
import useKeyPress from '../lib/useKeyPress';

export type Props = {
  /**
   * Array of tabs to display.
   */
  tabs: IntegrationTab<unknown>[];

  /**
   * Whether the tabs are nested inside another tab.
   * If `nested` is `true`, links will be set relative to the parent
   * tab route instead of absolute to the root.
   */
  nested?: boolean;
};

export default function Tabs({ tabs, nested }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const spotlightEventTarget = getSpotlightEventTarget();

  useKeyPress('Escape', () => {
    if (location.pathname.split('/').length === 2) {
      spotlightEventTarget.dispatchEvent(new CustomEvent('closed'));
    } else {
      navigate(-1);
    }
  });

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none sm:text-sm"
          onChange={e => {
            const activeTab = tabs.find(tab => tab.id === e.target.value);
            if (activeTab && activeTab.onSelect) {
              activeTab.onSelect();
            }
            navigate(`${nested ? '' : '/'}${activeTab?.id || 'not-found'}`);
          }}
        >
          {tabs.map((tab, tabIdx) => (
            <option key={tabIdx} value={tab.id}>
              {tab.title} {tab.notificationCount}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="border-b-primary-700 flex space-x-8 border-b px-6" aria-label="Tabs">
          {tabs.map(tab => (
            <NavLink
              to={`${nested ? '' : '/'}${tab.id}`}
              key={tab.id}
              replace={true}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? 'border-primary-200 text-primary-100 [&>.count]:bg-primary-100 [&>.count]:text-primary-600'
                    : 'text-primary-400 hover:border-primary-400 hover:text-primary-100 [&>.count]:bg-primary-700 [&>.count]:text-primary-200 border-transparent',
                  '-m-y -mx-2 flex whitespace-nowrap border-b-2 px-2 py-3 text-sm font-medium',
                )
              }
              onClick={() => tab.onSelect && tab.onSelect()}
            >
              {tab.title}
              {tab.notificationCount !== undefined ? (
                <span className="count ml-3 hidden rounded px-2.5 py-0.5 text-xs font-medium md:inline-block">
                  {tab.notificationCount}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
