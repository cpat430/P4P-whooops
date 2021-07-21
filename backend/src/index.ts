import dotenv from "dotenv";
import express from "express";
import { connectCloudDB } from "./db";

dotenv.config();
const port = process.env.PORT || 4000;

const main = () => {
  const app = express();
  app.use(express.json());

  connectCloudDB()
    .then(() => {
      console.log("Connected to MongoDB ☁️");
    })
    .catch((e) => {
      console.error("Error connecting to MongoDB ☁️");
    });

  app.listen(port, () => {
    console.log(`App server listening on port ${port}!`);
  });
};

main();
