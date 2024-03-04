import { Message } from "kafkajs";
import { TOPICS } from "../enums";

export interface IKafkaBaseProducer {
  topic: TOPICS;
  messages: Message[];
}

export interface IKafkaBaseConsumer {
  topic: TOPICS;
  messages: Message[];
}
