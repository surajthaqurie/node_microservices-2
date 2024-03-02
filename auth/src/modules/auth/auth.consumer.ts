import { KafkaConfig } from "src/common/utils";
import { AuthService } from "./auth.service";
import { BaseConsumer, KAFKA_TOPIC } from "src/common/utils/baseConsumer";
import { IUpdatePayload } from "src/common/interface";
import { Kafka } from "kafkajs";

export class AuthConsumer {
  private kafka: KafkaConfig;
  authService = new AuthService();
  topic: string;

  constructor(topic: string) {
    this.kafka = new KafkaConfig("AuthServiceGroup");
    this.topic = topic;
  }

  async UpdateUserConsumer(value: string) {
    this.kafka.consume(this.topic, this.UpdateUserConsumer);
    await this.authService.updateUser(JSON.parse(value));
  }

  async enableDisableConsumer(value: string) {
    this.kafka.consume(this.topic, this.enableDisableConsumer);
    await this.authService.enableDisableUser(JSON.parse(value));
  }

  async deleteUserPConsumer(value: string) {
    await this.authService.deleteUser(JSON.parse(value));
  }
}

export class AuthUpdateConsumer extends BaseConsumer<{ data: IUpdatePayload }> {
  groupId: string = "AuthServiceGroup";
  topic = KAFKA_TOPIC.USER_UPDATE;
  authService: AuthService;

  constructor(kafkaClient: Kafka) {
    super(kafkaClient);
    this.authService = new AuthService();
  }

  async callback(value: IUpdatePayload) {
    await this.authService.updateUser(value);
  }
}

// export class AuthEnableDisbaleConsumer extends BaseConsumer<{ data: IUpdatePayload }> {
//   groupId: string = "AuthServiceGroup";
//   topic = KAFKA_TOPIC.USER_ENABLE_DISABLE;
//   authService: AuthService;

//   constructor(kafkaClient: Kafka) {
//     super(kafkaClient);
//     this.authService = new AuthService();
//   }

//   async callback(value: IUpdatePayload) {
//     await this.authService.updateUser(value);
//   }
// }
