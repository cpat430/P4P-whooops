import axios from 'axios';

export const trackEvent = (name: string, args?: unknown): void => {
  console.log(`Tracking event: ${name}`);
  // TODO what are some things that we should universally track
  // event name, user, time of event
  axios
    .post('/services/track-event', {
      name,
      time: Date.now(),
      body: args,
    })
    .catch(() => {
      console.log('Unsuccessful');
    });
};
