import { Consumer, Kafka, Message, Partitioners, Producer } from "kafkajs";
import { env } from "src/configs";

export class KafkaConfig {
  private producer: Producer;
  private consumer: Consumer;

  constructor(groupId: string) {
    const kafka = new Kafka({
      clientId: "auth-client",
      brokers: env.kafkaConfig.KAFKA_BROKER_ID.split(","),
      requestTimeout: 3000, // Increase the timeout value (in milliseconds)
      retry: {
        initialRetryTime: 100, // Initial retry delay (in milliseconds)
        retries: 10, // Maximum number of retries
      },
    });

    this.producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    this.consumer = kafka.consumer({ groupId });
  }

  async produce(topic: string, messages: Message[]) {
    try {
      await this.producer.connect();

      await this.producer.send({ topic, messages });
      console.log("Kafka producer called by ::::: " + topic);
    } catch (error) {
      console.log("Error on kafka producer", error);
    } finally {
      await this.producer.disconnect();
    }
  }

  async consume(topic: string, callback: Function) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic, fromBeginning: true });

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value?.toString();
          console.log("Kafka consumer called by ::::: " + topic);
          callback(value);
        },
      });
    } catch (error) {
      console.log("Error on kafka Consumer", error);
    }
    /*  finally {
      await this.consumer.disconnect();
    } 
    */
  }
}
