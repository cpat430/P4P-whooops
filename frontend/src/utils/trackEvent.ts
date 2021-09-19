import { AppEvent } from './appEvent';
import { singletonIo } from './singletonSocketIo';

export const trackEvent = (event: AppEvent): void => {
  singletonIo.emit('track-event', event);
};
