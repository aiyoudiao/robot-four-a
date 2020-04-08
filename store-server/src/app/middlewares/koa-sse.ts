/*
 * @Descripttion: sse中间件
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-14 08:52:38
 * @LastEditTime: 2020-04-01 11:47:13
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\middlewares\koa-sse.ts
 */

import { Context } from 'koa';
import scanQueueList from '@common/scan-queue';

export default async (ctx: Context, next) => {
  if (ctx.url === '/sse/getScanCode') {
    let n = 0;

    const interval = setInterval(() => {
      const date = new Date().toLocaleString();
      console.log('scanQueueList.dequeue()', scanQueueList.dequeue());
      const scanInfo = scanQueueList.isEmpty() ? {} : scanQueueList.dequeue();

      ctx.sse.send(JSON.stringify(scanInfo));

      n++;

      if (n >= 1000 * 15 * 60) {
        console.log('关闭连接咯');
        ctx.sse.sendEnd();
      }
    }, 1000);
    ctx.sse.on('close', (...args) => {
      console.log('清除定时器');
      clearInterval(interval);
    });
  } else {
    await next();
  }
};

// export ko
