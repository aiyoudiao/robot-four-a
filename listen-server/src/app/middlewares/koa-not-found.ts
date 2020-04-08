import { Context } from 'koa';
const koaNotFound = async function (ctx: Context) {
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>error: api or url not found!</h1>';
};
export default koaNotFound;
