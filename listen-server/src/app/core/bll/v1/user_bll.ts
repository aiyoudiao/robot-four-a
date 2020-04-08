import { userDal } from '@dal/v1';
import { UserResModel, UserDbModel } from '@model/v1';
import { handleData } from '../common';

/**
 * bll 层主要对 dal 层进行调用，并且格式化数据，并被 controller 层调用
 */

export async function insert(dbModel?: UserDbModel) {
  const result = await userDal.insert(dbModel);
  return handleData.getCUDResult(result);
}

export async function getUserList(dbModel?: UserDbModel, search?: string, pageNo?: number, pageSize?: number) {
  const userList: Array<UserDbModel> = await userDal.getUserList(dbModel, search, pageNo, pageSize);
  return formatDbList(userList);
}

export async function getUserListCount(dbModel?: UserDbModel, search?: string) {
  const result = await userDal.getUserListCount(dbModel, search);
  return result[0]['count'];
}

export async function updateById(userId: number, dbModel: UserDbModel) {
  const result = await userDal.updateById(userId, dbModel);
  return handleData.getCUDResult(result);
}

export async function deleteById(userId: number) {
  const result = await userDal.deleteById(userId);
  return handleData.getCUDResult(result);
}

export function formatDb(db: UserDbModel): UserResModel {
  const user: UserResModel = {
    userId: db.user_id,
    userName: db.user_name,
    age: db.age,
    hobby: db.hobby
  };
  return user;
}

export function formatDbList(dbList: Array<UserDbModel>): Array<UserResModel> {
  const dataList: Array<UserResModel> = [];
  for (let i = 0; i < dbList.length; i++) {
    const data = formatDb(dbList[i]);
    dataList.push(data);
  }
  return dataList;
}
