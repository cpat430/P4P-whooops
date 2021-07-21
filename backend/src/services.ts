import express from 'express';
import { EventModel } from './db/event-model';

const services = express();

/**
 * Endpoint that accepts a post request from frontend, and passes
 * the body forward to mongoose as an 'Event' object
 */
services.post('/track-event', (req, res) => {
  EventModel.create({ event: req.body })
    .then(() => {
      console.log('✅ Successfully logged event');
      res.sendStatus(204);
    })
    .catch((e) => {
      console.log('🛑 Did not track event successfully');
      res.sendStatus(400);
    });
});

export { services };
