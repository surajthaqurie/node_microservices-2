import { KafkaConfig } from "src/common/utils";

export class AuthProducer {
  kafka: KafkaConfig;

  constructor() {
    this.kafka = new KafkaConfig("AuthServiceGroup");
  }

  registerProducer(value: { _id: string; firstName: string; lastName: string; email: string; username: string; address: string }) {
    const topic = "USER_CREATE";
    const messages = [{ key: topic, value: JSON.stringify(value) }];

    this.kafka.produce(topic, messages);
  }
}
