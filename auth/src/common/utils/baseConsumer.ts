import { KafkaConnect } from "./kafkaConnection";

enum KAFKA_TOPIC {
  USER_UPDATE = "user:update",
  USER_ENABLE_DISABLE = "user:enable_disable",
  USER_DELETE = "user:delete",
}

export abstract class BaseConsumer<T extends { topic: KAFKA_TOPIC; value: string }> {
  abstract topic: T["topic"];
  abstract groupId: string;
  abstract clientId: string;

  abstract callback(value: string | undefined): void;

  async consume() {
    try {
      const kafka = new KafkaConnect(this.clientId).getKafka();
      const consumer = kafka.consumer({ groupId: this.groupId });

      await consumer.connect();
      await consumer.subscribe({ topic: this.topic, fromBeginning: true });

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value?.toString();
          console.log("Kafka consumer called by ::::: " + topic);
          this.callback(value);
        },
      });
    } catch (error) {
      console.log("Error on kafka Consumer", error);
    }
  }
}
