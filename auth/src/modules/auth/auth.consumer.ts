import { KafkaConfig } from "src/common/utils";
import { AuthService } from "./auth.service";

export class AuthConsumer {
  private kafka: KafkaConfig;
  authService = new AuthService();

  constructor(topic: string) {
    this.kafka = new KafkaConfig("AuthServiceGroup");

    this.kafka.consume(topic, this.UpdateUserConsumer);
    this.kafka.consume(topic, this.enableDisableConsumer);
  }

  async UpdateUserConsumer(value: string) {
    await this.authService.updateUser(JSON.parse(value));
  }

  async enableDisableConsumer(value: string) {
    await this.authService.enableDisableUser(JSON.parse(value));
  }

  async deleteUserPConsumer(value: string) {
    await this.authService.deleteUser(JSON.parse(value));
  }
}
