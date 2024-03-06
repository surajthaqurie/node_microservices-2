import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import appRouter from "./src/routes";
import { DbConnection, kafkaClient, logger } from "./src/utils";
import { errorHandler } from "@node_helper/error-handler";
import { AuthDeleteConsumer, AuthEnableDisableConsumer, AuthUpdateConsumer } from "src/modules/auth";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoute();
    this.dbConnector();
    // this.kafkaConsumer();
  }

  private configureMiddlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.set("rateLimit", 100);

    this.app.use(helmet());
    this.app.use("/public", express.static(path.join(__dirname, "public")));

    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: false }));
  }

  private configureRoute(): void {
    this.app.use("/api/v1", appRouter);
  }

  private dbConnector(): void {
    new DbConnection().connect();
  }

  // @ts-ignore
  private async kafkaConsumer() {
    try {
      new AuthUpdateConsumer(kafkaClient).consume();
      new AuthEnableDisableConsumer(kafkaClient).consume();
      new AuthDeleteConsumer(kafkaClient).consume();
    } catch (error) {
      console.error("consumed error:", error);
    }
  }
}

/* Logger */
logger.info("Info message");
logger.error("Error message");
logger.warn("Warning message");

const childLogger = logger.child({ requestId: "f9ed4675f1c53513c61a3b3b4e25b4c0" });

childLogger.info("Info message");
childLogger.info("Error message");
childLogger.info("File uploaded successfully", {
  file: "something.png",
  type: "image/png",
  userId: "jdn33d8h2",
});

logger.error(new Error("an error"));
// throw new Error("An uncaught error"); exception error

/* Logger */

const app = new App().app;
app.use(errorHandler);

export default app;
