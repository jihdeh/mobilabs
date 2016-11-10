import winston from "winston";
import "winston-mongodb";
import mongoConnectionString from "./mongo-connection-string";

const logLevel = process.env.LOGLEVEL || "debug";
const dbLogLevel = process.env.DB_LOG_LEVEL || "error";

const logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			level: logLevel
		}),
		new winston.transports.MongoDB({
			level: dbLogLevel,
			db: mongoConnectionString,
			capped: true,
			storeHost: true
		})
	]
});

export default logger;
