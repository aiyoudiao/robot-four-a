/*
 * @Descripttion: 微信群成员列表 info_group_members
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-30 11:21:22
 * @LastEditTime: 2020-03-30 11:59:31
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\entity\InfoGroupMembers.ts
 */
import {Column, Entity} from 'typeorm';

@Entity('info_group_members', {schema: 'robot-four-a-db'})
export class InfoGroupMembers {
  @Column('varchar', {primary: true, name: 'group_id', length: 32})
  groupId: string;

  @Column('varchar', {name: 'group_name', nullable: true, length: 50})
  groupName: string | null;

  @Column('varchar', {name: 'members_id', length: 32})
  membersId: string;

  @Column('varchar', {name: 'members_nickname', nullable: true, length: 32})
  membersNickname: string | null;

  @Column('varchar', {name: 'members_name', nullable: true, length: 32})
  membersName: string | null;

  @Column('varchar', {name: 'members_status', length: 20})
  membersStatus: string;
}
