/*
 * @Descripttion: bot 控制器
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 11:15:46
 * @LastEditTime: 2020-04-05 16:05:24
 * @LastEditors: aiyoudiao
 * @FilePath: \project\store-server\src\app\orm-core\controller\index\index.ts
 */

// import { Wechaty } from 'wechaty'; // Wechaty核心包
// import { PuppetPadplus } from 'wechaty-puppet-padplus'; // padplus协议包

// // 配置文件
// import { Token, BotName } from '@config/option';

// import { scan } from './scan-login-controller'; // 机器人需要扫描二维码时监听回调
// import { message } from './message-listen-controller'; // 消息监听回调
// import { login } from './login-listen-controller'; // 用户登录的监听回调

import { BotFriendService } from '@orm/service/bot-friend-service';
import { BotFriend } from '@orm/entity/bot-friend';
import { mqsender as MQSender, mqreceiver as MQRecevier } from '@common/MQ';



export async function start(ctx) {

  try {

    const recevie = MQRecevier.get<BotFriend>(
      {
        exchange: 'BotFriendExchange',
        exchangeType: 'direct',
        routeKey: 'BotFriendQueue',
        queueName: 'BotFriendQueue',
      }
    )
    await recevie(async (botFriend: BotFriend) => {
      let result = true;
      try {
        console.info(`botFriend`, JSON.stringify(botFriend))
         result = await BotFriendService.insertFriendInfo(botFriend);
        
      } catch (error) {
        result = false;
      }


      return result;
    });

  } catch (error) {
    console.info("错误信息：",error);
    return false;
  }

  ctx.body = '消息监听服务已经启动';
}
