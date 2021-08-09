import React, { createContext, ReactNode, useState } from 'react';
import { trackEvent } from '../utils/trackEvent';

export type AppEvent = {
  name: string;
};

type AppEventContextProps = {
  appEvents: AppEvent[];
  addEvent: (event: AppEvent) => void;
};

export const AppEventContext = createContext<AppEventContextProps>({
  appEvents: [],
  addEvent: () => {
    console.log('pmo');
  },
});

export const AppEventProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [appEvents, setAppEvents] = useState([{ name: 'init-event' }]);

  const addEvent = (appEvent: AppEvent) => {
    console.log(appEvent);
    trackEvent(appEvent.name, { lol: 'lol!' }); // TODO
    setAppEvents(appEvents.concat(appEvent));
  };

  const context = {
    appEvents,
    addEvent,
  };

  return (
    <AppEventContext.Provider value={context}>
      {children}
    </AppEventContext.Provider>
  );
};
