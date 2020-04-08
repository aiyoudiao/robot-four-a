/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-11 01:37:28
 * @LastEditTime: 2020-03-31 23:35:45
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\middlewares\koa-api-error-response.ts
 */
import { Context } from 'koa';

/**
 * 处理自定义接口错误，并响应错误信息
 */
const koaError = async function (ctx: Context, next) {
  try {
    await next();
  } catch (_err) {
    const err = _err || new Error('Null or undefined error');
    throw (err);
  }
};

export default koaError;
