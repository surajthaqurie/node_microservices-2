import { KafkaConfig } from "src/common/utils";
import { UserService } from "./user.service";

export class UserConsumer {
  private kafka: KafkaConfig;

  constructor(topic: string) {
    this.kafka = new KafkaConfig("UserServiceGroup");
    this.kafka.consume(topic, this.UserRegisterConsume);
  }

  async UserRegisterConsume(value: string) {
    await new UserService().registerUser(JSON.parse(value));
  }
}
