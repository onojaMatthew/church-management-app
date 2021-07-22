import winston from "winston";
import { mongodb } from "../config/db";

/**
 * Creating New MongoDb Connection obect by Switching DB
 */
export const getChurchDB = async (churchId, modelName, schema) => {
  try {
    const dbName = `church_${churchId}`;
    let db;
    if (mongodb) {
      // useDb will return new connection
      db = mongodb.useDb(dbName, { useCache: true });
      winston.info(`DB switched to ${dbName}`);
      db.model(modelName, schema);
      return db;
    }
  } catch (err) {
    winston.error(err.message);
  }
};

/**
 * Return Model as per tenant
 */
export const getModelByChurch = async (churchId, modelName, schema) => {
  try {
    winston.info(`getModelByTenant churchId : ${churchId}.`);
    const churchDB = await getChurchDB(churchId, modelName, schema);
    return churchDB.model(modelName);
  } catch (err) {
    winston.error(err.message);
  }
};