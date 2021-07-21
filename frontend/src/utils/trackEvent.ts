import axios from 'axios';

export const trackEvent = (name: string, args?: any) => {
  console.log(`Tracking event: ${name}`);
  // TODO what are some things that we should universally track
  // - event name
  // - user
  // - time of event

  axios
    .post('/services/track-event', {
      name,
      time: Date.now(),
      body: args,
    })
    .then((response) => {
      console.log('Successful');
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e.message);
    });
  console.log(args);
};
