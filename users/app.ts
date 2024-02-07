import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import appRouter from "./src/routes";
import { DbConnection, KafkaConfig } from "./src/common/utils";
import { errorHandler } from "@node_helper/error-handler";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoute();
    this.dbConnector();
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
}

const app = new App().app;
app.use(errorHandler);

(async () => {
  const kafkaConfig = new KafkaConfig("user-service");

  try {
    // Connect to Kafka brokers
    await kafkaConfig.connect();

    // Consume messages from a Kafka topic
    const topic = "your-topic";
    await kafkaConfig.consume(topic);
  } finally {
    // Disconnect from Kafka brokers
    await kafkaConfig.disconnect();
  }
})();

export default app;
