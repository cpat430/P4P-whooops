import React, { createContext, ReactNode, useState } from 'react';

export type AppEvent = {
  name:
    | 'init-app'
    | 'click-add-friend-button'
    | 'click-user-profile'
    | 'click-edit-interest'
    | 'submit-survey'
    | 'click-location-marker';
};

type AppEventContextProps = {
  appEvents: AppEvent[];
  addAppEvent: (event: AppEvent) => void;
};

export const AppEventContext = createContext<AppEventContextProps>({
  appEvents: [],
  addAppEvent: () => {
    return undefined;
  },
});

export const AppEventProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [appEvents, setAppEvents] = useState<AppEvent[]>([
    { name: 'init-app' },
  ]);

  const addAppEvent = (appEvent: AppEvent, args?: unknown) => {
    // TODO what to do with this event?
    setAppEvents(appEvents.concat(appEvent));
  };

  const context = {
    appEvents,
    addAppEvent,
  };

  return (
    <AppEventContext.Provider value={context}>
      {children}
    </AppEventContext.Provider>
  );
};
