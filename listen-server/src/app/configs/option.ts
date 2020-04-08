/*
 * @Descripttion: 配置项
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 07:01:03
 * @LastEditTime: 2020-04-07 18:05:24
 * @LastEditors: aiyoudiao
 * @FilePath: \project\listen-server\src\app\configs\option.ts
 */

const welcomeCN =
  '你好，欢迎你的加入，请自觉遵守群规则，文明交流，最后，请向大家介绍你自己！';
const welcomeEN =
  'Hello, welcome to join, please consciously abide by the group rules, civilized communication, finally, please introduce yourself to everyone！😊';

export default {
  // puppet_padplus Token
  // token: 'puppet_padplus_123456789xxx',

  // 机器人名字
  name: '小可可',
  // 房间/群聊
  room: {
    // 管理群组列表
    roomList: {
      // 群名(用于展示，最好是群名，可随意) : 群id(这个可不能随意)
      Web圈: '*****@chatroom',
      男神群: '*****@chatroom',
    },
    // 加入房间回复
    roomJoinReply: `\n ${welcomeCN} \n\n ${welcomeEN}`,
  },
  // 私人
  personal: {
    // 好友验证自动通过关键字
    addFriendKeywords: ['加群', '前端'],
    // 是否开启加群
    addRoom: true,
  },
};
