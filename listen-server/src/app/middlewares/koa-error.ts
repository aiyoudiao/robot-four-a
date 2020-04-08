import { Context } from 'koa';
import GLOBAL_CONFIG from '../config/system.config';
/**
 * 异常处理
 */
const koaError = async function (ctx: Context, next) {
  try {
    await next();
  } catch (_err) {
    const err = _err || new Error('Null or undefined error');
    ctx.app.emit('error', err, ctx);
    ctx.set('Cache-Control', 'no-cache, max-age=0');
    ctx.status = err.status || 500;
    ctx.type = 'application/json';
    const resp = err.response || {};
    ctx.body = {
      code: err.code,
      error: resp.body || err.error,
      message: err.message,
    };
    // 在开发环境下,显示错误堆栈信息
    if (GLOBAL_CONFIG.isDev) {
      ctx.body.stack = err.stack;
    }
  }
};

export default koaError;
