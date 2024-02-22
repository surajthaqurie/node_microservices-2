import { Consumer, Kafka, Message, Partitioners, Producer } from "kafkajs";

export class KafkaConfig {
  // docker network inspect <network name>
  brokers: string[] = ["localhost:9093"];
  private producer: Producer;
  private consumer: Consumer;

  constructor(groupId: string) {
    const kafka = new Kafka({
      clientId: "node-microservice",
      brokers: this.brokers,
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

      await this.producer.send({
        topic,
        messages,
      });
    } catch (error) {
      console.log(error);
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
          console.log({ value });
          callback(value);
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      await this.consumer.disconnect();
    }
  }
}
