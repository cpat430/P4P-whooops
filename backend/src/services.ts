import express, { Request, Response } from 'express';

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

export { services };
