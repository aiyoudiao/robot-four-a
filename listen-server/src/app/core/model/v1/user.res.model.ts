/**
 * 接口的响应数据模型
 */

/**
 * {GET} /v1/users/:user_name 获取某个用户 (接口响应的数据格式)
 * {GET} /v1/users 获取用户列表
 * {POST} /v1/users 添加用户
 */
export interface UserResModel {
  userId: number;
  userName: string;
  age: number;
  hobby: string;
}

/**
 * {PUT} /v1/users/:user_id 修改用户信息
 */
export interface UserUpdateResModel {
  isUpdateSuccess: boolean;
}

/**
 * {DELETE} /v1/users/:user_id 删除某个用户
 */
export interface UserDeleteResModel {
  isDeleteSuccess: boolean;
}
