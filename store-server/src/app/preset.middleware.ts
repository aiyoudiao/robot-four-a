/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-01-08 09:36:34
 * @LastEditTime: 2020-03-14 09:05:57
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\preset.middleware.ts
 */
import Koa from 'koa';
import api from './routes/api';
import index from './routes';
import koaLogger from 'koa-logger';
import views from 'koa-views';
import koaBody from 'koa-body';
import koaJson from 'koa-json';
import koaFavicon from 'koa-favicon';
import koaStaticServer from 'koa-static-server';
import koaSseMiddleware from 'koa-sse-middleware';
import koaSSE from './middlewares/koa-sse';

import {
  koaCors,
  koaError,
  koaNotFound,
  koaApiErrorResponse,
} from './middlewares';
import { join as pathJoin } from 'path';
export class PresetMiddleware {
  app: Koa;
  constructor(app: Koa) {
    this.app = app;
  }

  use(): Koa {
    // 统一处理错误响应信息
    this.app.use(koaError);
    // 处理跨域
    this.app.use(koaCors);
    // 打印每一次接口请求响应时间
    this.app.use(koaLogger());
    /**
     * if ctx.path==='/favicon.ico',
     * return {root}/static/favicon.ico的静态文件
     * 并且设置该文件的Cache-Control缓存
     */
    this.app.use(
      koaFavicon(pathJoin(__dirname, '../assets/static/favicon.ico')),
    );
    this.app.use(
      koaStaticServer({
        rootDir: pathJoin(__dirname, '../assets/static'),
        rootPath: '/static',
      }),
    );
    this.app.use(
      views(pathJoin(__dirname, '../assets/views'), {
        extension: 'pug',
      }),
    );
    this.app.use(
      koaBody({
        multipart: true,
        formidable: {
          maxFileSize: 20000 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        },
        formLimit: '20mb',
        jsonLimit: '20mb',
        textLimit: '20mb',
      }),
    );
    this.app.use(koaJson());
    this.app.use(koaApiErrorResponse);
    this.app.use(index.routes());
    this.app.use(api.routes());
    this.app.use(koaSseMiddleware({
      maxClients: 10000,
      pingInterval: 60000,
    }));
    this.app.use(koaSSE);
    /**
     * 统一处理找不到的资源,建议把这个中间件放在路由后面
     */
    this.app.use(koaNotFound);
    return this.app;
  }

  push(fn): Koa {
    this.app.use(fn);
    return this.app;
  }

  /**
   * 将中间件作为第一个中间件,
   * 这里需要通过 this.app.use 来验证该中间件是否符合规范
   */
  unshift(fn): Koa {
    const middleware = this.app.middleware;
    this.app.middleware = [];
    this.app.use(fn);
    this.app.middleware = [...this.app.middleware, ...middleware];
    return this.app;
  }
}
