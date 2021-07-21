import mongoose from "mongoose";
import dotenv from "dotenv";

const database = "database";
const connectDB = async (uri: string) => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const connectCloudDB = async () => {
  dotenv.config();

  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;

  if (!username || !password) {
    throw new Error("No MongoDB credentials");
  }

  const uri = `mongodb+srv://${username}:${password}@cluster0.i0czg.mongodb.net/${database}?retryWrites=true&w=majority`;

  await connectDB(uri);
};

export const connectLocalDB = async () => {
  const uri = `mongodb://localhost:27017/${database}`;
  await connectDB(uri);
};

export const disconnectCloudDB = async () => {
  mongoose.connection.close();
};
