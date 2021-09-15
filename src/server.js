import path from "path";
require("dotenv").config({ path: path.resolve(__dirname + "./.env")});
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { mongodb } from "./config/db";
import router from "./middleware/router";
import logger from "./config/error-log";


const port = process.env.PORT || 3200;

const app = express();

mongodb;

app.use(express.static(path.join(__dirname, "/client/build")));

app.use(morgan("combined"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use( ( req, res, next ) => {
  res.header( "Access-Control-Allow-Origin", "*");
  res.header( "Access-Control-Allow-Credentials", true );
  res.header( "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH" );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Auth-Token' );

  next();
} );


app.use((req, res, next) => {
  res.locals.role = null;
  next();
});

app.get( '/', ( req, res ) => {
  res.send({ message: "Welcome to Express API"})
  // res.sendFile( path.join( __dirname + '/client/build/index.html' ) );
} );

router(app);
logger();

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

export default app;