/*
 * @Descripttion: 好友信息的业务逻辑
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-30 02:20:17
 * @LastEditTime: 2020-04-05 14:32:28
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\app\orm-core\service\bot-friend-service.ts
 */

 import { getManager } from 'typeorm';
import { BotFriend } from '@orm/entity/bot-friend';
import { mqsender as MQSender, mqreceiver as MQRecevier } from '@common/MQ';

export class BotFriendService {

  static async insertBotFriendToQueue(botFriend: BotFriend) {

    try {

      const send = MQSender.get<BotFriend>(
        {
          exchange: 'BotFriendExchange',
          exchangeType: 'direct',
          routeKey: 'BotFriendQueue',
          queueName: 'BotFriendQueue',
        }
      )
      await send(botFriend);

    } catch (error) {
      console.info("错误信息：",error);
      return false;
    }

    return true;
  }


  static async insertFriendInfo(Friend: BotFriend) {
    const botFriendRepository = getManager().getRepository(BotFriend);
    const newbotFriend = botFriendRepository.create(Friend);

    await botFriendRepository.save(newbotFriend);

    return true;
  }

  static async getBotFriendList(date) {
    const botMessageRepository = getManager().getRepository(BotFriend);
    console.log(date);
    const result = await botMessageRepository.find({
      skip: 0,
      take: 100,
    });

    return result;
  }

  static async searchByFormData(bot: BotFriend) {
    // const botMessageRepository = getManager().getRepository(BotFriend);
    // botMessageRepository.findAndCount()
    // ...
  }
}
