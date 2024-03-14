import { env } from "src/configs";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Morgan

// TODO: Use this error logger to error handler
// TODO: Use this info logger to success response

export class AppLogger {
  static getLogger = (service: string) => {
    const logger = createLogger({
      level: env.appConfig.NODE_ENV === "development" ? "debug" : "info",
      exitOnError: false,
      defaultMeta: { service: [service] },
      format: format.combine(
        format.timestamp(),
        format.ms(),
        format.errors()
        //format.logstash()
      ),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize({ all: true }), format.simple()),
        }),
        AppLogger.httpTransport(),
        AppLogger.infoTransport(),
        AppLogger.errorTransport(),
      ],
    });

    return logger;
  };

  static httpTransport() {
    const httpFilter = format((info, opts) => (info.level === "http" ? info : false));

    return new DailyRotateFile({
      filename: "../logs/http-%DATE%.log",
      datePattern: "HH-DD-MM-YYYY",
      zippedArchive: true,
      auditFile: "../logs/http-audit.json",
      maxSize: "10m",
      maxFiles: "14d",
      level: "http",
      format: format.combine(httpFilter(), format.timestamp(), format.json()),
    });
  }

  static infoTransport() {
    const infoFilter = format((log, opts) => (log.level === "log" ? log : false));
    return new DailyRotateFile({
      level: "info",
      filename: "../logs/info-%DATE%.log",
      datePattern: "HH-DD-MM-YYYY",
      auditFile: "../logs/info-audit.json",
      zippedArchive: true,
      maxSize: "2m",
      maxFiles: "1d",
      format: format.combine(infoFilter(), format.timestamp(), format.json()),
    });
  }

  static errorTransport() {
    const errorFilter = format((log, opts) => (log.level === "error" ? log : false));
    return new DailyRotateFile({
      level: "error",
      filename: "../logs/error-%DATE%.log",
      datePattern: "HH-DD-MM-YYYY",
      auditFile: "../logs/error-audit.json",
      zippedArchive: true,
      handleExceptions: true,
      handleRejections: true,
      maxSize: "2m",
      maxFiles: "1d",
      format: format.combine(errorFilter(), format.timestamp(), format.json()),
    });
  }
}

export const Logger = AppLogger.getLogger;

// https://sematext.com/blog/node-js-logging/
// https://dev.to/adeyemiadekore2/file-logging-in-nodejs-5e8l
