import dotenv from 'dotenv';
import express from 'express';
import { connectCloudDB } from './db';

dotenv.config();
const port = process.env.PORT || 4000;

const main = () => {
  const app = express();
  app.use(express.json());

  connectCloudDB()
    .then(() => {
      console.log('📄 Connected to MongoDB');
    })
    .catch((e) => {
      console.error(e.message);
    });

  app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}!`);
  });
};

main();
