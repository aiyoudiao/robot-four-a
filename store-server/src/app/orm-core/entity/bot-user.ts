/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-18 17:17:38
 * @LastEditTime: 2020-03-30 22:58:29
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\entity\bot-user.ts
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class BotUser {
  /* 自增id */
  @PrimaryGeneratedColumn()
  id: number;

  /* 用户唯一id */
  @Column({ type: 'varchar', length: 64 })
  uid: string;

  /* 用户昵称 */
  @Column({ type: 'varchar', length: 64 })
  name: string;

  /* 用户别名 */
  @Column({ type: 'varchar', length: 64 })
  alias: string;

  /* 是否为好友 */
  @Column({ type: 'varchar', length: 64 })
  friend: string;

  /* 公众号 还是 普通好友 */
  @Column({ type: 'varchar', length: 64 })
  type: string;


  /* 性别 */
  @Column({ type: 'varchar', length: 64 })
  gender: string;

  /* 省份 */
  @Column({ type: 'varchar', length: 64 })
  province: string;

  /* 城市 */
  @Column({ type: 'varchar', length: 64 })
  city: string;

  /* 头像 */
  @Column({ type: 'varchar', length: 64 })
  avatar: string;
}
