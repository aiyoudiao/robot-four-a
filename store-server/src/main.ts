/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-01-08 09:36:34
 * @LastEditTime: 2020-03-18 17:58:25
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\main.ts
 */

// #region 在调试的时候，加上它，不然你在ts中定义的模块别人无法找到 Code Module


require('tsconfig-paths/register');

// #endregion 在调试的时候，加上它，不然你在ts中定义的模块别人无法找到 Code Module End

// -----------------------------------------分隔符--------------------------------------------


import { AppServer } from './app/app';
import onerror from 'koa-onerror';
import { PORT } from './app/config/variate';

const appServer = new AppServer();

function normalizePort(val) {
  const _port = parseInt(val, 10);
  if (isNaN(_port)) {
    return val;
  }
  if (_port >= 0) {
    return _port;
  }
  return false;
}

const port = normalizePort(PORT || '8080');
/**
 * 由于原生的koa的context.onerror不够全面,
 * 因此这里重写context.onerror
 */
onerror(appServer);

/**
 * 由于 Koa extends EventEmitter,因此这里监听全局EventEmitter的error事件,
 * 可以通过ctx.app.emit('error', err)触发事件
 */
appServer.on('error', (err) => {
  if (!err.expose) {
    // eslint-disable-next-line no-console
    console.log(`error: ${err.message} \n stack: ${err.stack} \n`);
  }
});

// 捕获未被处理的promise rejection
process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(`unhandledRejection: ${err['message']}, stack: ${err['stack']}`);
});

// 捕获未被处理的异常
process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log(`uncaughtException: ${err.message}, stack: ${err.stack}`);
});

const server = appServer.listen(port);

server.on('listening', function () {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  // eslint-disable-next-line no-console
  console.log(`Listening on ${bind}`);
});
