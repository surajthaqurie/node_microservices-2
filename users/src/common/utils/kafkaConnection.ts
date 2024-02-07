import { Consumer, Kafka, Producer } from "kafkajs";

export class KafkaConfig {
  private brokers: string[];
  private producer: Producer;
  private consumer: Consumer;

  constructor(groupId: string) {
    this.brokers = ["localhost:29092", "localhost:39093", "localhost:49094"]; // Update with your Kafka broker addresses

    const kafka = new Kafka({
      clientId: "userService",
      brokers: this.brokers,
    });

    // Create a producer instance
    this.producer = kafka.producer();

    // Create a consumer instance with the specified group ID
    this.consumer = kafka.consumer({ groupId });
  }

  async connect(): Promise<void> {
    // Connect both producer and consumer to Kafka brokers
    await Promise.all([this.producer.connect(), this.consumer.connect()]);
  }

  async produce(topic: string, messages: { key: string; value: string }[]): Promise<void> {
    // Produce messages to a specific Kafka topic
    await this.producer.send({
      topic,
      messages: messages.map((value) => ({ value: JSON.stringify(value) })),
    });
  }

  async consume(topic: string): Promise<void> {
    // Subscribe the consumer to a Kafka topic
    await this.consumer.subscribe({ topic });

    // Start consuming messages
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        console.log(`Received message: ${message.value}`);
        // Implement your logic to process the incoming message
      },
    });
  }

  async disconnect(): Promise<void> {
    // Disconnect both producer and consumer from Kafka brokers
    await Promise.all([this.producer.disconnect(), this.consumer.disconnect()]);
  }
}
