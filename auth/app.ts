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

(async () => {
  const kafkaConfig = new KafkaConfig("AuthService");

  try {
    // Connect to Kafka brokers
    // Produce messages to a Kafka topic
    const topic = "your-topic";
    const messages = [
      { key: "key1", value: "message1" },
      { key: "key2", value: "message2" },
    ];
    await kafkaConfig.produce(topic, messages);
  } finally {
    // Disconnect from Kafka brokers
  }
})();

const app = new App().app;
app.use(errorHandler);

export default app;
