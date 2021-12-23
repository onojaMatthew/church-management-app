import winston from "winston";
import key from "./key";
require('winston-mongodb');

const db_url = key.PROD_DB;

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