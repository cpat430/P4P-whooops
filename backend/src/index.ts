import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import { connectCloudDB } from './db/connect';
import { services } from './services';

dotenv.config();
const port = process.env.PORT || 4000;

const main = () => {
  const app = express();
  app.use(express.json());

  app.use('/services', services);

  connectCloudDB()
    .then(() => {
      console.log('📄 Connected to MongoDB');
    })
    .catch((e) => {
      console.error(e.message);
    });

  // The request is forwarded to the frontend if it does not hit any backend endpoints
  // It sends the index.html of the frontend, which is generated after yarn build
  const buildPath = path.join(__dirname, '/../../frontend/build');
  const indexPath = path.join(buildPath, 'index.html');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => res.sendFile(indexPath));

  const server = app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}!`);
  });

  const io = new Server(server);
  io.on('connection', (socket) => {
    console.log('User connected!');
    socket.on('change-env', (environment: unknown) => {
      io.emit('update-env', environment);
    });
    socket.on('change-testing-group', (testingGroup: unknown) => {
      io.emit('update-testing-group', testingGroup);
    });
  });
};

main();
