import path from "path";
require( "dotenv" ).config({ path: path.resolve(__dirname + "/../../.env" )});
import mongoose from "mongoose";
import key from "./key";
import { Logger } from "./error-log";

const db_url = key.PROD_DB;
  


const connect = () => mongoose.createConnection(`mongodb+srv://nca:vWmixZSiOoUO7R8C@testdb.i7efc.mongodb.net/test`);
const connectToMongoDB = () => {
  mongoose.Promise = global.Promise;
  // const db = mongoose.connect(`mongodb+srv://nca:vWmixZSiOoUO7R8C@testdb.i7efc.mongodb.net/test`, (err) => {
  //   if (err) {
  //     Logger.error(`Failed to connect to database. Error: ${err.message}`);
  //   } else {
  //     Logger.info(`Connection to database established`);
  //   }
  // });

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
