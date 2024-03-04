import { AuthService } from "./auth.service";
import { BaseConsumer } from "src/utils/baseConsumer";
import { IAuthUpdatePayload } from "src/common/interface";
import { Kafka } from "kafkajs";
import { KAFKA_TOPIC } from "src/common/enum";

export class AuthUpdateConsumer extends BaseConsumer<{ data: IAuthUpdatePayload }> {
  groupId: string = "AuthUserUpdateGroup";
  topic = KAFKA_TOPIC.USER_UPDATE;
  authService: AuthService;

  constructor(kafkaClient: Kafka) {
    super(kafkaClient);
    this.authService = new AuthService();
  }

  async callback(value: IAuthUpdatePayload) {
    await this.authService.updateUser(value);
  }
}

export class AuthEnableDisableConsumer extends BaseConsumer<{ data: string }> {
  groupId: string = "AuthUserEnableDisableGroup";
  topic = KAFKA_TOPIC.USER_ENABLE_DISABLE;
  authService: AuthService;

  constructor(kafkaClient: Kafka) {
    super(kafkaClient);
    this.authService = new AuthService();
  }

  async callback(value: string) {
    await this.authService.enableDisableUser(value);
  }
}

export class AuthDeleteConsumer extends BaseConsumer<{ data: string }> {
  groupId: string = "AuthUserDeleteGroup";
  topic = KAFKA_TOPIC.USER_DELETE;
  authService: AuthService;

  constructor(kafkaClient: Kafka) {
    super(kafkaClient);
    this.authService = new AuthService();
  }

  async callback(value: string): Promise<void> {
    await this.authService.deleteUser(value);
  }
}
