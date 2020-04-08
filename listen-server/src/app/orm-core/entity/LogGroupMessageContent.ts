/*
 * @Descripttion: 微信群聊天记录表 log_group_message_content
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-30 11:21:22
 * @LastEditTime: 2020-03-30 12:41:37
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\entity\LogGroupMessageContent.ts
 */
import {Column, Entity} from 'typeorm';

@Entity('log_group_message_content', {schema: 'robot-four-a-db'})
export class LogGroupMessageContent {
  @Column('varchar', {primary: true, name: 'message_id', length: 32})
  messageId: string;

  @Column('varchar', {name: 'group_id', length: 32})
  groupId: string;

  @Column('varchar', {name: 'group_name', nullable: true, length: 50})
  groupName: string | null;

  @Column('varchar', {name: 'sender_id', length: 32})
  senderId: string;

  @Column('varchar', {name: 'sender_name', length: 32})
  senderName: string;

  @Column('varchar', {name: 'message_type', length: 10})
  messageType: string;

  @Column('text', {name: 'message_context'})
  messageContext: string;

  @Column('int', {
    name: 'message_delay_time',
    nullable: true,
    default: () => "'0'",
  })
  messageDelayTime: number | null;

  @Column('date', {name: 'message_send_time'})
  messageSendTime: Date;

  @Column('timestamp', {
    name: 'message_save_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  messageSaveTime: Date;
}
