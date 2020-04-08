/*
 * @Descripttion: 机器人好友控制器
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-30 02:18:45
 * @LastEditTime: 2020-04-02 22:42:15
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\controller\bot-friend-controller.ts
 */

import { BotFriendService } from '@orm/service/bot-friend-service';
import { BotFriend } from '@orm/entity/bot-friend';
import { dateFormat } from '@common/utils';

export async function getBotFriendList(ctx) {
  const date = process.env.loginDate;
  let botFriend: BotFriend[] = await BotFriendService.getBotFriendList(date);
  botFriend = botFriend.map(friend => {
    friend.date = dateFormat.call(friend.date, 'yyyy-MM-dd HH:mm:ss');
    return friend;
  });

  ctx.body = {
    code: 0,
    data: {
      botFriend: botFriend || {}
    }
  };
}
