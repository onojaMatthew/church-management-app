import path from "path";
require( "dotenv" ).config({ path: path.resolve(__dirname + "/../../.env" )});
import mongoose from "mongoose";
import winston from "winston";
import key from "../config/key";

let db_url;
const env = process.env.NODE_ENV || 'development';
console.log('here', env);

if ( env === "development" || env === "test" ) {
  db_url = `mongodb+srv://${key.dev_db_user}:${key.dev_db_password}@${key.dev_db_host}/${key.dev_db_name}`;
  //db_url = db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?ssl=true&authSource=admin&replicaSet=prodcluster-shard-0`;
  //db_url = key.test_db_url
} else {
  db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?ssl=true&authSource=admin&replicaSet=prodcluster-shard-0`;
}

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect( db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 5,
    socketTimeoutMS: 45000,
  } )
    .then( () => {
      winston.info("Connection to database established");
    } )
    .catch( err => {
      winston.error(`Connection failed. ${ err.message }`);
    } );
  
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
}