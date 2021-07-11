import winston from "winston";
import key from "./key";
require('winston-mongodb');

let db_url;
const env = process.env.NODE_ENV || 'development';
if ( env === "development" || env === 'test' ) {
  db_url = `mongodb+srv://${key.db_user}:${key.db_password}@${key.db_host}/${key.db_name}?ssl=true&authSource=admin&replicaSet=prodcluster-shard-0`;
} else {
  db_url = `mongodb+srv://${key.db_user}:${key.db_password}@${key.db_host}/${key.db_name}?ssl=true&authSource=admin&replicaSet=prodcluster-shard-0`;
}

export default () => {
  winston.handleExceptions(
    new winston.transports.File( { filename: 'uncaughtException.log' } ),
    new winston.transports.Console( { colorize: true, prettyPrint: true } )
  )

  process.on( 'unhandledRejection', ( ex ) => {
    throw ex;
  } );

  winston.add( winston.transports.File, { filename: 'logFile.log' } );
  winston.add( winston.transports.MongoDB, {
    db: db_url,
    level: 'info'
  } );
}