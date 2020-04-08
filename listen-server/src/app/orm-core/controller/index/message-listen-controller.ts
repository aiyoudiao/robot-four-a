/*
 * @Descripttion:消息监听
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 07:12:41
 * @LastEditTime: 2020-03-30 13:07:19
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\controller\index\message-listen-controller.ts
 */
import { Message } from 'wechaty';
// node-request请求模块包
import request from 'request';
// 请求参数解码
import urlencode from 'urlencode';
// 配置文件
import config from '@config/option';

import { LogGroupMessageContentService } from '@orm/service/log-group-message-content-service';
import { LogGroupMessageContent } from '@orm/entity/LogGroupMessageContent';

// 机器人名字
const name = config.name;
// 管理群组列表
const roomList = config.room.roomList;

type myMessage = { id: '2818463857095698405',
timestamp: 1585541537.007,
type: 7,
fromId: 'send_wx',
mentionIdList: [],
roomId: 'xxxx@chatroom',
text: '测试',
  toId: 'receive_wx'
}

// 消息监听回调
export function message(bot) {
  return async function (msg: Message) {
    // 判断消息来自自己，直接return
    // if (msg.self()) return;

    const myMessageMeta = Reflect.get(msg, 'payload') as myMessage;

    if (!myMessageMeta.roomId) {
      /* 非群聊消息，暂时不接收 */
      return;
    }

    const messageId = myMessageMeta.id;
    const groupId = myMessageMeta.roomId;
    const groupName = await msg.room().topic();
    const senderId = myMessageMeta.fromId;
    const senderName = msg.from() ? msg.from().name() : null;
    const messageType = Message.Type[myMessageMeta.type];
    const messageContext = myMessageMeta.text;
    const messageDelayTime = msg.age();
    const messageSendTime = msg.date();
    const messageSaveTime = new Date();

    const logGroupMessageContent: LogGroupMessageContent = {
      messageId,
      groupId,
      groupName,
      senderId,
      senderName,
      messageType,
      messageContext,
      messageDelayTime,
      messageSendTime,
      messageSaveTime,
    };

    console.log(`logGroupMessageContent===>${logGroupMessageContent}`, logGroupMessageContent);

    // const info = await LogGroupMessageContentService.insertMessage(logGroupMessageContent);
    const info = await LogGroupMessageContentService.insertMessageToQueue(logGroupMessageContent);
    console.log('插入数据', info);
  };
}
