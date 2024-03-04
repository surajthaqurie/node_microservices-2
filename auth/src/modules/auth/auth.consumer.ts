import { AuthService } from "./auth.service";
import { BaseConsumer } from "src/common/utils/baseConsumer";
import { IUpdatePayload } from "src/common/interface";
import { Kafka } from "kafkajs";
import { KAFKA_TOPIC } from "src/common/enum";

export class AuthUpdateConsumer extends BaseConsumer<{ data: IUpdatePayload }> {
  groupId: string = "AuthUserUpdateGroup";
  topic = KAFKA_TOPIC.USER_UPDATE;
  authService: AuthService;

  constructor(kafkaClient: Kafka) {
    super(kafkaClient);
    this.authService = new AuthService();
  }

  async callback(value: IUpdatePayload) {
    console.log("test");

    await this.authService.updateUser(value);
  }
}

export class AuthEnableDisableConsumer extends BaseConsumer<{ data: IUpdatePayload }> {
  groupId: string = "AuthUserEnableDisableGroup";
  topic = KAFKA_TOPIC.USER_ENABLE_DISABLE;
  authService: AuthService;

  constructor(kafkaClient: Kafka) {
    super(kafkaClient);
    this.authService = new AuthService();
  }

  async callback(value: IUpdatePayload) {
    await this.authService.updateUser(value);
  }
}

export class AuthDeleteConsumer extends BaseConsumer<{ data: any }> {
  groupId: string = "AuthUserDeleteGroup";
  topic = KAFKA_TOPIC.USER_DELETE;
  authService: AuthService;

  constructor(kafkaClient: Kafka) {
    super(kafkaClient);
    this.authService = new AuthService();
  }

  async callback(value: string): Promise<void> {
    console.log("🚀 ~ deleteUserConsumer ~ callback ~ value:", value);
    await this.authService.deleteUser(value);
  }
}
