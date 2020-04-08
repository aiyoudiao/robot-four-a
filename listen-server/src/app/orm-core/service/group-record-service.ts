/*
 * @Descripttion: 群消息记录的业务逻辑代码
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-25 17:56:24
 * @LastEditTime: 2020-03-25 23:11:40
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\service\group-record-service.ts
 */
import { getManager } from 'typeorm';
import BotMessage from '@orm/entity/bot-message';

export class GroupRecordService {
  static async getTable() {
    const botMessageRepository = getManager().getRepository(BotMessage);
    const result = await botMessageRepository.find({
      skip: 0,
      take: 100,
    });

    return result;
  }
  static async searchByFormData() {
    // ...
  }
}
