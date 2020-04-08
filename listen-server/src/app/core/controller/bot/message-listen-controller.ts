/*
 * @Descripttion:消息监听
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 07:12:41
 * @LastEditTime: 2020-03-13 12:03:48
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\core\controller\bot\message-listen-controller.ts
 */
import { Message } from 'wechaty';
// node-request请求模块包
import request from 'request';
// 请求参数解码
import urlencode from 'urlencode';
// 配置文件
import config from '@config/option';


// #region 操作数据库 Code Module

import { userBll } from '@bll/v1';
// import { apiServerInstance } from '../../../services';
// import { common } from '@lib';
import {
  UserDbModel,
  // UserGetQueryReqModel,
  UserPostJsonReqModel,
  // UserDeletePathReqModel,
  // UserByNameGetPathReqModel,
  UserResModel,
  // UserDeleteResModel,
  // UserPutJsonReqModel,
  // UserUpdateResModel
} from '@model/v1';

async function insertMessage(data) {
   // 获取客户端参数
   const param: UserPostJsonReqModel = {
    user_name: null,
    age: null,
    hobby: data
  };


  // 将数据插入数据库
  const model: UserDbModel = param;
  const insertResult = await userBll.insert(model);

  // 响应数据
  model.user_id = insertResult.insertId;
  const resModel: UserResModel = userBll.formatDb(model);
  console.log(JSON.stringify(resModel));
}

let messageList = [];
function recordAndOutput(messageInfo, isOk = false) {
  messageList.push(messageInfo);
  console.log(messageInfo);
  if (isOk) {
    const result = messageList.join('\r\n');
    messageList = [];
    return encodeURIComponent(`${result}`);
  }
}


// #endregion 操作数据库 Code Module End

// -----------------------------------------分隔符--------------------------------------------


// 机器人名字
const name = config.name;
// 管理群组列表
const roomList = config.room.roomList;

// 消息监听回调
export function message(bot) {
  return async function (msg) {
    // 判断消息来自自己，直接return
    if (msg.self()) return;

    recordAndOutput('=============================');
    recordAndOutput(`msg : ${msg}`);
    recordAndOutput(
      `from: ${msg.from() ? msg.from().name() : null}: ${
        msg.from() ? msg.from().id : null
      }`
    );
    recordAndOutput(`to: ${msg.to()}`);
    recordAndOutput(`text: ${msg.text()}`);
    recordAndOutput(`isRoom: ${msg.room()}`);
    recordAndOutput('=============================');

    // 判断此消息类型是否为文本
    if (msg.type() === Message.Type.Text) {
      // 判断消息类型来自群聊
      if (msg.room()) {
        // 获取群聊
        const room = await msg.room();

        // 收到消息，提到自己
        if (await msg.mentionSelf()) {
          // 获取提到自己的名字
          let self = await msg.to();
          self = `@${self.name()}`;
          // 获取消息内容，拿到整个消息文本，去掉 @+名字
          const sendText = msg.text().replace(self, '');

          // 请求机器人接口回复
          const res = await requestRobot(sendText);

          // 返回消息，并@来自人
          room.say(res, msg.from());
        }

        // 收到消息，没有提到自己  忽略
      } else {
        // 回复信息是关键字 “加群”
        if (await isAddRoom(msg)) return;

        // 回复信息是所管理的群聊名
        if (await isRoomName(bot, msg)) return;

        // 请求机器人聊天接口
        const res = await requestRobot(msg.text());
        // 返回聊天接口内容
        await msg.say(res);
      }
    } else {
      recordAndOutput('消息不是文本！');
    }
    const result = recordAndOutput('', true);
    insertMessage(result);
  };
}

/**
 * @description 回复信息是关键字 “加群” 处理函数
 * @param {Object} msg 消息对象
 * @return {Promise} true-是 false-不是
 */
async function isAddRoom(msg) {
  // 关键字 加群 处理
  if (msg.text() === '加群') {
    const roomListName = Object.keys(roomList);
    let info = `${name}当前管理群聊有${roomListName.length}个，回复群聊名即可加入哦\n\n`;
    roomListName.forEach(v => {
      info += `【${v}】` + '\n';
    });
    msg.say(info);
    return true;
  }
  return false;
}

/**
 * @description 回复信息是所管理的群聊名 处理函数
 * @param {Object} bot 实例对象
 * @param {Object} msg 消息对象
 * @return {Promise} true-是群聊 false-不是群聊
 */
async function isRoomName(bot, msg) {
  // 回复信息为管理的群聊名
  if (Object.keys(roomList).some(v => v === msg.text())) {
    // 通过群聊id获取到该群聊实例
    const room = await bot.Room.find({ id: roomList[msg.text()] });

    // 判断是否在房间中 在-提示并结束
    if (await room.has(msg.from())) {
      await msg.say('您已经在房间中了');
      return true;
    }

    // 发送群邀请
    await room.add(msg.from());
    await msg.say('已发送群邀请');
    return true;
  }
  return false;
}

/**
 * @description 机器人请求接口 处理函数
 * @param {String} info 发送文字
 * @return {Promise} 相应内容
 */
function requestRobot(info) {
  return new Promise((resolve, reject) => {
    const url = `https://open.drea.cc/bbsapi/chat/get?keyWord=${urlencode(info)}`;
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const res = JSON.parse(body);
        if (res.isSuccess) {
          let send = res.data.reply;
          // 免费的接口，所以需要把机器人名字替换成为自己设置的机器人名字
          send = send.replace(/Smile/g, name);
          resolve(send);
        } else if (res.code === 1010) {
            resolve('没事别老艾特我，我还以为爱情来了');
          } else {
            resolve('你在说什么，我听不懂');
          }
      } else {
        resolve('你在说什么，我脑子有点短路诶！');
      }
    });
  });
}
