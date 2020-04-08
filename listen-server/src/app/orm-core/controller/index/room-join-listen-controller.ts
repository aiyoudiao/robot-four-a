/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-10 09:07:53
 * @LastEditTime: 2020-03-10 11:21:56
 * @LastEditors: aiyoudiao
 * @FilePath: \web-end\my-robot\src\app\core\controller\bot\room-join-listen-controller.ts
 */

// 配置文件
import config from '@config/option';
// 加入房间回复
const roomJoinReply = config.room.roomJoinReply;
// 管理群组列表
const roomList = config.room.roomList;

// 进入房间监听回调 room-群聊 inviteeList-受邀者名单 inviter-邀请者
export async function roomJoin(room, inviteeList, inviter) {
  // 判断配置项群组id数组中是否存在该群聊id
  if (Object.values(roomList).some(v => v === room.id)) {
    // let roomTopic = await room.topic()
    inviteeList.map(c => {
      // 发送消息并@
      room.say(roomJoinReply, c);
    });
  }
}
