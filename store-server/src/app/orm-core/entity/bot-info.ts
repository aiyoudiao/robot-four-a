/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-29 13:27:17
 * @LastEditTime: 2020-03-30 02:34:51
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\entity\bot-info.ts
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class BotInfo {
  /* 自增id */
  @PrimaryGeneratedColumn()
  id?: number;

  /* 机器人唯一id */
  @Column({
  type: 'varchar', length: 64, default: '', comment: ''
})
  uid?: string;

  /* 机器人的微信号 */
  @Column({
 type: 'varchar', length: 64, default: '', comment: ''
})
  weixin?: string;

  /* 机器人昵称 */
  @Column({
 type: 'varchar', length: 64, default: '', comment: ''
})
  name?: string;

  /* 头像 */
  @Column({
 type: 'varchar', length: 255, default: '', comment: ''
})
  avatar?: string;

  /* 机器人二维码 */
  @Column({
 type: 'text', comment: ''
})
  qrcode?: string;

  /* 机器人的个性签名 */
  @Column({
 type: 'varchar', length: 64, default: '', comment: ''
})
  signature?: string;

  /* 性别 */
  @Column({
 type: 'varchar', length: 64, default: '', comment: ''
})
  gender?: string;

  /* 省份 */
  @Column({
 type: 'varchar', length: 64, default: '', comment: ''
})
  province?: string;

  /* 城市 */
  @Column({
  type: 'varchar', length: 64, default: '', comment: ''
  })
  city?: string;

  /* 登录时间 */
  @Column({ type: 'datetime', default: '2020-02-02 00:00:00' })
  date?: Date
}
