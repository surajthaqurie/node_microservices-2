import { KafkaConfig } from "src/common/utils";
import { UserService } from "../user.service";

export class UserRegisterConsumer {
  private topic = "USER_CREATE";

  constructor(kafka: KafkaConfig) {
    kafka.consume(this.topic, this.consume);
  }

  async consume(value: string) {
    await new UserService().registerUser(JSON.parse(value));
  }
}
