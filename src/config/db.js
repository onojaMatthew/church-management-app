import path from "path";
require( "dotenv" ).config({ path: path.resolve(__dirname + "/../../.env" )});
import mongoose from "mongoose";
import winston from "winston";
import key from "../config/key";

let db_url;
const env = process.env.NODE_ENV || 'development';

if ( env === "development") {
  db_url = `mongodb+srv://${key.dev_db_user}:${key.dev_db_password}@${key.dev_db_host}/${key.prod_db_name}`;
  // db_url = `mongodb+srv://${key.dev_db_user}:${key.dev_db_password}@${key.dev_db_host}/${key.dev_db_name}`;
} else if (env === "test") {
  db_url = `mongodb+srv://${key.test_db_user}:${key.test_db_password}@${key.test_db_host}/${key.test_db_name}`;
} else {
  db_url = `mongodb+srv://${key.dev_db_user}:${key.dev_db_password}@${key.dev_db_host}/${key.prod_db_name}`;
}
// mongodb+srv://ticket:kq1IL4UHiz8l4qN6@ticket.6z9ee.mongodb.net/church

const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

const connect = () => mongoose.createConnection(db_url, mongoOptions);

const connectToMongoDB = () => {
  const db = connect(db_url);
  db.on('open', () => {
    winston.info(`Mongoose connection open to ${JSON.stringify(db_url)}`);
  });
  db.on('error', (err) => {
    winston.error(`Mongoose connection error: ${err} with connection info ${JSON.stringify(db_url)}`);
    process.exit(0);
  });
  return db;
};

export const mongodb = (connectToMongoDB)();

  // mongoose.Promise = global.Promise;
  // mongoose.connect( db_url, mongoOptions)
  //   .then( () => {
  //     winston.info("Connection to database established");
  //   } )
  //   .catch( err => {
  //     winston.error(`Connection failed. ${ err.message }`);
  //   } );
