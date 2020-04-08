/**
 * 接口输入模型
 */
import { PagingParam } from './api-request';

/**
 * {POST} /v1/users 添加用户(json类型的参数)
 */
export interface UserPostJsonReqModel {
  user_name: string;
  age?: number;
  hobby?: string;
}

/**
 * {GET} /v1/users 获取用户列表(query类型的参数)
 */
export interface UserGetQueryReqModel extends PagingParam {
  user_id?: number; // 编号
  user_name?: string; // 根据 "用户名" 查询
  age?: number; // 根据 "年龄" 查询
  search?: string; // 根据 "关键词" 模糊查询
}

/**
 * {GET} /v1/users/:user_name 获取某个用户(path类型的参数)
 */
export interface UserByNameGetPathReqModel {
  user_name: string;
}

/**
 * {PUT} /v1/users/:user_id 修改用户信息(json类型的参数)
 */
export interface UserPutJsonReqModel {
  user_name?: string;
  age?: number;
  hobby?: string;
}

/**
 * {GET} /v1/users/:user_name 获取某个用户(path类型的参数)
 */
export interface UserDeletePathReqModel {
  user_id: number;
}
