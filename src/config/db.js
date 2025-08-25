import path from "path";
require( "dotenv" ).config({ path: path.resolve(__dirname + "/../../.env" )});
import mongoose from "mongoose";
import key from "./key";
import { Logger } from "./error-log";

const db_url = process.env.NODE_ENV === "development" ? key.MONGO_URI : `mongodb+srv://${key.DB_USER}:${key.DB_PASSWORD}@${key.DB_HOST}/${key.DB_NAME}`;

const connect = () => mongoose.createConnection(db_url);
const connectToMongoDB = () => {
  
  mongoose.Promise = global.Promise;
  const db = connect(db_url);
  db.on("open", () => {
    Logger.info(`Connection to database established`);
  })
  db.on("error", (err) => {
    Logger.error(`Failed to connect to database. Error: ${err.message}`);
  })
  
  return db;
};

export const mongodb = (connectToMongoDB)();
