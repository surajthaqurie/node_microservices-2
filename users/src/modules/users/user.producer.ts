import mongoose from "mongoose";
import { KafkaConfig } from "src/common/utils";

export class UserProducer {
  kafka: KafkaConfig;

  constructor() {
    this.kafka = new KafkaConfig("UserServiceGroup");
  }

  updateUserProducer(value: { id: mongoose.Types.ObjectId; email: string; username: string }) {
    const topic = "USER_UPDATE";
    const messages = [{ key: topic, value: JSON.stringify(value) }];

    this.kafka.produce(topic, messages);
  }

  enableUserProducer(value: { id: string }) {
    const topic = "USER_ENABLE_DISABLE";
    const messages = [{ key: topic, value: JSON.stringify(value) }];

    this.kafka.produce(topic, messages);
  }

  deleteUserProducer(value: { id: string }) {
    const topic = "USER_DELETE";
    const messages = [{ key: topic, value: JSON.stringify(value) }];

    this.kafka.produce(topic, messages);
  }
}
