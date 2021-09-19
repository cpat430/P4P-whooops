import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import { AppEvent, TestingGroup } from './frontend-types';

dotenv.config();
const port = process.env.PORT || 4000;

const allAppEvents: AppEvent[] = [];

const main = () => {
  const app = express();
  app.use(express.json());

  // The request is forwarded to the frontend if it does not hit any backend endpoints
  // It sends the index.html of the frontend, which is generated after yarn build
  const buildPath = path.join(__dirname, '/../../frontend/build');
  const indexPath = path.join(buildPath, 'index.html');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => res.sendFile(indexPath));

  const server = app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}!`);
  });

  // Init socket listeners
  const io = new Server(server);
  io.on('connection', (socket) => {
    socket.on('change-env-name', (envName: string) => {
      io.emit('update-env-name', envName);
    });
    socket.on('change-testing-group', (testingGroup: TestingGroup) => {
      io.emit('update-testing-group', testingGroup);
    });
    socket.on('track-event', (appEvent: AppEvent) => {
      allAppEvents.push(appEvent);
      io.emit('update-all-events', allAppEvents);
    });
  });
};

main();
