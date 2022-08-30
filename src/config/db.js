import path from "path";
require( "dotenv" ).config({ path: path.resolve(__dirname + "/../../.env" )});
import mongoose from "mongoose";
import winston from "winston";
import key from "./key";

const db_url = key.PROD_DB;
  
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
};

const connect = () => mongoose.createConnection(db_url, mongoOptions);
const connectToMongoDB = () => {
  const db = connect("mongodb+srv://ticket:kq1IL4UHiz8l4qN6@ticket.6z9ee.mongodb.net/nca");
  db.on("open", () => {
    winston.info(`Connection to database established with ${JSON.stringify(db_url)}`);
  })
  db.on("error", (err) => {
    winston.error(`Failed to connect to database. Error: ${err.message}`);
  })
  
  return db;
};

export const mongodb = (connectToMongoDB)();
