import { Consumer, Kafka, Message, Partitioners, Producer } from "kafkajs";

export class KafkaConfig {
  // docker network inspect <network name>
  brokers: string[] = ["172.20.0.3:29092", "172.20.0.4:39093", "172.20.0.5:49094"];
  private producer: Producer;
  private consumer: Consumer;

  constructor(groupId: string) {
    const kafka = new Kafka({
      clientId: "authService",
      brokers: this.brokers,
    });

    this.producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
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
