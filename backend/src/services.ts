import express, { Request, Response } from 'express';
import { EventModel } from './db/event-model';
import router from './routes/api';

function loggerMiddleware(
  request: Request,
  response: Response,
  next: () => void
) {
  console.log(`${request.method}: ${request.path}`);
  next();
}

const services = express();

services.use(loggerMiddleware);
services.use('/api', router);

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
    .catch(() => {
      console.log('🛑 Did not track event successfully');
      res.sendStatus(400);
    });
});

export { services };
