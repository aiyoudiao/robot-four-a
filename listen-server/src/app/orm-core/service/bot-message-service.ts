/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-12 10:58:30
 * @LastEditTime: 2020-03-25 23:11:23
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\service\bot-message-service.ts
 */

import { getManager } from 'typeorm';
import BotMessage from '@orm/entity/bot-message';

export class BotMessageService {
  static async insertMessage(message: BotMessage) {
    const botMessageRepository = getManager().getRepository(BotMessage);
    const newbotMessage = botMessageRepository.create(message);

    await botMessageRepository.save(newbotMessage);

    return 'insert message success!!!';
  }
}
