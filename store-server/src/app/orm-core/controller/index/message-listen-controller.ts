/*
 * @Descripttion:消息监听
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 07:12:41
 * @LastEditTime: 2020-03-31 23:32:28
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\controller\index\message-listen-controller.ts
 */
import { Message } from 'wechaty';

import { BotMessageService } from '@orm/service/bot-message-service';
// import BotMessage from '@orm/entity/bot-message';

// 消息监听回调
export function message(bot) {
  return async function (msg) {
    // 判断消息来自自己，直接return
    // if (msg.self()) return;

    console.log('=============================');
    console.log(`msg : ${msg}`);

    const fromName = `${msg.from() ? msg.from().name() : null}`;
    const fromId = `${msg.from() ? msg.from().id : null}`;
    const wexin = `${msg.from() ? msg.from().weixin() : null}`;

    const to = `${msg.to()}`;
    const text = `${msg.text()}`;
    const room = `${msg.room()}`;
    const type = msg.type() === Message.Type.Text ? '消息是文本！' : '消息不是文本！';

    console.log(`from: ${fromName}: ${fromId}`);
    console.log(`from wexin: ${wexin}`);

    console.log(`to: ${to}`);
    console.log(`text: ${text}`);
    console.log(`isRoom: ${room}`);
    console.log('=============================');

    const info = await BotMessageService.insertMessage({
      fromName,
      fromId,
      to,
      text,
      room,
      type,
    });
    console.log('插入数据', info);
  };
}
