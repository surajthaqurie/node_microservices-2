import { env } from "src/configs";
import { createLogger, format, transports } from "winston";

// winston-daily-rotate-file

const errorFilter = format((info, opts) => (info.level === "error" ? info : false));
const infoFilter = format((info, opts) => (info.level === "info" ? info : false));

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  exitOnError: false,
  defaultMeta: {
    service: env.appConfig.APP_NAME,
  },
  format: format.combine(
    // format.label({ label: env.appConfig.APP_NAME }),
    // format.errors({ stack: true }),
    format.timestamp(),
    format.ms(),
    format.json()
    // format.logstash() // not print the res.json
    // format.splat(),
    // format.simple(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      level: "info",
      filename: "logs/info.log",
      format: format.combine(infoFilter()),
    }),
    new transports.File({
      level: "error",
      filename: "logs/error.log",
      format: format.combine(errorFilter()),
    }),
  ],
  exceptionHandlers: [new transports.File({ filename: "logs/exception.log" })],
  rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
});

// https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
// https://betterstack.com/community/guides/logging/nodejs-logging-best-practices/
