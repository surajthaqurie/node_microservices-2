import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import appRouter from "./src/routes";
import { DbConnection } from "./src/common/utils";
import { errorHandler } from "@node_helper/error-handler";
// import { AuthConsumer } from "src/modules/auth";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoute();
    this.dbConnector();
    this.kafkaConsumer();
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

  private async kafkaConsumer() {
    try {
      // new AuthConsumer("USER_UPDATE");
      // new AuthConsumer("USER_ENABLE_DISABLE");
      // new AuthConsumer("USER_DELETE");
    } catch (error) {
      console.error("consumed error:", error);
    }
  }
}

const app = new App().app;
app.use(errorHandler);

export default app;
