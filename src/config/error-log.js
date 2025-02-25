import winston, { level } from "winston";
import key from "./key";
require('winston-mongodb');

const db_url = `mongodb+srv://${key.DB_USER}:${key.DB_PASSWORD}@${key.DB_HOST}/${key.DB_NAME}`;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
  // logger.add(new winston.transports.MongoDB, {
  //   level: "info",
  //   // db: db_url
  // })
}

export { logger as Logger }

// export default () => {
//   winston.handleExceptions(
//     new winston.transports.File( { filename: 'uncaughtException.log' } ),
//     new winston.transports.Console( { colorize: true, prettyPrint: true } )
//   )

//   process.on( 'unhandledRejection', ( ex ) => {
//     throw ex;
//   } );

//   winston.add( winston.transports.File, { filename: 'logFile.log' } );
//   winston.add( winston.transports.MongoDB, {
//     db: db_url,
//     level: 'info'
//   } );
// }