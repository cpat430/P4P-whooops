import { getSingletonSocketIo } from './singletonSocketIo';
import { AppEvent } from './types';

export const trackEvent = (event: AppEvent) => {
  const io = getSingletonSocketIo();
};
