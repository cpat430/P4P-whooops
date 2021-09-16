import { AppEvent } from './appEvent';
import { getSingletonSocketIo } from './singletonSocketIo';

export const trackEvent = (event: AppEvent): void => {
  const io = getSingletonSocketIo();
  io.emit('track-event', event);
};
