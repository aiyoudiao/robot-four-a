/*
 * @Descripttion: 微信群成员列表的业务逻辑
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-12 10:58:30
 * @LastEditTime: 2020-03-30 11:56:59
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\service\info-group-members-service.ts
 */

import { getManager } from 'typeorm';
import { InfoGroupMembers } from '@orm/entity/InfoGroupMembers';

export class InfoGroupMembersService {
  static async insertMessage(message: InfoGroupMembers) {
    const InfoGroupMembersRepository = getManager().getRepository(InfoGroupMembers);
    const newInfoGroupMembers = InfoGroupMembersRepository.create(message);

    await InfoGroupMembersRepository.save(newInfoGroupMembers);

    return 'insert message success!!!';
  }
}
