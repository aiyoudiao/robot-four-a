/*
 * @Descripttion: 好友信息的业务逻辑
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-30 02:20:17
 * @LastEditTime: 2020-04-05 15:31:58
 * @LastEditors: aiyoudiao
 * @FilePath: \project\store-server\src\app\orm-core\service\bot-friend-service.ts
 */

 import { getManager } from 'typeorm';
 import { BotFriend } from '@orm/entity/bot-friend';

export class BotFriendService {
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
