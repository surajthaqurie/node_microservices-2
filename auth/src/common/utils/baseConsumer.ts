import { Kafka } from "kafkajs";

export enum KAFKA_TOPIC {
  USER_UPDATE = "user:update",
  USER_ENABLE_DISABLE = "user:enable_disable",
  USER_DELETE = "user:delete",
}

export abstract class BaseConsumer<T extends { data: Record<string, any> }> {
  abstract topic: KAFKA_TOPIC;
  abstract groupId: string;
  private readonly kafkaClient: Kafka;

  abstract callback(value: T["data"]): void;

  constructor(kafkaClient: Kafka) {
    this.kafkaClient = kafkaClient;
  }

  async consume() {
    try {
      const consumer = this.kafkaClient.consumer({ groupId: this.groupId });

      await consumer.connect();
      await consumer.subscribe({ topic: this.topic, fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          if (message.value) {
            const value = message.value.toString();
            console.log("Kafka consumer called by ::::: " + topic);
            this.callback(JSON.parse(value));
          }
        },
      });

      console.log("Kafka consumer started");
    } catch (error) {
      console.log("Error on kafka Consumer", error);
    }
  }
}
