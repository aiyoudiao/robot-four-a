import { userBll } from '@bll/v1';
import { apiServerInstance } from '../../../services';
import { common } from '@lib';
import {
  UserDbModel,
  UserGetQueryReqModel,
  UserPostJsonReqModel,
  UserDeletePathReqModel,
  UserByNameGetPathReqModel,
  UserResModel,
  UserDeleteResModel,
  UserPutJsonReqModel,
  UserUpdateResModel
} from '@model/v1';

/**
 * controller 这一层用来存放每个 接口 的相关逻辑
 */

/**
 * 添加用户
 */
export async function postUser(ctx) {
  // 获取客户端参数
  const param: UserPostJsonReqModel = {
    user_name: ctx.request.body.user_name,
    age: common.strToNumber(ctx.request.body.age),
    hobby: ctx.request.body.hobby
  };

  // 验证参数
  const params = [param.user_name];
  if (common.checkParamsIsNullOrError(params)) {
    ctx.body = apiServerInstance.errorResponse.format({ error_no: 100150 });
    return;
  }

  // 判断该用户名是否已经存在
  const users = await userBll.getUserList({ user_name: param.user_name });
  if (users.length > 0) {
    ctx.body = apiServerInstance.errorResponse.format({ error_no: 100002 });
    return;
  }

  // 将数据插入数据库
  const model: UserDbModel = param;
  const insertResult = await userBll.insert(model);

  // 响应数据
  model.user_id = insertResult.insertId;
  const resModel: UserResModel = userBll.formatDb(model);
  ctx.body = apiServerInstance.normalResponse.format<UserResModel>({ data: resModel });
}

/**
 * 获取用户列表
 */
export async function getUserList(ctx) {
  // 获取客户端参数
  const query = ctx.request.query;
  const param: UserGetQueryReqModel = {
    user_name: query.user_name,
    age: common.strToNumber(query.age),
    page_no: common.strToNumber(query.page_no),
    page_size: common.strToNumber(query.page_size),
    search: query.search // 关键词模糊查询
  };

  // pick model
  const dbModel: UserDbModel = {
    user_name: param.user_name,
    age: param.age,
  };

  // 获取数据
  const userList = await userBll.getUserList(dbModel, param.search, param.page_no, param.page_size);
  const totalCount = await userBll.getUserListCount(dbModel, param.search);

  // 响应数据
  ctx.body = apiServerInstance.normalResponse.format<Array<UserResModel>>({
    data: userList, pageNo: param.page_no, pageSize: param.page_size, totalCount
  });
}

/**
 * 根据用户名获取某一个用户
 */
export async function getByName(ctx) {
  // 获取客户端参数
  const param: UserByNameGetPathReqModel = {
    user_name: ctx.params.user_name
  };

  // 验证参数
  const params = [param.user_name];
  if (common.checkParamsIsNullOrError(params)) {
    ctx.body = apiServerInstance.errorResponse.format({ error_no: 100150 });
    return;
  }

  // 查询数据
  const users = await userBll.getUserList({ user_name: param.user_name });

  // 响应数据
  ctx.body = apiServerInstance.normalResponse.format<UserResModel>({
    data: users[0]
  });
}

export async function putUser(ctx) {
  // 获取客户端参数
  const userId = common.strToNumber(ctx.params.user_id);
  const param: UserPutJsonReqModel = {
    user_name: ctx.request.body.user_name,
    age: common.strToNumber(ctx.request.body.age),
    hobby: ctx.request.body.hobby
  };

  // 验证参数
  const params = [userId];
  if (common.checkParamsIsNullOrError(params)) {
    ctx.body = apiServerInstance.errorResponse.format({ error_no: 100150 });
    return;
  }

  if (common.checkObjIsAllNull(param)) {
    ctx.body = apiServerInstance.errorResponse.format({ error_no: 100150 });
    return;
  }

  // 判断该用户名是否已经存在
  const users = await userBll.getUserList({ user_name: param.user_name });
  if (users.length > 0) {
    ctx.body = apiServerInstance.errorResponse.format({ error_no: 100002 });
    return;
  }

  // 更新用户信息
  const model: UserDbModel = param;
  await userBll.updateById(userId, model);

  // 响应
  ctx.body = apiServerInstance.normalResponse.format<UserUpdateResModel>({
    data: { isUpdateSuccess: true }
  });
}

/**
 * 删除某一个用户
 */
export async function deleteById(ctx) {
  // 获取客户端参数
  const param: UserDeletePathReqModel = {
    user_id: ctx.params.user_id
  };

  // 验证参数
  const params = [param.user_id];
  if (common.checkParamsIsNullOrError(params)) {
    ctx.body = apiServerInstance.errorResponse.format({ error_no: 100150 });
    return;
  }

  // 删除用户
  const result = await userBll.deleteById(param.user_id);
  if (result.affectedRows < 1) {
    ctx.body = apiServerInstance.errorResponse.format({ error_no: 100103 });
    return;
  }

  // 响应
  ctx.body = apiServerInstance.normalResponse.format<UserDeleteResModel>({
    data: { isDeleteSuccess: true }
  });
}
