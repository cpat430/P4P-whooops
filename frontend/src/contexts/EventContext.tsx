import React, { createContext, ReactNode, useState } from 'react';
import { trackEvent } from '../utils/trackEvent';

type Event = {
  name: string;
};

type EventContextProps = {
  events: Event[];
  addEvent: (event: Event) => void;
};

export const EventContext = createContext<EventContextProps>({
  events: [],
  addEvent: () => {
    console.log('pmo');
  },
});

export const EventProvider = ({
  children,
}: {
  children?: ReactNode;
}): JSX.Element => {
  const [events, setEvents] = useState([{ name: 'init-event' }]);

  const addEvent = (event: Event) => {
    console.log(event);
    trackEvent(event.name, { lol: 'lol!' }); // TODO
    setEvents(events.concat(event));
  };

  const context = {
    events,
    addEvent,
  };

  return (
    <EventContext.Provider value={context}>{children}</EventContext.Provider>
  );
};
