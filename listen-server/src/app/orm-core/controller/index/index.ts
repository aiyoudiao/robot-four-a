/*
 * @Descripttion: bot 控制器
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 11:15:46
 * @LastEditTime: 2020-04-05 13:23:27
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\app\orm-core\controller\index\index.ts
 */

import { Wechaty } from 'wechaty'; // Wechaty核心包
import { PuppetPadplus } from 'wechaty-puppet-padplus'; // padplus协议包

// 配置文件
import config from '@config/option';

import { scan } from './scan-login-controller'; // 机器人需要扫描二维码时监听回调
// import { roomJoin } from './room-join-listen-controller'; // 加入房间监听回调
import { message } from './message-listen-controller'; // 消息监听回调
// import { friendReqeust } from './friend-reqeust-controller'; // 好友添加监听回调
import { login } from './login-listen-controller'; // 用户登录的监听回调

// 初始化
let bot: Wechaty = null;

export async function start(ctx) {
  if (bot === null) {
    bot = new Wechaty({
      puppet: new PuppetPadplus({
        token: config.token,
      }),
      name: config.name,
    });

    bot
      .on('scan', scan) // 机器人需要扫描二维码时监听
      // .on('room-join', roomJoin) // 加入房间监听
            .on('login', login)
      // .on('message', message(bot)) // 消息监听
      // .on('friendship', friendReqeust) // 好友添加监听
      .start();

    ctx.body = '机器人启动成功';
  }

  ctx.body = '机器人已经启动';
}
