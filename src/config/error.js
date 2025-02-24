import { Logger } from "./error-log";

export default ( err, req, res, next ) => {
  Logger.error( err.message, err );

  res.status( 500 ).json( err.message );
}