import { env } from "src/configs";
import { createLogger, format, transports } from "winston";

// winston-daily-rotate-file
// Morgan

const errorFilter = format((log, opts) => (log.level === "error" ? log : false));
const infoFilter = format((log, opts) => (log.level === "log" ? log : false));

const logger = createLogger({
  level: env.appConfig.NODE_ENV === "development" ? "debug" : "info",
  format: format.combine(format.timestamp(), format.ms(), format.errors({ stack: true }), format.json()),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize({ all: true })),
    }),
    new transports.File({
      level: "info",
      filename: "../logs/info.log",
      format: format.combine(infoFilter()),
    }),
    new transports.File({
      level: "error",
      filename: "../logs/error.log",
      // handleExceptions: true,
      // handleRejections: true,
      format: format.combine(errorFilter()),
    }),
  ],
  exitOnError: false,
  exceptionHandlers: [new transports.File({ filename: "../logs/exception.log" })],
  rejectionHandlers: [new transports.File({ filename: "../logs/rejections.log" })],
});

export { logger };

// https://sematext.com/blog/node-js-logging/
