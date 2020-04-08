/*
 * @Descripttion: 机器人的好友
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-30 02:24:52
 * @LastEditTime: 2020-03-30 23:27:09
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\entity\bot-friend.ts
 */
 import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

 @Entity()
 export class BotFriend {
   /* 自增id */
   @PrimaryGeneratedColumn()
   id?: number;

  /* 机器人唯一id */
  @Column({
    type: 'varchar', length: 64, default: '', comment: ''
  })
    botid?: string;

    /* 机器人的微信号 */
    @Column({
    type: 'varchar', length: 64, default: '', comment: ''
  })
    botweixin?: string;

   /* 好友唯一id */
   @Column({
   type: 'varchar', length: 64, default: '', comment: ''
 })
   uid?: string;

   /* 好友的微信号 */
   @Column({
  type: 'varchar', length: 64, default: '', comment: ''
 })
   weixin?: string;

   /* 好友昵称 */
   @Column({
  type: 'varchar', length: 64, default: '', comment: ''
 })
   name?: string;

  /* 好友别名 */
  @Column({ type: 'varchar', length: 64 })
  alias?: string;

   /* 好友头像 */
   @Column({
  type: 'varchar', length: 255, default: '', comment: ''
 })
   avatar?: string;

  /* 是否为好友 */
  @Column({ type: 'varchar', length: 64 })
   friend?: string;

  /* 公众号 还是 普通好友 */
  @Column({ type: 'varchar', length: 64 })
   type?: string;

  /* 标签 */
  @Column({ type: 'varchar', length: 64 })
  tags?: string;

  /* 是否是星级好友 */
  @Column({ type: 'varchar', length: 64 })
  star?: string;

   /* 好友的个性签名 */
   @Column({
  type: 'varchar', length: 64, default: '', comment: ''
 })
   signature?: string;

   /* 好友性别 */
   @Column({
  type: 'varchar', length: 64, default: '', comment: ''
 })
   gender?: string;

   /* 好友所在省份 */
   @Column({
  type: 'varchar', length: 64, default: '', comment: ''
 })
   province?: string;

   /* 好友所在城市 */
   @Column({
   type: 'varchar', length: 64, default: '', comment: ''
   })
   city?: string;


   /**  机器人登录的时间
    * 每次登录都会初始化一次好友，确保好友列表信息的正确性，
    * 这个时间也代表机器人本次登录时唯一标记，通过这个标记来定格本次登录时的好友列表
    * 查询好友列表时，会关联这个时间，通过这个时间来查询所有好友，最后显示。
    * 注意：每次登录都会将所有好友存入数据库
    */
   @Column({ type: 'datetime', default: '2020-02-02 00:00:00' })
   date?: Date
 }
