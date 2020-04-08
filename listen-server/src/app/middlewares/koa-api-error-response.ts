import { Context } from 'koa';
import { apiServerInstance } from '../services';

/**
 * 处理自定义接口错误，并响应错误信息
 */
const koaError = async function (ctx: Context, next) {
  try {
    await next();
  } catch (_err) {
    const err = _err || new Error('Null or undefined error');
    // 判断是否为通用 api error
    if (apiServerInstance.isApiErrorResponse(err.message)) {
      ctx.body = JSON.parse(err.message);
      return;
    }
    throw (err);
  }
};

export default koaError;
