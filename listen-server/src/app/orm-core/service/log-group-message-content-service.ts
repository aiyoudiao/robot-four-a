/*
 * @Descripttion: 微信群聊天记录表
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-12 10:58:30
 * @LastEditTime: 2020-04-05 13:11:40
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\app\orm-core\service\log-group-message-content-service.ts
 */

import { getManager } from 'typeorm';
import { LogGroupMessageContent } from '@orm/entity/LogGroupMessageContent';
import { mqsender as MQSender, mqreceiver as MQRecevier } from '@common/MQ';

export class LogGroupMessageContentService {
  // static async insertMessage(message: LogGroupMessageContent) {
  //   const LogGroupMessageContentRepository = getManager().getRepository(LogGroupMessageContent);
  //   const newLogGroupMessageContent = LogGroupMessageContentRepository.create(message);

  //   await LogGroupMessageContentRepository.save(newLogGroupMessageContent);

  //   return 'insert message success!!!';
  // }

  // static async selectMessage() {
  //   const LogGroupMessageContentRepository = getManager().getRepository(LogGroupMessageContent);
  //   const result = await LogGroupMessageContentRepository.find({
  //     skip: 0,
  //     take: 100,
  //   });

  //   return result;
  // }

  static async insertMessageToQueue(logGroupMessageContent: LogGroupMessageContent) {
    const send = MQSender.get<LogGroupMessageContent>(
      {
        exchange: 'LogGroupMessageContentExchange',
        exchangeType: 'direct',
        routeKey: 'LogGroupMessageContentQueue',
        queueName: 'LogGroupMessageContentQueue',
      }
    )
    await send(logGroupMessageContent);

    return 'insert message to queue success!!!';
  }

  static async selectMessageByQueue(hoos) {
    const receive = MQRecevier.get<LogGroupMessageContent>(
      {
        exchange: 'LogGroupMessageContentExchange',
        exchangeType: 'direct',
        routeKey: 'LogGroupMessageContentQueue',
        queueName: 'LogGroupMessageContentQueue',
      }
    )
    await receive(message => {
      console.log('实时监听，监听到：', message);
      hoos(message);
    });
  }
}
