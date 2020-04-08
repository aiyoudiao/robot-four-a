/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-12 11:22:21
 * @LastEditTime: 2020-03-25 23:38:39
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\entity\bot-message.ts
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class BotMessage {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 64 })
  fromName?: string;

  @Column({ type: 'varchar', length: 64 })
  fromId?: string;

  @Column({ type: 'varchar', length: 64 })
  to?: string;

  @Column({ type: 'varchar', length: 64 })
  room?: string;

  @Column({ type: 'text' })
  text?: string;

  @Column({ type: 'varchar', length: 12 })
  type?: string;
}
