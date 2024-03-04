import { Message } from "kafkajs";
import { KAFKA_TOPIC } from "src/common/enum";
import { IAuthRegister } from "src/common/interface";
import { kafkaClient, BaseProducer } from "src/utils";

export class AuthRegisterProducer extends BaseProducer<{ data: Message[] }> {
  topic = KAFKA_TOPIC.USER_CREATE;
  data: Message[];

  constructor(data: IAuthRegister) {
    super(kafkaClient);
    this.data = [{ key: this.topic, value: JSON.stringify(data) }];
  }
}
